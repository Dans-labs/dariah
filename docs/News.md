---
title: News
---

### 2017-07-01

#### Functionally
The app can now create assessments and populate an essessment with the relevant
criteria based on the type of the contribution being assessed and the current
package.

A version of a few dozen real world criteria and their scoring has been added to the
database.

### Technically
We count the lines of code in all formats used. See the [codebase](Codebase) page.

Many changes in the table area: lists and items and filters.
It has become more generic. Master-detail relations can be defined
and utilized.

New custom business logic is being introduced.

The reducers work better, and leave more parts of the state untouched if they
have not changed.
The replacement of `lodash/merge` by `Immutability-Helper` plays a big part in this.

Merging and reducing are now being unit-tested.
We have put the Mocha test framework to use and built hundreds of tests.

The documentation has been reworked extensively.

### 2017-05-19

Fixed subtle issues in form entry: [FieldEdit](Components#fieldedit) and
[InputMulti]({{site.appBase}}/components/InputMulti.jsx).
