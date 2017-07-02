---
title: API
---

### Root

All API calls are structured like this:

`https://dariah-beta.dans.knaw.nl/api/db/`**verb**`?`**parameters**

Below there is a partial specification of the verbs and their parameters.

### Permissions

Data access is controlled. You only get the data you have rights to.
If you fetch records, it depends on your access level which records
and which fields are being returned.

The contribution tool itself uses this API to feed itself with data.
It does not use other data access.

### Source

Lacking more complete information, you might want to look into the
source code:

* [index.py]({{site.serverBase}}/index.py)
* [controller.py]({{site.serverBase}}/controllers/controller.py)

### list

`list?table=`**table name**`&complete=`**false** or **true**

Get the records of the table with name **table name**.

If `complete=false`, fetch only the titles of each record.
Otherwise, fetch all fields that you are entitled to read.

The result is a json object, containing subobjects for the specification of the data model of this table.

The actual records are under `entities`, keyed by their MongoDB `_id`.

Per entity, the fields can be found under the key `values`.

#### Example

[view a collection](https://dariah-beta.dans.knaw.nl/api/db/list?table=contrib&complete=true)

### view

`view?table=`**table name**`&id=`**mongoId**

Get an individual item from the table with name **table name**,
and identifier **mongoId**.
having all fields you are entitled to read.

#### Example

[view an item](https://dariah-beta.dans.knaw.nl/api/db/view?table=contrib&id=595426cf2179c0309da90f0e)
