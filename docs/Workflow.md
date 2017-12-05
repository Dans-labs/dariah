---
title: Workflow Engine
---

# Description

The workflow engine of this app is a system to handle business logic.

Whereas the database consists of neutral things (fields, records, lists), the
workflow engine weaves additional attributes around it, that indicate additional
constraints.

![diag](design/design.011.png)

These additional _workflow_ attributes are computed by the server on the fly,
without storing them in the database. From then on the following happens with
the workflow attributes:

* they are sent to client, together with the _permission_ information for each
	record
* the client uses the workflow info to show or hide workflow related controls,
	and to suppress controls that lead to actions that violate the business logic
* the server uses the workflow info to enforce the business logic;
* the server updates the workflow attributes after any insert/update/delete
	action.

No matter how good a job the client does in supporting the business logic and
prohibiting actions that violate the business logic, the server always has the
last word. Every access to bits and pieces in the database is first subjected to
the permissions (a lower layer) and then to the additional workflow constraints.

# Realization

Workflow is realized at the server and at the client. To a large extent, its
rules are specified in the [data model](Model).

## Client

Workflow logic is found in [workflow.js](Dux#workflow), but also in the
[templates](Templates), which may include workflow buttons and info panels. The
templates themselves are applied by functions in
[templates.js]({{site.libBase}}/templates.js). These functions are given
workflow attributes that they pass on to the templates.

## Server

The heart of the workflow code is at the server, in
[workflow.py]({{site.serverBase}}/controllers/workflow.py). Its functions are
called from [db.py]({{site.serverBase}}/controllers/db.py) in many places.

The principal functions exported are discussed here.

### readWorkflow

Given a document in some table, this function compiles the workflow attributes
and gives them a proper value. The determination of these attributes is dictated
by the [model]({{site.serverBase}}/models/model.yaml),
[tables]({{site.serverBase}}/models/tables), under the key `workflow`.

There you find a sequence of instructions by which the system can compute
workflow attributes for each record in a table. Let us look at an example:

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
and fields, and if certain conditions are met the attributes `locked` and
`lockedReason` are added to the workflow attributes.

Line by line:

    - inspect: details

This is an instruction to look into the detail record(s) of the current record.
Other possible values are: `master` and `self`, with the obvious meanings.

    method: hasValue

The name of the method by which the inspected value is taken and turned in
either `True` or `False`. There is a fixed, limited supply of methods, which are
hard-coded in the program, see
[`hasValue`, `hasDifferent`, `hasIncomplete`]({{site.serverBase}}/controllers/workflow.py).

Not all of the following parameters need to be present for all methods, and
there are more possible parameters, e.g.

    emptyFields:
	    - score
	    - evidence

a list of fields in the other table that will be checked for emptiness.

    linkField: contrib

This is the name of the field by which detail records point to their master.

    - otherTable: assessment

This is the name of the other table (which can be the master table, the details
table, or the own table, depending on the value of `inspect`).

    otherField: submitted

The name of the field in the other table to look at.

    myField: null

The name of the field in the own table to look at.

    value: true

A reference value to compare the inspected value with.

Summarizing: you just saw just one instruction to inspect related values and to
deliver or not deliver a specific set of workflow attributes. More precisely,
this is the rule that states that a contribution record becomes locked if it has
an assessment that has been submitted.

### adjustWorkflow

Whereas `readWorkflow` computes all relevant workflow for a given record in a
given table, `adjustWorkflow` delivers a list of _other_ records in other
tables, that need new workflow attributes after a change in a given record.
whether it be an insert. update or delete.

The determination of these attributes is dictated by the [data model](Model).
under the key `workflow`.

Typically, when a record gets workflow attributes based on master or detail
records, these attributes must be updated on any change in the master or in one
of the details. The system is not clever enough to generate these adjust rules
itself. We have to do that.

Let us look at the same example, but now at its `adjust` rule:

```yaml
assessment:
    adjust:
    - inspect: master
      linkField: contrib
      otherTable: contrib
      triggerFields:
        - assessmentType
        - submitted
```

it says that if an assessment record is changed, some other records are
affected, namely its master record in the contrib table. But not all changes in
the assessment trigger adjustments, only changes in one of the `triggerFields`,
in this case obviously the field `submitted`. The system add the `linkField`
silently to the `triggerField`, because if we, for whatever reason, reassigned
this assessment to a different contribution, then that contribution has to know!

The other trigger field, `assessmentType` is mentioned because of an other
workflow rule, which we have not mentioned here as an example.

### enforceWorkflow

Finally, the server has to know the consequences of the workflow attributes for
behaviour. This is dictated in the [model](Model). under the key
`workflow/prevent/`_attribute_ where `attribute` is a name such as `locked` or
`incomplete`.

For each attribute there are optional constraints for the `update` and `delete`
actions.

prevent: locked: delete: true

means that it is forbidden to delete a record that carries the `locked`
attribute.

Likewise,

        update: true

means that any update whatsoever is forbidden to such a record.

However, we can relax update constraints:

        update:
	        submitted: true

means that any update that changes the value of the field `submitted` is
forbidden.

We can relax this even further, and here we take a real example, under attribute
`stalled` instead of `locked`:

    stalled:
	  update:
	    submitted:
	      after: true

This means that any update that leads to field `submitted` having value `true`
is forbidden.

Here we say that a stalled assessment cannot be submitted. For the sake of
clarity, here is the rule that says when an assessment is `stalled`:

    assessment:
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

In words: if an assessment has an `assessmentType` field with a different value
that the `contributionType` field of its master contribution, then the
assessment counts as stalled.

This can happen when the type of a contribution is changed after creation of the
assessment. In that case, the criteria of the assessment are not the criteria by
which the contribution should be assessed. So the system stalls this assessment.
It is doomed, it can never be submitted. Unless you decide to change back the
type of the contribution. If that is not an option, the best thing to do is to
copy the worthwhile material from this assessment into a fresh assessment.
