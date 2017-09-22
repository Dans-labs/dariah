---
title: Server
---

Although this app is a single page application with most of the business logic
coded at the client side, there are a bunch of things that are handled at the server side.

All data access is handled by server side controllers that implement a data api.
These controllers are informed by a
[data model]({{site.serverBase}}/models/data.yaml)
and a
[permissions model]({{site.serverBase}}/models/permission.yaml)

Both models are specified in a `yaml` file.
When the webserver starts, these model files are read,
and converted to python modules with the same base name
that encapsulate the information in the yaml files.

These modules are then imported by all controllers, so that all data access happens in conformance
with the data model and its permissions.

[Data model]({{site.serverBase}}/models/data.yaml)
==========

MongoDB
-------
We store the data in a [MongoDB](https://docs.mongodb.com).
A MongoDB does not work with a fixed scheme. A MongoDB *collection* consists of
*documents*, which are essentially json-like structures, arbitrarily large and arbitrarily nested.
That makes it easy to add new kinds of data to documents and collections
when the need arises to do so.
This will not break the existing code. 

The MongoDB way favors storing of related data inside the main document.
This increases the redundancy of the data and may lead to consistency problems,
unless the application not tries to enforce consistency somehow.
MongoDB is optimized to read quickly, at the cost of more expensive data manipulation operations.

In this app, with a limited amount of data, we use MongoDB primarily for its flexibility.
We still adhere largely to SQL-like practices when we deal with related tables.
So instead of storing the information of related records directly inside the main record,
we only store references to related records inside the main records.

Configuration
-------------
The data model consists of the dictionaries *generic* and *tables*.
The generic dict contains field names that are used in many tables, such as `createdBy`.
The tables dict has a key for each table, and contains all model information that the
application needs to work with that table.

Here is a description of the table model information.

title
-----
The name of the field that will be used as title when a records are listed.

sort
----
A list of sort keys. A sort key is a pair consisting of a field, and a direction (-1: descending, 1: ascending).

fieldOrder
----------
A list of the fields, in the order by which will we displayed when the interface presents a record.

fieldSpecs
----------
A dictionary of the fields and their characteristics, needed to accomodate the display and manipulation
of its values. A field spec may contain the following bits of information:

* **label**: a user-friendly name of the field
* **multiple**: whether there is only one value allowed for this field, or a list of values.
* **valType**: the type of the values of the field. 
  * `bool`: true or false.
  * `datetime`: a date time, mostly represented in its [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
  * `number`: an integer or real number.
  * `text`: a string of characters, usually just a one-liner.
  * `url`: a syntactically valid url: i.e. a string of text that can be interpreted as a url. A validation routine will check this.
  * `email`: a syntactically valid email address. A validation routine will check this.
  * `textarea`: a string of characters, which may extend to several pages.
    It is assumed that this is Markdown text, and its formatted version will be shown on the interface, see
    [MarkdownArea](Components#markdownarea).
  * related table info, specified by a dictionary:
    * `values`: the table that contains the related values;
    * `allowNew`: whether the user is allowed to enter new values that are not yet present in the related table;
    * `select`: a criterion on the related table: only the records that satisfy it, are allowed values.
    Note, that it is not specified what field in the related records constitute the related value.
    In most cases, the related table will be a *value list*: every record consists of an `_id` field (the
    standard MongoDB identifier field) and a field called `rep`, which contains the representation of the value.
    Exceptions are the `country` table en the `user` table.
    It is hard-coded in the client app how to forge a suitable representation from the existing fields.
    See [repCountry and repUser]({{site.appBase}}/dux/table.js).

    **N.B.** In the case of the country table, and especially the user table, the permissions model has a say
    in exactly which fields will actually reach the client.
    For example, if a non-authenticated user is shown the creator of a record, he sees information from the user table.
    But the permissions are such that he may not see the email address of that user. So the email address does not
    even reach the client.

filters
-------
A list of filters by which to constrain the set of records to be displayed.
There are *fulltext* filters and *faceted* filters.

Each filter is a dictionary with the following information.

* **field** The name of the field to be filtered.
* **label** A user friendly name for the filter, usually the label of the field to be filtered.
* **type** The type of filter:
  `ByValue`: faceted,
  `EUMap`: faceted, plus a visualisation on the map of Europe,
  `Fulltext`: full text search in the field.
* **maxCols**: facets are displayed in a table with at most this amount of columns.
* **expanded**: whether the table of facets is initially expanded or collapsed.

[Permission model]({{site.serverBase}}/models/permission.yaml)
=================

The authorization system is built up from permissions.

Users are in groups, which determine their power.

Users may perform methods which undertake actions on tables and fields.

Users are authorized to command these actions, if the authorization level
of the group they are in, matches the level of authorization that is needed
for the thing.

In some cases, the identity of the user is relevant, namely when users
want to modify things they themselves have created.
For those things, users are in a pseado group called *own*.

Here are the details.

Groups
------
The following groups are distinguished, from least powerful to most powerful:

* **public**: unauthenticated user
* **auth**:   authenticated user
* **own**:    authenticated user and creator of records in question
* **office**: management user
* **system**: system administrator

Levels
------
Things may require the following access levels, from least powerful to most powerful:

* *public*
* *auth*
* *own*
* *OWN*
* *office*
* *system*

The difference between *own* and *OWN* is subtle and only relevant for
groups more powerful than *own*.
If a thing requires level *own*, but the user is in a more powerful group, such as *system*, that user has access to the thing, even if it is not his own thing.

Sometimes this is undesirable. For example if you want to show to a user the things that are really their own things. In that case,
you have to specify level *OWN* for that thing.

Authorize
---------
A table which specify the power of each group over each level that a thing may require. It is a dictionary of dictionaries: the first key is
the user group, the second key is the level of the thing.

If the dict of a user group does not contain a key for a certain level, then those users have no power to do that thing.

Otherwise the value is either 1 or -1, meaning:

* **1** : access is to be granted.
* **-1** : access is only to be granted if the thing has been created by the user.

Methods
-------
If a user needs to do something, (s)he interacts with the user interface at the client.
That will lead to an API call to the server, which will translate into the invocation of a *method*.
At that point, the first check will be made: is this user allowed to invoke this method?
The check is performed on the basis of the methods table, which is a dictionary
of method names.
For each method name a description is given, and the level required to invoke that method.

Currently we have methods to:

* get my items from a list
* get all items from a list
* get the details of a record
* modify the details of a record, or insert/delete a record
* get the DARIAH member countries
* get the list of users

Actions
-------
Methods give rise to *actions*. We distinguish:

* **insert**: create item
* **list**:   read item title
* **read**:   read item
* **update**: update item
* **delete**: delete item.

Note the difference between **read** and **list**.
An item may allow **list** to *public* but not **read**.
In that case, unauthenticated user may see the list of items, usually their titles, but they cannot drill down to see the full details of records.

Tables and Fields
-----------------
For every table and every field in them, we specify access levels.
That means: for every action on that field we state the required access level.

The authorization logic on tables then works like this:

1. the access level for invoking the method is checked;
1. if allowed, the actions and tables that the method is going to do are considered;
1. for every (table-action) combination a row filter and a field filter is constructed,
   restricting the action to only those rows and fields that are permitted to the user. This might be an empty set;
1. if the set is not empty, the action is executed on those rows and those fields.

The permissions model has a configuration section for tables as a whole, which will be checked first. This will give rise to the row filter.

Then there is also a configuration section for all fields in all tables, which will give rise to the field filter.

[perm]({{site.serverBase}}/controllers/perm.py)
==============
Contains the methods to compute permissions for controllers, tables and fields.
Here are the main methods.

getPerm(controller, table, action)
---------------
Given a controller, a table and an action (such as `read`, `update`), this method
computes whether that controller may perform that action on behalf of the current web user.
The result has three parts:

* a boolean which tells: yes, allowed, or no: forbidden;
* a rowFilter, which specifies, in case of a yes, to which rows the action may be applied;
* a fieldFilter, which specfies, in case of yes, which fields in those rows may be acted upon.

may( table, action, document=None)
---------------
Given table and an action (such as `read`, `update`), this method
computes whether that action may be performed on behalf of the current web user.
If a document is specified, the information in that document will be used to determine whether
the document is owned by the user, and in that case the permissions tend to be more liberal.
Without a document, permissions are calculated as if the user does not own any document in the table.

The result has two parts:

* a boolean which tells: yes, allowed, or no: forbidden;
* a fieldFilter, which specfies, in case of yes, which fields in those rows may be acted upon.

[db]({{site.serverBase}}/controllers/db.py)
==============

This is the data access module.
It uses the data model and the permission model to serve any data to any user
in such a way that no data is sent from server to client that the current user is not entitled to see.

The code in `db` is generic, it does not contain explicit reference to particular tables and fields.
All specifics are derived form the
[data model config file]({{site.serverBase}}/models/data.yaml)
and
[the permissions config file]({{site.serverBase}}/models/permission.yaml).

There are also *hooks*, where specific behaviour for certain tables can be specified.
That behaviour is coded in the [workflow module](#workflow).

We describe the main methods here.

validate(table, itemValues, updateFields)
-----

Server validation of the values of a record.
`itemValues` is a dictionary of all field values of the item, 
and `updateFields` is the set of fields to be updated. 

The result consists of a boolean that states whether all values are valid, a dictionary of diagnostic information if there are validation errors, a list of error messages if the validation process itself failed, and a list of new values created in related tables.

getList(controller, table, rowFilter, titleOnly, withValueLists, withFilters, my)
------------------------------------------

A true workhorse, that retrieves the contents of a table, in various circumstances.

The `controller` is the name of the top-level method that called this function.

`table` is the name of the table in question.

`rowFilter` is a selection on the rows of the table. Possibly, the access levels will restrict the set of returned rows further.

`titleOnly` tells whether only the titles or the full data of the records should be fetched. Again: access levels may constrain the set of returned fields further.

`withValueLists`: if true and if there are fields whose values reside in value lists, these value lists will be fetched as well.

`withFilters`: if true, the filter specifications of the table will also be returned.

`my`: only fetches rows that have been created by the current user.

getItem(controller, table, ident)
---------------------------------
Fetches a single item.

The `controller` is the name of the top-level method that called this function.

`table` is the name of the table in question.

`ident` is the identifier of the item in question.

This function also return for each field whether the current user is entitled to update it. 
And also whether the current user may delete this record.

Finally, the function also indicate whether the user has fetched all allowable fields. This is relevant in a scenario where the user has fetched a list of items (title only) first, and then fetches an individual item.
The client application needs to know for each item how much of its field have actually been fetched.

modList(controller, table, action)
---------------------
An other workhorse.
This function can insert, update and delete a single item.
New items are inserted as rows with blank fields.
The information to update items is fetched from the request object.
The client has sent this material to the server.

The `controller` is the name of the top-level method that called this function.

`table` is the name of the table in question.

[user]({{site.serverBase}}/controllers/user.py)
==============
Contains the logic needed to maintain the user table.
When new users log in through the DARIAH infrastructure, it collects their `eppn`, i.e. the names by which they
are identified by the autentication systems.
It also retrieves to what permission groups users belong.

[auth]({{site.serverBase}}/controllers/auth.py)
==============
Contains the methods to authenticate users.
Here all the logic about user sessions and session cookies is written down.
It builds on the bottle web framework.

[file]({{site.serverBase}}/controllers/file.py)
==============
Contains the methods to get file data from the server.
There is a method to serve static files by calling the web framework bottle.
And there is a method to read a file and deliver its content as json.

[utils]({{site.serverBase}}/controllers/utils.py)
==============
Low level stuff.

[workflow]({{site.serverBase}}/controllers/workflow.py)
==============
Contains workflow specific behaviour, i.e. the specifics of the assessment and review process.

getActiveItems(basicList)
-----------------
Calculates the active package, and from there the active types and criteria, given the current time.
This is the backdrop for any assessment and review action.

The parameter `basicList` is a function that can retrieve documents from the database, in such a way that
the access restrictions are respected. It is defined in [db](#db) and will be passed from there.
So this module does not do its own data access, all data access is still coded in [db](#db). 

detailInsert(basicList, table=None, masterDocument=None)
-------------------
Method invoked by [db](#db), just before an item is inserted.
This method has the opportunity to generate extra fields for that record, 
and to generate extra details in other tables, to be inserted.

It needs to deliver a dict of insertValues (field=value pairs) and a dict of detail records,
keyed by detail table name.
The values are lists of field=value dictionaries.
Before [db](#db) will proceed to insert them, the detail records will get the id
of the just inserted main record.
This will be used as masterId when the details get inserted.

