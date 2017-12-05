---
title: News
---

### 2017-09022

There is now a templating mechanism in place by which I can design the display
of detail records and related records within the display of another record. I
use this to customise the criteriaEntry records within an assessment, as well as
the contribution record within an assessment.

Specific workflow code has factored out of the generic code, both in the client
app as well as in the server modules.

The server documentation has been updated.

Bugs have been fixed, and probably more have been introduced.

### 2017-09021

The presentation of assessment is developing to much more useful layouts. Lots
of issues of an information-logistic nature had to be solved.

Talking of which: the conversion of legacy content has now improved. The import
is repeatable, and will not disturb data that has been added later, using the
contribution tool itself. Read [more](Content).

### 2017-07-01

#### Functionally

The app can now create assessments and populate an assessment with the relevant
criteria based on the type of the contribution being assessed and the current
package.

A version of a few dozen real world criteria and their scoring has been added to
the database.

### Technically

We count the lines of code in all formats used. See the [codebase](Codebase)
page.

Many changes in the table area: lists and items and filters. It has become more
generic. Master-detail relations can be defined and utilized.

New custom business logic is being introduced.

The reducers work better, and leave more parts of the state untouched if they
have not changed. The replacement of `lodash/merge` by `Immutability-Helper`
plays a big part in this.

Merging and reducing are now being unit-tested. We have put the Mocha test
framework to use and built hundreds of tests.

The documentation has been reworked extensively.

### 2017-05-19

Fixed subtle issues in form entry: [FieldEdit](Components#fieldedit) and
[InputMulti]({{site.appBase}}/components/InputMulti.jsx).
