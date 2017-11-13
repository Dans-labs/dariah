---
title: Model
---
This application contains a generic engine to display MongoDB data according to
any specified data model, respecting access privileges.

Data model
=============================================================================================
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
Both the
[data model]({{site.serverbase}}/models/data.yaml)
and the
[permission model]({{site.serverbase}}/models/permission.yaml)
are YAML configuration files, and by tweaking them you can achieve a lot of customization.

### Name handling
There are a lot of names in these yaml files.
The most obvious way to use them in our programs
(Python on the server, JavaScript on the client)
is by just mentioning them as strings, e.g.:

```python
title = DM['tables']['permissionGroup']['title']
```

and

```javascript
title = DM.tables.permissionGroup.title
```

or

```javascript
const { tables: { permissionGroup: { title } } } = DM
```

But then the question arises:
how can we use these names in our programs
in such a way that we are protected agains typos? 

Well, we convert the `.yaml` model files to Python modules that expose
the same model, but now as Python data structure.
This is done by means of the
[confyg.py]({{site.serverBase}}/confyg.py}})
script, just before starting the server.
That enables us to collect the names and generate some code.
Every part of the `.yaml` files that may act as a name, is collected.
We generate a module
[names.py]({{site.serverBase}}/models/names.py}})
that contains a line

`N_`*name* `= '`*name*`'`

This module of names will be imported whenever the models are imported. 
So whenever we want to refer to a name in one of the models, we have
a Python variable in our name space that is equal to that name prepended with `N_`.
By consequently using `N_`*names* instead of plain strings, we guard ourselves against
typos, because the Python parser will complain about undefined variables.

Moreover, the same 
[confyg.py]({{site.serverBase}}/confyg.py}})
module also checks all the code in the controllers directory for names:
* whether every `N_`*name* is defined in the `names.py` and
* if there are occurrences of plain strings for which an `N_`*name* is defined.

This solves the case for the Python server code.

For the client JavaScript code we do not have such measures.
We could do the same approach, but that would severely uglify the code:

```javascript
title = DM[N_tables][N_permissionGroup][N_title]
```

or

```javascript
const { [N_tables]: { [N_permissionGroup]: { [N_title]: title } } } = DM
```

Especially the replacement of

```javascript
{ name }
```

by

```javascript
{ [N_name]: name }
```

really hurts.
So we do not do anything here, and rely on debugging away the typos the hard way.

Data model
----------------------------------------------
The data model consists of the dictionaries *generic*, *custom* and *tables*.

The *generic* dictionary contains field names that are used in many tables, such as `dateCreated`.

