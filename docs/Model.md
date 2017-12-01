---
title: Model
---
This application contains a generic engine to display MongoDB data according to
any specified data model, respecting access privileges.

MongoDB
==============================================================================
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
==============================================================================
The
[model]({{site.serverbase}}/models/model.yaml)
and the files in 
[table]({{site.serverbase}}/models/tables)
are YAML configuration files, and by tweaking them you can achieve a lot of customization.

Name handling
---------------------------------------------------------------------
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
[compile.py]({{site.serverBase}}/compile.py)
script, just before starting the server.
That enables us to collect the names and generate some code.
Every part of the `.yaml` files that may act as a name, is collected.
We generate a module
[names.py]({{site.serverBase}}/models/names.py)
that contains a line

`N_`*name* `= '`*name*`'`

This module of names will be imported whenever the models are imported. 
So whenever we want to refer to a name in one of the models, we have
a Python variable in our name space that is equal to that name prepended with `N_`.
By consequently using `N_`*names* instead of plain strings, we guard ourselves against
typos, because the Python parser will complain about undefined variables.

Moreover, the same 
[compile.py]({{site.serverBase}}/compile.py)
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
========================================================================================
The data model consists of the dictionaries *generic*, *custom* and *tables*.

The *generic* dictionary contains field names that are used in many tables, such as `dateCreated`.

