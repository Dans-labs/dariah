---
title: Templates
---

Introduction
============

For some parts of the application the generic ways of presenting records and
fields is just not good enough, e.g. for the display of assessments. We need a
deeper customization there, where the criteriaEntry detail records should appear
in one big form.

The challenge is to use as much of the generic machinery when we define custom
presentations. Our solution here is by using *templates*.

Looking up a field value might seem a very innocent operation: you retrieve the
appropriate document from the database, look up the field in question, and read
out the value that you find there. Alas, there are several complicating factors:

1.  That value might be a MongoDB object identifier pointing to a related record.
    We do not want to display that identifier, but the corresponding record, but
    not the whole record. Only an informative heading. For that we have to look
    up additional fields in the related table, and possibly apply logic depending
    on what we encounter.
2.  We should not show fields that the current user is not entitled to view. We
    should not put in edit controls for fields that the current user is not
    allowed to edit.
3.  We should present values that are in some way *legacy* different from values
    that are *current*, where the current-ness of values is determined by certain
    other fields in the database (see [business model](Business).

The first two concerns are built into the generic logic, in the components

*   [EditInsert](#editinsert)
*   [ItemRead](#itemread)
*   [ItemEdit](#itemedit)
*   [FieldRead](#fieldread)
*   [FieldEdit](#fieldedit) and we do not want to reimplement this logic when we
    want to cater for the third concern by means of templates.

Our solution is that templates are not static strings into which field values
are merged dynamically.

Instead, our templates are *functions* that take a properties object as
arguments.

The properties are functions that can furnish representations for fields. These
functions use the general machinery to

*   `l(field)` fetch labels for fields;
*   `e(field)` check whether fields have empty values;
*   `v(field)` fetch the raw values for fields;
*   `w(key)` fetch additional [workflow](Workflow) attributes for records;
*   `s(field)` fetch the plain string values for fields, replacing identifiers
    into related tables by headings of related records; by entity titles;
*   `f(field)` fetch values for fields (with related lookup), and wrap them in
    [FieldRead](#fieldread) components;
*   `f(field)` fetch values for fields, and wrap them in [FieldEdit](#fieldedit)
    components, which are controls to let the user edit the value;
*   `fs(field)` present custom controls for fields and wrap them in
    [FieldSet](#fieldset) components, which react to click events: upon a click, a
    baked in value will be saved for this field to the database;
*   `n` (only for insert templates): the number of detail records in the list
*   `at` a set of the *active* contribution types
*   `o` check whether the current record is owned by the user or whether the user
    is in the list of editors;
*   `me` all attributes of the logged in user (empty if the user is not logged
    in);
*   `linkMe` a direct hyperlink to a the value as part of its list;
*   `editButton` a ready-made control for switching edit/read-only mode and saving
    the values.
*   `onInsert` a ready-made handler for triggering an insert action. To be
    associated to the element that receives the user trigger to create a new
    record.

Applying a template means feeding a higher order React component with a
properties object of field rendering functions, which results in a concrete
React component.

The templates will be applied by [EditInsert](#editinsert),
[ItemRead](#itemread), [ItemEdit](#itemedit), and [ItemAction](#itemaction), .
using the functions [applyTemplate](Templates#applytemplate),
[applyEditTemplate](Templates#applyedittemplate),
[applyInsertTemplate](Templates#applyinserttemplate), and
[editMode](Templates#editmode).

Template organization
=====================

There are several purposes for which we invoke the template mechanism:

*   The presentation of:
    *   main records
    *   related records
    *   detail records
    *   insert buttons
    *   consolidated records
*   the determination of:
    *   edit modes.

All templates can be found in files named after the tables for which they are
defined. You can find them in the [tables]({{site.appBase}}/tables) directory.
For each table there is an object of template functions, first keyed by their
purpose and then, optionally, by the related/detail table they are for.

Read, Edit, Action
------------------

For main and detail records, we have several sets of templates:

*   **Read** for presentation of records in read-only mode,
*   **Edit** for presenting records as forms with editable fields,
*   **Action** for presenting actions upon records.

The idea is that the form can switch between **Read** and **Edit** by means of a
standard control, and that the **Action** part is independent of that switch: it
is always displayed.

In the **Read** part, you cannot have edit controls, but in the **Edit** and
**Action** parts you can have them. However, in the **Action** part, you do not
have `save` and `reset` buttons. This part is meant for action buttons, which
change a field to a predefined value and save them immediately.

Insert
------

For lists of detail records we have templates that format the insert button.
These templates can also choose not to show the insert button, depending on
conditions determined by the master record and the number of items in the detail
list.

Main, related, detail, consolidated
-----------------------------------

**Related records** are records pointed to by a field in a main record. For
example, an `assessment` record has a field `contribution`, containing the
identifier of the contribution record that the assessment is targeting. Here the
assessment record wants to display a contribution record as read-only
information. A template for this can be found in the templates file
[contrib]({{site.appBase}}/tables/contrib.jsx)

This template is only invoked if a contribution record has to be displayed as
part of an assessment record. If we need to display it in as part of an other
type of record, we can define a separate template for that case.

We use these templates for details that want to display a representation of the
master inside, or for other cases where records point to other records without
an explicit master detail relationship.

**Detail records** are records that point to another record, called the master
record. It is typically used when a piece of information consists of a variable
number of items. Some central fields go into a master record, and the other
items go into detail records that point to the master.

For an example, an `assessment` record is accompanied by a series of
`criteriaEntry` records. The `assessment` record has no pointers to the
`criteriaEntry` records. Rather each `criteriaEntry` record points to an
assessment record.

If record A points to record B, you could say that record B is as master record
and A is a detail of it. But in our application, this is not automatically so.

For example, a contribution points to a `year` record, to indicate the year of
the contribution. Yet we do not consider a contribution to be a detail of a
year.

If you want related records to be treated as detail records, you have to say so
in the [data model](Model).

These templates become active when records are displayed in the list of records
below a master record.

**Consolidated records** are records for which all related values and relevant
details have been collected and represented as strings. A consolidated record is
a frozen snapshot of the logical content of a record. It will not change if
related records and detail records are modified. We use consolidated records for
storing contribution metadata in assessment records when the assessment has
finished, and other cases where we have to preserve a record of activities.

Applying templates
==================

A template is a function that can be passed a `props` object containing
functions that deliver field value information or workflow information:

*   `v = field =>` *read-only string value for* `field`
*   `f = field => <FieldRead>` *react component for reading* `field`
*   `fe = field => <FieldEdit>` *react component for editing* `field`
*   `fs = field => <FieldSet>` *customizable react component for setting* `field`
    to a predefined value
*   `e = field =>` *whether that field has an empty value*
*   `m = field =>` *whether that field is editable by the current user*
*   `w = kind =>` workflow information, see [workflow](Workflow).

See the library module [templates]({{site.libBase}}/templates.js)

[Templates]({{site.appBase}}/components/Templates.jsx)

Details of the kinds of templates
=================================

main
----

The *read* templates for records in tables, when presented on their own, i.e.
not in relation to other, related records. They will not be passed the `fe`
function.

mainEdit
--------

The *edit* templates for records in tables, when presented on their own, i.e.
not in relation to other, related records.

These template functions are passed the `fe` function. There is an extra
parameter `editButton`, which is a React component that holds the
[edit/save button](EditCOntrol) for this record.

mainAction
----------

Like *mainEdit*, but now the values are *action* templates.

These template functions do get the `fe` function.

detail
------

The *read* templates for records in tables, when presented as detail of a master
table. Per master table you can define a separate template.

These templates are not passed the `fe` function.

detailEdit
----------

The *edit* templates for records in tables, when presented as detail of a master
table. Per master table you can define a separate template.

These templates do get the `fe` function.

These template functions are passed the `fe` function. There is an extra
parameter `editButton`, which is a React component that holds the edit/save
button for this record.

detailAction
------------

Like *detailEdit*, but now the values are *action* templates.

These template functions do get the `fe` function.

related
-------

The *read* templates for records in tables, when an other, related table points
to them. It is more like a main record pointing to a related record. Per main
table you can define a separate template.

These template functions are not passed the `fe` function, but they get an extra
parameter: `linkMe`, a hyperlink to the main record: `linkMe`.

consolidated
------------

Much like *related*, but here we have templates that only use consolidated
values.

These templates are passed a special version of the `v` function, that resolves
all dependencies.

insert
------

When you want to customize the rather modest + button that inserts a new record
in a table, you can write a template for it. This template does not operate on
the level of individual items, so it does not get passed the usual functions.
What it gets is the number of items that already exist (as details of a master
record), and a handler to invoke when the instantiated template is clicked.

editMode
--------

In some situation you want to open some records in edit mode and others in read
mode. A typical situation is where you want to open incomplete records in edit
mode, and others not. The template functions of this kind do not deliver
templates, but a boolean, which will be used whenever a table is presented to
the user as a list.
