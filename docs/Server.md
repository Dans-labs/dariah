---
title: Server
---

Although this app is a single page application with most of the business logic
coded at the client side, there are a bunch of things that are handled at the
server side.

All data access is handled by server side controllers that implement a data api.
These controllers are informed by the [data model](Model).

When the web server starts, the data model files are read, and converted to
python modules with the same base name that encapsulate the information in the
YAML files.

These modules are then imported by all controllers, so that all data access
happens in conformance with the data model and its permissions.

[perm]({{site.serverBase}}/controllers/perm.py)
===============================================

Contains the methods to compute permissions for controllers, tables and fields.
Here are the main methods.

allow( table, action, msgs, controller=None, document=None, newValues=None, my=None, verbose=True)
----------------------------------

Given table and an action (such as `read`, `update`), this method computes
whether that action may be performed on behalf of the current web user. If a
document is specified, the information in that document will be used to
determine whether the document is owned by the user, and in that case the
permissions tend to be more liberal. Without a document, permissions are
calculated as if the user does not own any document in the table.

The result has three parts:

*   **good**: a boolean which tells: yes, allowed, or no: forbidden;
*   **rowFilter**, which specifies, in case of a yes, to which rows the action may
    be applied; it has the shape of a MongoDB selection criterion, but it can
    also be `False` (no rows) or `True` (all rows) or `None` (irrelevant). 
*   **fieldSet**, which specifies, in case of yes, which fields in those rows may
    be acted upon; it is a `Set`.

If not good, *rowFilter* and *fieldSet* will be `None`.

If a document is passed *rowFilter* will be `None`, because it is not needed.
Only if no document is given, a *rowFilter* will be computed.
If the operation is not permitted on any row,
*rowFilter* becomes `False`.
The reaction to this outcome should be
to not perform a database lookup at all.

But this is not a permission error, because in this case the
list of records for which
the operation is allowed is empty.
This is different from *good* is `False` and *rowFilter* is `None`.

If the operation is permitted on a selection of rows,
*rowFilter* is returned as a mongodb selection dict is returned.
If the operation is permitted on all rows, *rowFilter* is returned as `True`.

If no fields are permitted, *fieldSet* is returned as `set()`.
This will still deliver the `_id` fields,
because `_id` fields are always permitted.
If all or part of the fields are permitted,
the set of permitted fields is returned.


[db]({{site.serverBase}}/controllers/db.py)
===========================================

This is the data access module. It uses the [data model](Model) to serve any
data to any user in such a way that no data is sent from server to client that
the current user is not entitled to see.

The code in `db` is generic, it does not contain explicit reference to
particular tables and fields. All specifics are derived form the
[model config file]({{site.serverBase}}/models/model.yaml) and the table
specific files in [tables]({{site.serverBase}}/models/tables).

There are also *hooks*, where specific behaviour for certain tables can be
specified. That behaviour is coded in the [workflow module](#workflow).

We describe the main methods here.

validate(table, itemValues, updateFields)
-----------------------------------------

Server validation of the values of a record. `itemValues` is a dictionary of all
field values of the item, and `updateFields` is the set of fields to be updated.

The result consists of a boolean that states whether all values are valid, a
dictionary of diagnostic information if there are validation errors, a list of
error messages if the validation process itself failed, and a list of new values
created in related tables.

getList(controller, table, rowFilter, titleOnly, withValueLists, withFilters, my)
---------------------------------------------------------------------------------

A true workhorse, that retrieves the contents of a table, in various
circumstances.

The `controller` is the name of the top-level method that called this function.

`table` is the name of the table in question.

`rowFilter` is a selection on the rows of the table. Possibly, the access levels
will restrict the set of returned rows further.

`titleOnly` tells whether only the titles or the full data of the records should
be fetched. Again: access levels may constrain the set of returned fields
further.

`withValueLists`: if true and if there are fields whose values reside in value
lists, these value lists will be fetched as well.

`withFilters`: if true, the filter specifications of the table will also be
returned.

`my`: if True: only fetches rows that have been created by the current user.

If `my` is a list of fields, these are *ourFields*. These fields contain user ids,
and only records with the current user occurring in one of those fields, will be fetched.

Where as `my=True` is intended to fetch records that are owned or editable by the current user, 
`my=ourFields` is intended to fetch records that are relevant to the current user in an other, configurable way.

It only works if there is a section `ourFields` in the data model of `table`, which lists a number of fields.

getItem(controller, table, ident)
---------------------------------

Fetches a single item.

The `controller` is the name of the top-level method that called this function.

`table` is the name of the table in question.

`ident` is the identifier of the item in question.

This function also return for each field whether the current user is entitled to
update it. And also whether the current user may delete this record.

Finally, the function also indicate whether the user has fetched all allowable
fields. This is relevant in a scenario where the user has fetched a list of
items (title only) first, and then fetches an individual item. The client
application needs to know for each item how much of its field have actually been
fetched.

modList(controller, table, action)
----------------------------------

An other workhorse. This function can insert, update and delete a single item.
New items are inserted as rows with blank fields. The information to update
items is fetched from the request object. The client has sent this material to
the server.

The `controller` is the name of the top-level method that called this function.

`table` is the name of the table in question.

[user]({{site.serverBase}}/controllers/user.py)
===============================================

Contains the logic needed to maintain the user table. When new users log in
through the DARIAH infrastructure, it collects their `eppn`, i.e. the names by
which they are identified by the authentication systems. It also retrieves to
what permission groups users belong.

[auth]({{site.serverBase}}/controllers/auth.py)
===============================================

Contains the methods to authenticate users. Here all the logic about user
sessions and session cookies is written down. It builds on the bottle web
framework.

[file]({{site.serverBase}}/controllers/file.py)
===============================================

Contains the methods to get file data from the server. There is a method to
serve static files by calling the web framework bottle. And there is a method to
read a file and deliver its content as JSON.

[utils]({{site.serverBase}}/controllers/utils.py)
=================================================

Low level stuff.

[workflow]({{site.serverBase}}/controllers/workflow.py)
=======================================================

Contains workflow specific behaviour, i.e. the specifics of the assessment and
review process.

getActiveItems(basicList)
-------------------------

Calculates the active package, and from there the active types and criteria,
given the current time. This is the backdrop for any assessment and review
action.

The parameter `basicList` is a function that can retrieve documents from the
database, in such a way that the access restrictions are respected. It is
defined in [db](#db) and will be passed from there. So this module does not do
its own data access, all data access is still coded in [db](#db).

detailInsert(basicList, table=None, masterDocument=None)
--------------------------------------------------------

Method invoked by [db](#db), just before an item is inserted. This method has
the opportunity to generate extra fields for that record, and to generate extra
details in other tables, to be inserted.

It needs to deliver a dictionary of insertValues (field=value pairs) and a
dictionary of detail records, keyed by detail table name. The values are lists
of field=value dictionaries. Before [db](#db) will proceed to insert them, the
detail records will get the id of the just inserted main record. This will be
used as masterId when the details get inserted.
