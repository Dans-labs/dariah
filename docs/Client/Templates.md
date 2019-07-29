# Templates

## Introduction

For some parts of the application the generic ways of presenting records and
fields is just not good enough.
We need a deeper customization method.
The challenge is to use as much of the generic machinery when we define custom
presentations. Our solution here is by using *templates*.

The particulars of our templates are documented in
[Tables](../Functionality/Tables.md)
,
but you
might need to continue reading here first about the power and organization of
them.

??? example
    In the display of assessments we want to list
    the `criteriaEntry` detail records in one big tabular form.


## Variables in templates

The values of fields are natural candidates to act as template variables.

??? abstract "Problem"
    Looking up a field value might seem a very innocent operation: you retrieve the
    appropriate document from the database, look up the field in question, and read
    out the value that you find there. Alas, there are several complicating factors:

    1.  **That value might be a MongoDB object identifier pointing to a related record.**
        We do not want to display that identifier, but the corresponding record, but
        not the whole record. Only an informative heading. For that we have to look
        up additional fields in the related table, and possibly apply logic depending
        on what we encounter.
    2.  **We should not show fields that the current user is not entitled to view.**
        We should not put in edit controls for fields that the current user is not
        allowed to edit.
    3.  **We should present *active* and *inactive* values differently.**
        Whether records are active is dependent on other data in the database,
        in particular the *package*. We have access to that through the workflow
        machinery.
        See
        [active items](../Functionality/Business.md#assessment-scenario)
        .

    The first two concerns are built into the generic logic, in the components

    *   [EditInsert](../Client/Components.md#editinsert)
    *   [ItemRead](../Client/Components.md#itemread)
    *   [ItemEdit](../Client/Components.md#itemedit)
    *   [FieldRead](../Client/Components.md#fieldread)
    *   [FieldEdit](../Client/Components.md#fieldedit)
        and we do not want to reimplement this logic
        when we want to cater for the third concern by means of templates.

??? explanation "Solution"
    Our solution is that templates are not static strings into which field values
    are merged dynamically.

    Instead, our templates are *functions* that take a properties object as
    arguments.

    The properties are functions that can furnish representations for fields. These
    functions use the general machinery to fetch all kinds of information, such as
    field labels, field values, workflow attributes, permissions, ownership of records,
    etc.

    See
    [below](#applying-templates)
    .

## Template organization

There are several purposes for which we invoke the template mechanism,
and for each purpose we have a kind of template.

??? explanation "Template purposes"
    *   The presentation of:
        *   headings in lists of records
        *   main records
        *   related records
        *   detail records
        *   insert buttons
        *   consolidated records
    *   the determination of:
        *   edit modes.

??? explanation "Template locations"
    All templates can be found in files named after the tables for which they are
    defined. You can find them in the
    [tables]({{appBase}}/tables)
    directory.
    For each table there is an object of template functions, first keyed by their
    purpose and then, optionally, by the related/detail table they are for.

??? abstract "Record kinds"
    There are different kinds of records, depending on their place in the data model
    as a whole, and for all these kinds we have templates.

    ??? explanation "Main records"
        These are records that correspond to the core of entities, such as
        contributions, assessments, reviews. They do not contain
        information in the form of lists of other entities.

    ??? explanation "Related records"
        These are records pointed to by a field in a *main* record. For
        example, an `assessment` record has a field `contribution`, containing the
        identifier of the contribution record that the assessment is targeting. Here the
        assessment record wants to display a contribution record as read-only
        information. A template for this can be found in the templates file
        [contrib.jsx]({{appBase}}/tables/contrib.jsx)
        .

        This template is only invoked if a contribution record has to be displayed as
        part of an assessment record. If we need to display it in as part of an other
        type of record, we can define a separate template for that case.

        We use these templates for details that want to display a representation of the
        master inside, or for other cases where records point to other records without
        an explicit master detail relationship.

    ??? explanation "Detail records"
        These are records that point to another record, called the master
        record. It is typically used when a piece of information consists of a variable
        number of items. Some central fields go into a master record, and the other
        items go into detail records that point to the master.

        For an example, an `assessment` record is accompanied by a series of
        `criteriaEntry` records. The `assessment` record has no pointers to the
        `criteriaEntry` records. Rather each `criteriaEntry` record points to an
        assessment record.

        These templates become active when records are displayed in the list of records
        below a master record.

    ??? caution "Related versus detail: a matter of perspective"
        If record A points to record B, you could say that record B is its master record
        and A is a detail of it.
        But in our application, this is not automatically so.

        For example, a contribution points to a `year` record, to indicate the year of
        the contribution. Yet we do not consider a contribution to be a detail of a
        year.

        If you want related records to be treated as detail records, you have to say so
        in the
        [data model](../Concepts/Model.md)
        .

    ??? explanation "Consolidated records"
        These are records where all information from detail records and related records
        has been drawn in, and where the links with them have been severed.

        A consolidated record is immutable, and if formerly related records undergo
        change, the consolidated record is not affected.

        We use consolidated records for
        storing contributions when they have been
        frozen because of selection decisions.

??? abstract "Template kinds"
    We have the following template kinds.

    ??? explanation "`head`"
        **For presentation of record headings in lists.**

        When records are listed, we see a vertical list of record headings. For things
        that are handled by workflows, such as contributions, assessments and reviews, it
        is desirable to display some workflow information right in front of the heading.
        Think of an assessment *score* for assessments and contributions, or a review
        status, telling whether the assessment is being reviewed, and if it has been
        reviewed, what the final decision was. Or whether the item is frozen.

        ??? note "for template writers:"
            The result should be a string, not anything that is more complex.
            If there is no result, do not deliver `null`, but `emptyS` (the empty string).

        ??? hint "for template writers:"
            The workflow status can be obtained by calling the function
            [processStatus()](../Client/Dux.md#workflow)
            .

    ??? explanation "read: `main` `detail` `related`"
        **For presentation of records of those kinds in read-only mode.**

        ??? note "for template writers:"
            These templates will not be passed the `fe` template function.

            The `related` template get an extra
            parameter:
            `linkMe`, a hyperlink to the main record: `linkMe`.

    ??? explanation "edit: `mainEdit` `detailEdit`"
        **For presenting records of those kinds as forms with editable fields.**

        ??? note "for template writers:"
            These template functions are passed the `fe` function and
            `editButton`, which is a React component that holds the
            [edit/save button](../Client/Components.md#editcontrol)
            for this record.

    ??? explanation "action: `mainAction` `detailAction`"
        **For presenting actions upon records of those kinds.**

        ??? note "for template writers:"
            These templates do get the `fe` function passed.

    ??? explanation "`editMode`"
        **Whether presenting records in edit mode or readonly mode.**

        In some situations you want to open some records in edit mode and others in read
        mode. A typical situation is where you want to open incomplete records in edit
        mode, and others not. The template functions of this kind do not deliver
        templates, but a boolean, which will be used whenever a table is presented to
        the user as a list.

    ??? explanation "`insert`"
        **For presenting a button to insert a new record.**

        Used where lists of detail records are displayed.
        This template can also choose not to show the insert button, depending on
        conditions determined by the master record and the number of items in the detail
        list.

        ??? note "for template writers:"
            This template does not operate on the level of individual items,
            so it does not get passed the usual functions.
            What it gets is `n`: the number of items that already exist
            (as details of a master record),
            and a `onInsert`: a handler to invoke when the instantiated template is clicked.

    ??? note "Editable or not?"
        The idea is that the form can switch between **Read** and **Edit** by means of a
        standard control, and that the **Action** part is independent of that switch: it
        is always displayed.

        ??? note "edit controls"
            In the **read** part, you cannot have edit controls, but in the **edit** and
            **action** parts you can have them. However, in the **action** part, you do not
            have `save` and `reset` buttons. This part is meant for action buttons, which
            change a field to a predefined value and save it immediately.

    ??? explanation "`consolidated`"
        **For presenting consolidated records.**

        ??? note "for template writers:"
            These templates are passed `s`,
            which is a special version of the `v` function.
            `s` resolves all links to related values by the values pointed to.

## Applying templates

Applying a template means feeding a higher order React component with a
properties object of field rendering functions.

This will result in a concrete React component.

??? abstract "Components that apply templates"
    The templates will be applied by
    [EditInsert](../Client/Components.md#editinsert)
    ,
    [ItemRead](../Client/Components.md#itemread)
    ,
    [ItemEdit](../Client/Components.md#itemedit)
    ,
    [ItemAction](../Client/Components.md#itemaction)
    ,
    and
    [ListPlain](../Client/Components.md#listplain)

    using the functions
    [applyTemplate](../Client/Lib.md#applytemplate)
    ,
    [applyEditTemplate](../Client/Lib.md#applyedittemplate)
    ,
    [applyInsertTemplate](../Client/Lib.md#applyinserttemplate)
    ,
    and
    [editMode](../Client/Lib.md#editmode)
    .

??? abstract "Template functions"
    A template is a function that can be passed a `props` object containing
    functions that deliver field value information or workflow information:

    ??? abstract "label `l(field)`"
        Fetches the label for `field`.

    ??? abstract "empty `e(field)`"
        Checks whether `field` has empty values.

    ??? abstract "value `v(field)`"
        Fetches the raw value of `field`.

    ??? abstract "workflow `w(key)`"
        Fetches additional
        [workflow](../Functionality/Workflow.md)
        attributes for the record.

    ??? abstract "static value `s(field)`"
        Fetches the plain string values for `field`, replacing identifiers
        into related tables by headings of related records.

    ??? abstract "formatted value `f(field)`"
        Fetches values for `field` (with related lookup), and wrap them in
        [FieldRead](../Client/Components.md#fieldread)
        components.

    ??? abstract "formatted editable value `fe(field)`"
        Fetches values for `field`, and wrap them in
        [FieldEdit](../Client/Components.md#fieldedit)
        components, which are controls to let the
        user edit the value.

    ??? abstract "formatted settable value `fs(field)`"
        Presents custom controls for `field` and wrap them in
        [FieldSet](../Client/Components.md#fieldset)
        components. These respond to click events:
        upon a click, a baked in value will be saved to the database.

    ??? abstract "number of details `n`"
        The number of detail records in the list
        (only for insert templates).

    ??? abstract "active types `at`"
        The set of the *active* contribution types.

    ??? abstract "owned `o`"
        Whether the current record is owned by the user.

    ??? abstract "modifiable `m(field)`"
        Checks whether `field` is editable by the current user;
        this is the case if the user is the owner of the record or if (s)he is
        in the list of editors;
        no workflow attributes are taken into account.

    ??? abstract "current user details `me`"
        all attributes of the logged in user
        (empty if the user is not logged in).

    ??? abstract "link to value definition `linkMe`"
        A direct hyperlink to the value as part of its list.

    ??? abstract "`editButton`"
        A ready-made control for switching edit/read-only mode
        and saving the values.

    ??? abstract "`onInsert`"
        A ready-made handler for triggering an insert action. To be
        associated to the element that receives the trigger to create a new
        record.

    See the library module
    [templates]({{libBase}}/templates.js)
    .