The *custom* dictionary is a list of names used in custom workflows, such as defined in
[workflow]({{site.serverbase}}/controllers/workflow.py) (see also [Workflow](Workflow).

The *tables* dictionary has a key for each table, and contains all model information that the
application needs to work with that table.

Here is a description of the table model information.

`generic`
-----------------------------------------------------------------------------------
Most branches of the *generic* dictionary are lists of names with the purpose
of triggering the creation of a `N_`*name*, so that we can refer to those names
in a consistent way.

A few branches will actually be used as such by the app.

### `systemFields`
A list of field names that occur in most records.
The fields themselves must still be specified in the tables where they occur,
including their types.

### Table defaults
Here are the branches under `generic` that contain defaults for the table
specifications.

#### `title`
The name of the field that will be used as title when a records are listed.

#### `item`
A display name by which we call individual entities, with a value for singular and plural.
E.g. for the table `country` we have as item: `country` and `countries`.

#### `sort`
A list of sort keys. A sort key is a pair consisting of a field,
and a direction (-1: descending, 1: ascending).

#### `fieldOrder`
A list of the fields, in the order by which will we displayed when the interface presents a record.

#### `fieldSpecs`
A dictionary of the fields and their characteristics, needed to accommodate the display and manipulation
of its values.

A field spec is a dictionary, keyed by field name.
A field spec value may contain the following bits of information:

* `label`: a user-friendly display name of the field.
* `multiple`: whether there is only one value allowed for this field, or a list of values.
* `valType`: the type of the field and its other behavioural characteristics: see the section **valType** below.
* `grid`: this is a branch of settings relevant for laying out the table in a grid.
  They are the CSS [flex](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) attributes.
  `width`: the intended width of the column in which this field is presented;
  `grow` (*optional: default:* `0`) the degree by which the column width is allowed to increase
  `shrink` (*optional: default:* `0`) the degree by which the column width is allowed to decrease.
* `valid`: the name of a client-side validation function by which new and modified values for this
  field are validated.
  The validators are exposed in [fields.js]({{site.libBase}}/fields.js) as member functions
  of a `validation` object.

  **N.B:** the server carries out extensive, non-customizable validation as well, in order
  to protect the integrity of the database. 

##### `valType`
If a field contains an explicit value or list of values, i.e. a value that stands on its
own and does not refer to other records, `valType` is just a string that specifies the 
type of the field. 
If the field may contain a list of values, `valType` specifies the type of a single value.

Possible types are:
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

When a field refers to other records, there is much more to specify.
In this case `valType` is a branch with the following information.
* `relTable`: the table that contains the related records;
* `allowNew`: whether the user is allowed to enter new records in the related table;
* `popUpIfEmpty`: (*optional: default:* `false`) if an edit view on a record having an empty value for this field is shown,
  a widget to choose a value will pop up immediately.
  Otherwise there will be just a control button, inviting you to enter a value.
* `select`: a criterion on records in the related table, see section **select** below;
* `fixed` (*optional, default:* `false`) whether the value of this field is fixed after it has been
  assigned initially; see section **fixed** below.
* `inactive`: (*optional*) this field relates to custom presentations, defined in
  [Workflow](Workflow); see section **inactive** below.

###### `select`
Only the records that satisfy the criterion specified in `select`, are allowed values.
The criterion may be an arbitrary MongoDb selction constraint.

**Example 1:** the `country` field in the `contrib` table has `isMember: true`.
So when we choose a country for a contribution, we will be presented with a choice between those
countries that are a member of DARIAH.

**Example 2:** the `reviewerE` field in the `assessment` table points to the user table, but it has
a `select` condition:

```yaml
authority:
- $ne: legacy
``` 

That means, only users for which the `authority` field is not `legacy` can be chosen as reviewer.

###### `fixed`
A fixed field can assigned a value, and after that it is frozen.
If a field is fixed, the user interface will be informed to not provide edit controls for it,
and the server will be instructed not to modify this field.

**Example:** When an assessment record is created for a contribution, its field
`assessmentType` is copied from the `typeContribution` field of the master `contribution` record.
Based on that, a fixed set of `criteriaEntry` records are assembled as details to the `assessment` record.
If the contribution type is changed in a later stage, the `assessmentType` still shows the
type on which the assembly of `criteriaEntry` records is based. 
We cannot change these records, because the user may have entered data in it.
If the contribution really needs an other type, the best way to proceed is to
create a new blank assessment, copy the relevant information over from the old assessment,
and then remove the old assessment. 

###### `inactive`
By some definition, certain records can be marked as
*inactive*. `inactive` is a branch with settings how to present inactive items:
* `disabled`: if true, do not present inactive items in choice widgets: so if you modify the value,
  you cannot choose inactive values.
* `attributes`: e.g. a CSS `className` and a `title` attribute (tooltip) that will be
  put on the element that renders the item.
  Any set of valid attributes will do,
  there are no additional constraints.

**Example:** 
The `typeContribution` field of a `contrib` record may be obsolete, because it is not
specified in the current package (see [Workflow](Workflow).
In the `valType` for this field we see the following specification:

```yaml
inactive:
    attributes:
      className: inactive
    disabled: true
```

This is the rendered HTML for this value:

```html
<a
    href="/data/typeContribution/list/item/00000000cca4bbd9fe00000b"
    class="tag disabled inactive"
>Tools and Software</a>
```

#### Listing related records
When we need to show a related record as a single value, we use its title field, as
specified by its `title` entry in the table info, if present, otherwise we look it up from
the generic branch.
However, the client code may have implemented special code for certain tables,
such as `user`, and `country`. 
See [repCountry and repUser]({{site.appBase}}/dux/table.js).
Note, that in many cases, the related table is a *value list*:
every record consists of an `_id` field (the standard MongoDB identifier field)
and a field called `rep`, which contains the representation of the value.
Value lists may or may not have table information specified.
The default table information in `generic` is such that the value lists
are covered by it.

**N.B.** In all cases, the permissions model is also consulted, because
the permissions model has a say in which fields are allowed to reach the client.
For example, if a non-authenticated user is shown the creator of a record,
(s)he sees information from the `user` table.
But the permissions are such that (s)he may not see the email address of that user.
So the email address does not even reach the client.

`tables`
-----------------------------------------------------------------------------------------------
For every table we specify its fields, filters, details and a few other attributes.
We have already seen branches under `generic` for the default specification.
The specific tables may have these branches too, with
table-specific values. There are some more.

### `filters`
A list of filters by which to constrain the set of records to be displayed.
There are *fulltext* filters and *faceted* filters.

Each filter is a dictionary with the following information.

* `field` The name of the field to be filtered.
* `relField` (*optional*) If `field` is an identifier pointing to a related
  table, the `relField` specifies which field in the related table should be filtered.
  For example, if you want to filter `criteriaEntry` records on there `score`,
  you are faced with the fact that scores live in a separate table, and the actual
  score is contained in the field `score` of that table.
  The `criteriaEntry` records contain just an `_id` into the table `score`.
  Hence, if we want to filter on actual scores, we say `field: score` and `relField: score`.
* `label` A user friendly name for the filter, usually the label of the field to be filtered.
* `type` The type of filter:
  `ByValue`: faceted,
  `EUMap`: faceted, plus a visualisation on the map of Europe,
  `Fulltext`: full text search in the field.
* `maxCols`: (*not needed for `Fulltext` filters*)
  facets are displayed in a table with at most this amount of columns.
* `expanded`: (*not needed for `Fulltext` filters*)
  whether the table of facets is initially expanded or collapsed.

### `details` and `detailOrder`
A record may have *detail records* associated with it.
We call such a record a *master record* with respect to its details.
Details are records, usually in another table, having a field that points to 
their master record by means of an `_id` value.

A master record may have multiple kinds of detail records, i.e. detail records from
several distinct tables.
It is also possible to specify multiple kinds from one and the same originating table.
The kind is specified by just a tag, which often is the name of the originating table.

When a master record is presented in full view, all of its fields are expanded
with their values.
Below that there are lists of head lines of detail records, sorted by table
where they are from.

The order of these kinds is specified in `detailOrder`.

The specification of each kind of detail is specified in the branch `details`.
For each originating kind there is the following information:

* `table` The name of the originating table;
* `linkField` The name of the field in the originating table that links to the master record;
* `mode` The display mode of the detal records: as grid or list;
* `filtered` whether the detais of this kind should have filter controls.
  If yes, the filters are taken from the specification of the originating table.
* `expand` (*optional, default:* `false`) If this is true, the all detail records of this kind will be
  immediately expanded.
  Normally, detail records are presented as head lines initially.
* `border` (*optional, default:* `read: true, edit: true`)
  whether to put a border around each individual detail record of this kind.
  This feature must be specified for the read-only presentation and the editable presentation
  separately, by means of the keys `read` and `edit`.
* `cascade` (*optional, default:* `false`)
  when the master record is deleted, its details have a dangling reference
  to a non-existing master record.
  In some cases it is desirable to delete the detail records as well. If `cascade: true`, the
  detail records of this kind will be deleted together with the master record.

  **Example 1:** the `criteriaEntry` detail records are deleted with their master `assessment` record.

  **Example 2:** the `criteria` detail records are *not* deleted with their master `package` record.

* `fixed` (*optional, default:* `false`) whether the list of details of this kind is fixed.
  Details of a kind are fixed, if, after having been created, no details may be added or removed.
  Individual details may still be modified.

  **Example:** once an `assessment` record for a contribution has been created,
  a special [workflow](Workflow) takes care to lookup the list of criteria that
  apply to this contribution, based on its `typeContribution` field.
  (This mapping is read from the `criteria` detail records of the currently active `package` records).
  For each criterion a `criteriaEntry` detail record is added to the master `assessment` record.
  After that, the list of `criteriaEntries` for this `assessment` record may not change
  anymore.
  But the user is still be able to fill out the `criteriaEntry` records.

### `needMaster`
*optional: default:* `false`.
Some tables act as containers for detail records exclusively, and it makes no sense
to create a detail record if there is no master record to point to.
If that is the case, specify `needMaster: true`, otherwise, leave it out.

If `needMaster: true`, there will be no plus button (insert item) when the records
are displayed as a main list.
Only when they are displayed as a list of details to some master record,
the plus button will appear.

**Example 1:** `assessment`s can only be created as detail of a `contribution`.

**Example 2:** `package`s can be seen as details of `typeContribution`, in the sense
that for each contribution type, there is a list of packages to tell when
that contribution type was valid and which criteria were associated with it.
Yet a package record makes sense on its own.
When you create it, you do not have to select a contribution type first.
Rather, you create a package, and in its `typeContribution` field you select a number
of contribution types.

Permission model
========================================================================================
The authorization system is built on the basis of *permission* levels.

Users are assigned to groups, which determine their permission level.
In practice, we identify the concepts of *groups* and *permission levels*.

Users may call *methods* which undertake *actions* on tables and fields.

These actions are authorized to happen on behalf of a certain user if the permission level
of the user, is at least the permission level that the thing requires for that action.

In some cases, the identity of the user is relevant, namely when users
want to modify things they themselves have created.
For those things, users are in a pseudo group called *own*.

In yet other cases, when users change the permission levels of users, the permission levels
of both users need to be taken into account.

Here are the details.

Groups
----------------------------------------------------------------------
The following groups are distinguished, from least powerful to most powerful:

* `public`: unauthenticated user
* `auth`:   authenticated user
* `office`: management user
* `system`: system administrator
* `root`:   root access

Levels
----------------------------------------------------------------------
Things may require the following access levels, from least powerful to most powerful:

* `public`
* `auth`
* `own`:    authenticated user and creator of records in question
* `OWN`:    idem, cannot be overridden by higher levels
* `ownLT`:  only if owner's power is less than editor's power
* `office`
* `system`
* `root`
* `nobody`: omnipotent access (however: nobody can be member of this group, so this effectively means:
  nobody is allowed to do this)

The difference between *own* and *OWN* is subtle and only relevant for
groups more powerful than *own*.
If a thing requires level *own*, but the user is in a more powerful group, such as *system*,
that user has access to the thing, even if it is not his own thing.

In some circumstances this is undesirable.
For example if you want to show a user a list of *My items*, we want to show
the items this user owns, not the items he is allowed to change.
In such a case, we specify level *OWN* for *My items*.

The level *ownLT* is only relevant when one user modifies the group of another user.
The level *ownLT* means that this operation is only permitted if the
user that undergoes modification is currently less powerful than
the user that performs the modification.

### Authorize
A table which specify the power of each group over each level that a thing may require.
It is a dictionary of dictionaries: the first key is
the user group, the second key is the level of the thing.

If the dictionary of a user group does not contain a key for a certain level,
then the users in that group have no power to do that things that require that level.

Otherwise the value is either 1, -1, or -2, meaning:

* `1` : access is to be granted.
* `-1` : access is only to be granted if the thing has been created by the user.
* `-2` : access is only to be granted if the relative group levels work out:
  * like *ownLT* above: users cannot modify the power of more powerful users
  * and users cannot assign more power (to themselves or others) than they themselves have.

### Methods
If a user needs to do something, (s)he interacts with the user interface at the client.
That will lead to an API call to the server, which will translate into the invocation of a *method*.
At that point, the first check will be made: is this user allowed to invoke this method?
The check is performed on the basis of the methods table, which is a dictionary
of method names.
For each method name a description is given, and the level required to invoke that method.

Currently we have the following methods:

* `mylist` get my items from a list
* `list` get all items from a list
* `view` get the details of a record
* `mod` modify the details of a record, or insert/delete a record

### Actions
Methods give rise to *actions*. We distinguish:

* `insert`: create an item
* `list`:   read item titles
* `read`:   read items
* `update`: update an item
* `delete`: delete an item.

Note the difference between `read` and `list`.
An item may allow `list` to *public* but not `read`.
In that case, unauthenticated user may see the list of items, usually their titles,
but they cannot drill down to see the full details of records.

### Tables and Fields
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
