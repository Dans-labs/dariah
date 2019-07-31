# Workflow Engine

## Description

The workflow engine of this app is a system to handle business logic.

Whereas the database consists of neutral things (fields, records, lists), the
workflow engine weaves additional attributes around it, that indicate additional
constraints.

![diag](../design/design.011.png)

These additional *workflow* attributes are computed by the server on the fly,
and then stored in a separate table in the database: `workflow`. From then on
the following happens with the workflow attributes:

*   they are sent to client, together with the *permission* information for each
    record
*   the client uses the workflow info to show or hide workflow related controls,
    and to suppress controls that lead to actions that violate the business logic
*   the server uses the workflow info to enforce the business logic;
*   the server updates the workflow attributes after any insert/update/delete
    action.

No matter how good a job the client does in supporting the business logic and
prohibiting actions that violate the business logic, the server always has the
last word. Every access to bits and pieces in the database is first subjected to
the permissions (a lower layer) and then to the additional workflow constraints.

## Realization

Workflow is realized at the server and at the client. To a large extent, its
rules are specified in the
[data model](../Concepts/Model.md)
.

??? abstract "Client"
    Workflow logic is predominantly used in the
    [templates](../Client/Templates.md)
    ,
    which may
    include workflow buttons and info panels.

    The workflow attributes are handled in the Dux
    [workflow](../Client/Dux.md#workflow)
    .

    There are also helper functions
    to compute special items based on workflow information.

    The templates
    themselves are applied by functions defined in the library
    [templates](../Client/Lib.md#templates)
    .
    These functions are given
    workflow attributes as arguments that they pass on to the templates.

The heart of the workflow code is at the server, in
[workflow.py]({{serverBase}}/controllers/workflow.py)
.
Its functions are
called from
[db.py]({{serverBase}}/controllers/db.py)
in many places.

The principal functions exported are discussed here.

??? abstract "readWorkflow"
    Given a record in some table, this function loads the workflow attributes for
    that record (if any). The attributes are loaded from the workflow table. That
    table has records with fields `table`, `eId` and `attributes`, where `table` and
    `eId` specify exactly which the record in question is, and `attributes` is a
    dictionary of all workflow data for that record that is currently stored.

    ??? note "read or compute"
        If `compute=True` is passed, the workflow attributes will be computed.
        In many cases, the workflow attributes can just be read from the workflow table.
        But if critical data has just been modified, the workflow information has to be
        recomputed.
        See `adjustWorkflow` below how it is configured which data will trigger
        recomputation of workflow attributes.

    The determination of workflow attributes is dictated by the
    [data model](../Concepts/Model.md)
    ,
    in the individual
    [tables]({{modelBase}}/tables)
    ,
    under the key
    `workflow/read`.

    There you find a sequence of instructions by which the system can compute
    workflow attributes for each record in a table.

    All instructions specify a list of other records to 
    [inspect](#inspecting-other-records)
    and a method to
    [compute](#computing-attributes)
    a value from the inspected records.

    ??? example "assessment submission"
        As an example, we show an instruction for a contribution record
        to inspect related values in its assessment records on the basis of which
        it delivers the workflow attribute `locked`.

        The
        [contrib model]({{modelBase}}/tables/contrib.yaml)
        specifies:

        ```yaml
        workflow:
          read:
            - inspect: details
              method: hasValue
              linkField: contrib
              otherTable: assessment
              otherField: submitted
              myField: null
              value: true
              attribute:
                name: locked
                desc: being assessed
        ```

        Basically, this instructs the system to look at various other tables and records
        and fields, and if certain conditions are met the attribute `locked` 
        is added to the workflow attributes.
        Note that part of the attribute is a description, which explains the
        reason why the attribute is set. 
        The client may decide to show this reason on the user interface.

        Line by line:

            inspect: details

        This is an instruction to look into the detail record(s) of the current record.
        Other possible values are:
        `master`, `self`, with obvious meanings.
        [Inspecting other records](#inspecting-other-records)
        below.

            method: hasValue

        The name of the method by which the inspected value is taken and turned in
        either `True` or `False`. There is a fixed, limited supply of methods, which are
        hard-coded in the program, see
        [Computing Attributes](#computing-attributes)
        below.

        Not all of the following parameters need to be present for all methods, and
        there are more possible parameters.
        The list of parameters is dependent on both the inspect method and the compute
        method.

            emptyFields:
              - score
              - evidence

        a list of fields in the other table that will be checked for emptiness.

            linkField: contrib

        This is the name of the field by which detail records point to their master.

            otherTable: assessment

        This is the name of the other table (which can be the master table, the details
        table, or the own table, depending on the value of `inspect`).

            otherField: submitted

        The name of the field in the other table to look at.

            myField: null

        The name of the field in the own table to look at.

            value: true

        A reference value to compare the inspected value with.


??? abstract "adjustWorkflow"
    Whereas `readWorkflow` computes all relevant workflow for a given record in a
    given table, `adjustWorkflow` delivers a list of *other* records in other
    tables, that need new workflow attributes after a change in a given record,
    whether it be an insert, update or delete.

    The determination of these attributes is dictated by the
    [data model](../Concepts/Model.md)
    ,
    in
    the individual
    [tables]({{modelBase}}/tables)
    ,
    under the key
    `workflow/adjust`.

    Typically, when a record gets workflow attributes based on master or detail
    records, these attributes must be updated on any change in the master or in one
    of the details. The system is not clever enough to generate these adjust rules
    itself. We have to do that.

    For this, one can specify rules that define `triggerFields` for sets of
    related records. When one of those trigger fields get changed, all specified
    related records will get their workflow attributes recomputed.

    ??? example "assessment submission"
        Let us look at the same example, but now at its `adjust` rule
        in the
        [assessment table]({{modelBase}}/tables/assessment.yaml)

        ```yaml
        adjust:
        - inspect: master
          linkField: contrib
          otherTable: contrib
          triggerFields:
            - assessmentType
            - submitted
        ```

        It says that if an assessment record is changed, some other records are
        affected, namely its master record in the `contrib` table. But not all changes
        in the assessment trigger adjustments, only changes in one of the
        `triggerFields`, in this case obviously the field `submitted`.

        ??? explanation "other trigger fields"
            The other trigger field, `assessmentType` is mentioned because of an other
            workflow rule, which we have not mentioned here.

        ??? note "triggers also on `linkField`"
            The system adds
            the `linkField` silently to the `triggerField`, because if we, for whatever
            reason, reassigned this assessment to a different contribution,
            then that contribution has to know it!

??? abstract "enforceWorkflow"
    Finally, the server has to know the consequences of the workflow attributes for
    behaviour. This is dictated in the generic
    [data model](../Concepts/Model.md)
    ,
    under the key
    `workflow/prevent/`*attribute* where `attribute` is a name such as `locked` or
    `incomplete`, or `frozen`.

    For each attribute there are optional constraints for the `update` and `delete`
    actions.

    ```yaml
    prevent:
      locked:
        delete: true
        update: true
    ```

    means that it is forbidden to delete or update a record that carries the `locked`
    attribute.

    ??? hint "relax update constraints"
        We can relax update constraints in several ways:

        ??? abstract "make an exception for some fields"
            ```yaml
            prevent:
              locked:
                update: except
            ```

            means that updating is not allowed except for some fields for which
            has been made an exception.

            ??? explanation "Where to define exception fields?"
                The list of exceptions is defined in the
                workflow configuration of the table in question, e.g.

                ```yaml
                  - inspect: self
                    method: hasValue
                    otherField: submitted
                    value: true
                    attribute:
                      name: locked
                      except:
                        - submitted
                        - reviewerE
                        - reviewerF
                      desc: is being reviewed
                ```

                In words, if an assessment has been submitted and is therefore locked,
                the submitted status and the reviewers can still be changed.

        ??? abstract "prevent certain fields to change"
            ```yaml
            prevent:
              locked:
                update:
                  submitted: true
            ```

            means that any update that changes the value of the field `submitted` is
            forbidden.

        ??? abstract "prevent certain fields to get a specific value"
            Here we take a real example, under attribute
            `stalled` instead of `locked`:

            ```yaml
            prevent:
              stalled:
                update:
                  submitted:
                    after: true
            ```

            This means that any update that leads to field `submitted` having value `true`
            is forbidden.

            ??? explanation
                Here we say that a stalled assessment cannot be submitted. For the sake of
                clarity, here is the rule that says when an assessment is `stalled`:

                ```yaml
                  workflow:
                    read:
                      - inspect: master
                        method: hasDifferent
                        linkField: contrib
                        otherTable: contrib
                        otherField: typeContribution
                        myField: assessmentType
                        value: null
                        workflow:
                          stalled: true
                          stalledReason: assessment type is different from contribution type
                ```

                In words: if an assessment has an `assessmentType` field with a different value
                that the `contributionType` field of its master contribution, then the
                assessment counts as stalled.

??? abstract "manageWorkflow"
    When the web server loads, it makes sure that correct workflow information is
    stored in the workflow table. It does so by dropping the existing workflow table
    and recomputing all workflow information from scratch.

    A sysadmin can also reset the workflow from within the app. Then the workflow
    table will be cleared (not dropped), and all workflow info will be recomputed.

    The
    [WorkflowInfo](../Client/Components.md#workflowinfo)
    component presents the previous
    resets since the web server was last started, and gives an overview of the
    recomputed workflow attributes.

## Inspecting other records

Both `readWorkflow` and `adjustWorkflow` have instructions to look up related
records and then apply a computing method to all those records.

The target records can be specified with these instructions:

??? abstract "self"
    Don't look further, look at yourself. The information from which
    workflow attributes are to be derived, is already present in the record
    itself.

??? abstract "master"
    Look at your master record. A record can have multiple masters,
    so you have to specify

    *   `linkField`: the field in yourself that points to the master,
    *   `otherTable`: the table in which the master record resides.

??? abstract "grandmaster"
    Look at the master of your master record.
    You have to specify

    *   `interField`: the field in yourself that points to the intermediate master,
    *   `interTable`: the table in which the intermediate master record resides,
    *   `linkField`: the field in the intermediate master that points to the grandmaster,
    *   `otherTable`: the table in which the grandmaster record resides.

??? abstract "details"
    Look at your detail records. A record can have multiple kinds of
    details, so you have to specify

    *   `otherTable`: the table that holds the details, and the
    *   `linkField`: the field in the detail record that points to you.

??? abstract "granddetails"
    Look at details of your detail records.
    You have to specify

    *   `interTable`: the table that holds the intermediate details,
    *   `interField`: the field in the intermediate details that points to you,
    *   `otherTable`: the table that holds the details of the details, and the
    *   `linkField`: the field in the details of the details
        that points to the intermediate details.

??? abstract "siblings"
    Look at records with the same master. You have to specify

    *   `linkField`: the field in yourself and your siblings that points to the master
    *   `otherTable`: the table in which your siblings reside

## Computing attributes

When the other records have been found, it is time to extract information from
them, in order to put it into workflow attributes. There is a limited set of
functions you can call, they are all listed in
[worklow.py]({{serverBase}}/controllers/workflow.py)
and their names start
with `_compute_`. Below we name them without this prefix.

In the specifications we refer to the starting record(s) as *my record(s)* and to the
reference records as *other record(s)*.

??? abstract "hasValue"
    Takes

    * `otherField`: the name of a field in an other record whose value is to be retrieved;
    * `value`: a reference value.

    Returns `{'on': True }` if one of the retrieved values is equal to the reference value.

    ??? example "assessment checks whether contribution is selected"
        The
        [assessment model]({{modelBase}}/tables/assessment.yaml)
        specifies:

        ```yaml
        - inspect: master
          method: hasValue
          linkField: contrib
          otherTable: contrib
          otherField: selected
          value: true
          attribute:
            name: frozen
            desc: contribution has been selected by DARIAH
        ```

        In words: look up the `selected` field in a master `contrib` record, and if the
        value there is `true`, add the `on: true` setting to the `frozen` attribute.

        If the client sees this attribute, it can put a message on the interface that 
        the assessment is frozen because its contribution has been selected.

??? abstract "hasComplete"
    Takes

    *   `emptyFields`: a list of field names in the other record
        to be checked for emptiness.

    Returns `{'on': True}` if all of the other records
    have no empty field among the `emptyFields`.

    ??? example "review checks whether decision has been taken"
        The
        [review model]({{modelBase}}/tables/review.yaml)
        specifies:

        ```yaml
        - inspect: self
          method: hasComplete
          emptyFields:
            - decision
          attribute:
            name: completed
            desc: 'verdict has been given'
            except:
              - decision
        ```

        In words: a review record inspects its own `decision` field to see if it is non-empty.
        If so, it adds the `on: true` setting to the `completed` attribute.

        Note that a `completed.on` attribute prevents updates, but that in ghis case updates to the
        decision are still allowed.

        Other parts of the workflow and the permission system determine which people can change
        the decision.

??? abstract "hasInComplete"
    Takes

    *   `emptyFields`: a list of field names in the other record
        to be checked for emptiness.

    Returns `{'on': True, 'n': n }` if one of the other records has an empty field
    among the `emptyFields`. If so, `n` is the number of such records.

    ??? example "assessment checks whether some criteria have not yet been completely filled in"
        The
        [assessment model]({{modelBase}}/tables/assessment.yaml)
        specifies:


        ```yaml
        - inspect: details
          method: hasIncomplete
          linkField: assessment
          otherTable: criteriaEntry
          emptyFields:
            - score
            - evidence
          attribute:
            name: incomplete
            desc: 'some criteria lack a score or evidence ({n}x)'
        ```

        In words: a review record inspects its own `decision` field to see if it is non-empty.
        If so, it adds the `on: true` setting to the `completed` attribute.

        Note that a `completed.on` attribute prevents updates, but that in ghis case updates to the
        decision are still allowed.

        Other parts of the workflow and the permission system determine which people can change
        the decision.

??? abstract "hasDifferent"
    Takes

    * `otherField`: the name of a field in an other record whose value is to be retrieved;
    * `myField`: the name of a field in my record whose value is to be retrieved; 

    Returns `{'on': True }` if a value from an other record is different from a value
    from my record.

    ??? example "assessment checks whether its contribution type agrees with that of its contribution"
        The
        [assessment model]({{modelBase}}/tables/assessment.yaml)
        specifies:


        ```yaml
        - inspect: master
          method: hasDifferent
          linkField: contrib
          otherTable: contrib
          otherField: typeContribution
          myField: assessmentType
          attribute:
            name: stalled
            desc: assessment type is different from contribution type
        ```

        In words: an assessment record compares its own `assessmentType` with
        the `typeContribution` of its contribution record.

        If so, it adds the `on: true` setting to the `stalled` attribute.

        This assessment may contain important information, but its criteria no longer
        match the kind of conbtribution, so the worthwhile bits of the assessment
        have to be entered manually in a newly created assessment based on the
        current `typeContribution`.


??? abstract "getValues"
    Takes

    * `otherFields`: a list of fields in an other record whose values are to be retrieved;

    Returns

    ```python
    {'items': [
      {'otherField1': value1a, 'otherField2': value2a},
      {'otherField1': value1b, 'otherField2': value2b},
      ...
      ]
    }
    ```

    where

    `value1a` and `value2a` are
    values for the other fields found in the first other record,

    and

    `value1a` and `value2a` are
    values for the other fields found in the second other record,

    and so on for all other records.

    ??? example "assessment gathers the creators and decisions of its reviews"
        The
        [assessment model]({{modelBase}}/tables/assessment.yaml)
        specifies:

        ```yaml
        - inspect: details
          method: getValues
          linkField: assessment
          otherTable: review
          otherFields:
            - creator
            - decision
          attribute:
            name: reviews
            desc: reviews of this same assessment
        ```

        In words: an assessment record looks into its associated review records
        and reads off their creators and decisions.

??? abstract "assessmentScore"
    Takes :

    *   nothing

    Computes the overall score of an assessment, based on its detail `criteriaEntry`
    records.

    Returns:

    *   A dictionary with the score details
    
    ??? explanation "Score details"
        *   `overall`: the overall score as percentage of points scored with respect to
            total of scorable points
        *   `relevantScore`: the sum of the scores for all criteria that have not been
            scored as `-1` (non-applicable)
        *   `relevantMax`: the total of the maximum scores for all criteria that have not
            been scored as `-1`
        *   `allMax`: the total of the maximum scores for all criteria
        *   `relevantN`: the number of criteria that have not been scored as `-1`
        *   `allN`: the number of criteria.
        *   `aId`: the id of the assessment in question.

        See more about the computation in the
        [business logic](Business.md#scoring)
        .

    ??? example "contrib gathers the assessment scores of its assessments"
        The
        [contrib model]({{modelBase}}/tables/contrib.yaml)
        specifies:

        ```yaml
        - inspect: details
          method: assessmentScore
          linkField: contrib
          otherTable: assessment
          attribute:
            name: score
            desc: assessment score
        ```

        In words: a contrib record looks into its associated assessment records
        and computes their score details and stores the resulting dictionaries in the
        `score` workflow attribute.

    ??? example "How the score travels to the user interface"
        The workflow engine takes care that the assessment score is computed on the server whenever
        there is a need to do that.
        The computed workflow attributes are delivered to the client whenever the client
        wants to render a contribution.

        Here is a fragment of the contribution template that reads the workflow information
        (look at `w('score')`; `w()` is a function to read out workflow attributes for the 
        record in question):

        ```javascript
        if (approved) {
          const scoreItems = (w('score') || emptyO).items || emptyA
          const score = scoreItems.length ? scoreItems[0] : emptyO
          resultApproved = (
            <>
              <ScoreBox score={score} />
              <div className={'label large workflow good'}>
                {`This contribution has been reviewed positively.`}
              </div>
            </>
          )
        }
        ```

        If there are multiple assessments, the score is taken from the first one.
        If there is a score, it consists of a dictionary with relevant score quantities.
        They are passed as properties to the [ScoreBox](../Client/Components#scorebox)
        component, which produces a nicely rendered representation of the assessment score.

## Hooks

There are a few hard coded workflow functions that perform special actions.
They will be hooked in from other parts of the server code, especially data access.

??? abstract "getActiveItems()"
    ```python
    getActiveItems()
    ```

    ??? explanation "task"
        Calculates the active package, and from there the active types and criteria,
        given the current time. This is the backdrop for any assessment and review
        action.

??? abstract "detailInsert()"
    ```python
    detailInsert(msgs, table=None, masterRecord=None)
    ```

    ??? explanation "task"
        Hard-coded instruction to add

        *   `criteriaEntry` detail records after inserting an `assessment` record
        *   `reviewEntry` detail records after inserting an `review` record

        In both cases, some business logic is coded to get the right amount
        of details and to prefill them with sensible values, and to
        check for error conditions.

    ??? details
        It needs to deliver a dictionary of insertValues (field=value pairs) and a
        dictionary of detail records, keyed by detail table name.
        The values are lists of field=value dictionaries.
        Before
        [db](#db)
        will proceed to insert them, the
        detail records will get the id of the just inserted main record. This will be
        used as masterId when the details get inserted.

??? abstract "consolidateRecord()"
    ```python
    consolidateRecord(table, record, workflow, msgs)
    ```

    ??? explanation "task"
        Hard-coded instruction to consolidate contribution records and all its
        detail assessment, criteriaEntry, review, and reviewEntry records.

        This happens only when a contribution is (de)selected by a national
        coordinator and/or a backoffice person.

        The relevant workflow attributes are taken into account and serialized.

        A provenance trail is added to the consolidated record:
        who (de)selected the contribution and the time of (de)selection and the
        time of consolidation.

## Wiring

Let us finish with an example, to show the intricate wiring of data that is
going on in the workflow system.

![diag](../design/design.012.png)

??? explanation
    Above we see a good deal of the workflow rules that govern contributions and
    their assessments and reviews, each with their detail records of criteria
    entries (in the self-assessment) and review entries (in the reviews).

    ???+ abstract "records"
        The coloured squares are particular records in the contribution, assessment,
        review, etc. tables. We only mention the fields that play a role in the
        workflow.

    ???+ abstract "workflow attributes"
        The rounded labels indicate the workflow attributes that are computed for those
        records.

    ???+ "arrows"
        The arrows show which fields are used for which workflow attributes.

        In fact, the arrows correspond exactly with the `workflow/read` and
        `workflow/adjust` instructions given in the
        [data model](../Concepts/Model.md)
        .

        The reading of
        an arrow is like this:

        1.  **read workflow**: whenever a record needs to be sent to the client, compute
            the indicated workflow labels, based on the information in the fields
            indicated by following the arrows in the opposite direction;
        2.  **adjust workflow**: whenever a record is inserted, deleted, or updated,
            follow any arrow from any of its fields, and for every record at the opposite
            end, trigger a recomputation of its workflow, and send that to the client as
            part of the result op the modification action.

    ???+ "effect of the workflow on the user interface"
        In this way, whenever the user changes a record, not only the affected records
        are reported back, but also the records with updated workflow information. This
        will ultimately update the user interface in all relevant parts.
