---
title: Model
---
This application contains a generic engine to display MongoDB data according to
any specified data model, respecting access privileges.

Data model
=============================================================================================
Both the
[data model]({{site.serverbase}}/models/data.YAML)
and the
[permission model]({{site.serverbase}}/models/permission.YAML)
are YAML configuration files, and by tweaking them you can achieve a lot of customization.

MongoDB
-------
We store the data in a [MongoDB](https://docs.mongodb.com).
A MongoDB does not work with a fixed schema. A MongoDB *collection* consists of
*documents*, which are essentially JSON-like structures, arbitrarily large and arbitrarily nested.
That makes it easy to add new kinds of data to documents and collections
when the need arises to do so.
This will not break the existing code. 

MongoDB is optimized to read quickly, at the cost of more expensive data manipulation operations.
Its documentation favours storing related data inside the main document.
This increases the redundancy of the data and may lead to consistency problems,
unless the application tries to enforce consistency somehow.

In this app, with a limited amount of data, we use MongoDB primarily for its flexibility.
We still adhere largely to SQL-like practices when we deal with related tables.
So instead of storing the information of related records directly inside the main record,
we only store references to related records inside the main records.

Configuration
-------------
The data model consists of the dictionaries *generic* and *tables*.
The generic dictionary contains field names that are used in many tables, such as `createdBy`.
The tables dictionary has a key for each table, and contains all model information that the
application needs to work with that table.

Here is a description of the table model information.

### Generic
First some names of fields that occur in most records.
These fields must still be specified in the tables where they occur, including their types.

* `createdDate` 

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
A dictionary of the fields and their characteristics, needed to accommodate the display and manipulation
of its values. A field spec may contain the following bits of information:

* **label**: a user-friendly name of the field
* **multiple**: whether there is only one value allowed for this field, or a list of values.
* **valType**: the type of the values of the field. 
  * `bool`: true or false.
  * `datetime`: a date time, mostly represented in its [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
  * `number`: an integer or real number.
  * `text`: a string of characters, usually just a one-liner.
  * `URL`: a syntactically valid URL: i.e. a string of text that can be interpreted as a URL. A validation routine will check this.
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

[Permission model]({{site.serverBase}}/models/permission.YAML)
=================

The authorization system is built up from permissions.

Users are in groups, which determine their power.

Users may perform methods which undertake actions on tables and fields.

Users are authorized to command these actions, if the authorization level
of the group they are in, matches the level of authorization that is needed
for the thing.

In some cases, the identity of the user is relevant, namely when users
want to modify things they themselves have created.
For those things, users are in a pseudo group called *own*.

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

If the dictionary of a user group does not contain a key for a certain level, then those users have no power to do that thing.

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

