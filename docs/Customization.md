---
title: Customization
---
This application contains a generic engine to display MongoDB data according to
any specified data model, respecting access privileges.

Both the
[data model]({{site.serverbase}}/models/data.yaml)
and the
[permission model]({{site.serverbase}}/models/permission.yaml)
are yaml configuration files, and by tweaking them you can achieve a lot of customization.

However, for some parts of the application this is just not good enough,
e.g. the display of assessments.
We need a deeper customization there, where for example the detail records should
appear in one big form.

The challenge is to use as much of the generic machinery when we define custom presentations.
Our solution here is by using
[templates](Lib#templates).

Looking up a field value might seem a very innocent operation: you retrieve the
appropriate document from the database, look up the field in question, and read out the value 
that you find there.
Alas, there are several complicating factors:
* That value might be a mongo object identifier pointing to a related record.
  We do not want to display that identifier, but the corresponding record, but not
  the whole record. Only an informative heading. For that we have to look up addtional
  fields in the related table, and possibly apply logic depending on what we encounter.
* We should not show fields that the current user is not entitled to view.
  We should not put in edit controls for fields that the current user is not allowed to 
  edit.

These concerns are built into the generic logic, in the components
* [ItemRead](Components#itemread)
* [ItemEdit](Components#itemedit)
* [FieldRead](Components#fieldread)
* [FieldEdit](Components#fieldedit)
and we do not want to reimplement this logic when we do templates.

Our solution is that templates are not static strings into which 
field values are merged dynamically.

Instead, our templates are *functions* that take functions as arguments.
These function arguments deliver the actual field values, in several forms.
These functions use the general machinery to compute readonly values for fields so 
that related values are looked up and permissions are being respected.

The field values can be delivered as string values, but also as 
[FieldRead](Components#fieldread) components, or even as 
[FieldEdit](Components#fieldedit) components.

Applying a template means feeding a parametrized React component with
its argument functions, and the result is a concrete React component.

The templates will be applied by
[ItemRead](Components#itemread)
and
[ItemEdit](Components#itemedit).

When these components need to display a record, they first check
whether a suitable template has been defined, and if so, they apply it,
and if not, they apply the generic machinery. 