The *custom* dictionary is a list of names used in custom workflows, such as defined in
[workflow]({{site.serverbase}}/controllers/workflow.py) (see also [Workflow](Workflow).

The *tables* dictionary has a key for each table, and contains all model information that the
application needs to work with that table.

Here is a description of the table model information.

### Generic
Most branches of the *generic* dictionary are lists of names with the purpose
of triggering the creation of a `N_`*name*, so that we can refer to those names
in a consistent way.

A few branches will actually be used as such by the app.

#### systemFields
A list of field names that occur in most records.
The fields themselves must still be specified in the tables where they occur,
including their types.

#### title
The name of the field that will be used as title when a records are listed.

#### sort
A list of sort keys. A sort key is a pair consisting of a field, and a direction (-1: descending, 1: ascending).

The value here is only a default, every table can have its own specification.

#### fieldOrder
A list of the fields, in the order by which will we displayed when the interface presents a record.

The value here is only a default, every table can have its own specification.

#### fieldSpecs
A dictionary of the fields and their characteristics, needed to accommodate the display and manipulation
of its values.

The value here is only a default, every table can have its own specification.

A field spec is a dictionary, keyed by field name.
A field spec value may contain the following bits of information:

* **label**: a user-friendly display name of the field.
* **multiple**: whether there is only one value allowed for this field, or a list of values.
* **valType**: the type of the values of the field. 
  * `bool`: `true` or `false`.
  * `datetime`: a date time,
    mostly represented in its [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
  * `number`: an integer or real number.
  * `text`: a string of characters, usually just a one-liner.
  * `url`: a syntactically valid URL: i.e. a string of text that can be interpreted as a URL.
    A validation routine will check this.
  * `email`: a syntactically valid email address.
    A validation routine will check this.
  * `textarea`: a string of characters, which may extend to several pages.
    It is assumed that this is Markdown text,
    and its formatted version will be shown on the interface,
    see [MarkdownArea](Components#markdownarea).
  * a dictionary specifying related table info:
    * `relTable`: the table that contains the related values;
    * `allowNew`: whether the user is allowed to enter new values
      that are not yet present in the related table;
    * `select`: a criterion on the related table:
      only the records that satisfy it, are allowed values.
    When we need to show a related record as a single value, we use its title field, as
    specified by its `title` entry in the table info, if present, otherwise we look it up from
    the generic branch.
    However, the client code may have implemented special code for certain tables,
    such as `user`, and `country`. 
    See [repCountry and repUser]({{site.appBase}}/dux/table.js).
    Note, that in many cases, the related table is a *value list*:
    every record consists of an `_id` field (the standard MongoDB identifier field)
    and a field called `rep`, which contains the representation of the value.

    **N.B.** In all cases, the permissions model is also consulted, because
    the permissions model has a say in which fields are allowed to reach the client.
    For example, if a non-authenticated user is shown the creator of a record,
    (s)he sees information from the `user` table.
    But the permissions are such that (s)he may not see the email address of that user.
    So the email address does not even reach the client.

### tables
For every table we specify its fields, filters, details and a few other attributes.
We have already seen **title**, **sort**, **fieldOrder** and **fieldSpecs**.

#### item
A display name by which we call individual entities, with a value for singular and plural.
E.g. for the table `country` we have as item: `country` and `countries`.

#### filters
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

Permission model
--------------------
The authorization system is built up from permissions.

Users are assigned to groups, which determine their power.

Users may perform methods which undertake actions on tables and fields.

Users are authorized to command these actions, if the authorization level
of the group they are in, matches the level of authorization that is needed
for the thing.

In some cases, the identity of the user is relevant, namely when users
want to modify things they themselves have created.
For those things, users are in a pseudo group called *own*.

Here are the details.

#### Groups
The following groups are distinguished, from least powerful to most powerful:

* **public**: unauthenticated user
* **auth**:   authenticated user
* **own**:    authenticated user and creator of records in question
* **office**: management user
* **system**: system administrator
* **root**:   root access
* **nobody**: no restrictions (however: nobody can be member of this group)

#### Levels
Things may require the following access levels, from least powerful to most powerful:

* *public*
* *auth*
* *own*
* *OWN*
* *ownLT*
* *office*
* *system*

The difference between *own* and *OWN* is subtle and only relevant for
groups more powerful than *own*.
If a thing requires level *own*, but the user is in a more powerful group, such as *system*,
that user has access to the thing, even if it is not his own thing.

Sometimes this is undesirable.
For example if you want to show to a user the things that are really their own things.
In that case, you have to specify level *OWN* for that thing.

The level *ownLT* is only relevant when one user modifies the group of another user.
The level *ownLT* means that this operation is only permitted if the group of the
user that undergoes modification is currently less powerful than the group of
the user that performs the modification.

#### Authorize
A table which specify the power of each group over each level that a thing may require.
It is a dictionary of dictionaries: the first key is
the user group, the second key is the level of the thing.

If the dictionary of a user group does not contain a key for a certain level,
then those users have no power to do that thing.

Otherwise the value is either 1, -1, or -2, meaning:

* **1** : access is to be granted.
* **-1** : access is only to be granted if the thing has been created by the user.
* **-2** : access is only to be granted if the relative group levels work out:
  * like *ownLT* above: users cannot modify the power of more powerful users
  * and users cannot assign more power (to themselves or others) than they themselves have.

#### Methods
If a user needs to do something, (s)he interacts with the user interface at the client.
That will lead to an API call to the server, which will translate into the invocation of a *method*.
At that point, the first check will be made: is this user allowed to invoke this method?
The check is performed on the basis of the methods table, which is a dictionary
of method names.
For each method name a description is given, and the level required to invoke that method.

Currently we have the following methods:

* **mylist** get my items from a list
* **list** get all items from a list
* **view** get the details of a record
* **mod** modify the details of a record, or insert/delete a record

#### Actions
Methods give rise to *actions*. We distinguish:

* **insert**: create an item
* **list**:   read item titles
* **read**:   read items
* **update**: update an item
* **delete**: delete an item.

Note the difference between **read** and **list**.
An item may allow **list** to *public* but not **read**.
In that case, unauthenticated user may see the list of items, usually their titles,
but they cannot drill down to see the full details of records.

#### Tables and Fields
For every table and every field in it, we specify an access level.
That means: for every action on that field we state the required access level.

The authorization logic on tables then works like this:

1. the access level for invoking the method is checked;
1. if allowed, the actions and tables that the method is going to perform are considered;
1. for every (table-action) combination a row filter and a field filter is constructed,
   restricting the action to only those rows and fields that are permitted to the user;
   this might be an empty set;
1. if the set is not empty, the action is executed on those rows and those fields that pass
   the filters.

The permissions model has a configuration section for tables as a whole,
which will be checked first.
This will give rise to the row filter.

Then there is also a configuration section for all fields in all tables,
which will give rise to the field filter.
