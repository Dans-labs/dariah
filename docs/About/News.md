# News

## 2019-05-03 ###

The overview page lead to a server error in some circumstances.
The critical error is fixed, maybe there is an other root cause to discover.

## 2019-04-24 ###

* The info page with tables that give an overview of the DARIAH
  contributions now have a button to download the overview to Excel.
  The Excel data is based on the same data as the overview.
  The format is csv (technically: in utf-16-le with BOM mark).
  This format can be opened without questions by Excel and Numbers.

## 2019-03-04 ###

* Bottle has been replaced by Flask also online

## 2018-12-11 ###

* Bottle has been replaced by Flask (not yet online)

## 2017-12-14 ###

The workflow functions have developed into a serious engine,
that can be configured from within the data model.
Templates are the prime consumers of this information.

The review workflow is implemented.
Not yet in all fullness, but the basics such as advice by the first reviewer,
decision by the second reviewer work, as well as marking
a successfully reviewed contribution as DARIAH approved.

For Python, Javascript and Markdown I have started using code formatters.
So the exact formatting of all these sources are not my doing,
but the work of carefully configured software tools.
That brings a bit more consistency in the sources. 

I have done a lot of documentation updates.


## 2017-09-22 ###

There is now a templating mechanism in place by which I can design the display
of detail records and related records within the display of another record. I
use this to customise the criteriaEntry records within an assessment, as well as
the contribution record within an assessment.

Specific workflow code has factored out of the generic code, both in the client
app as well as in the server modules.

The server documentation has been updated.

Bugs have been fixed, and probably more have been introduced.

## 2017-09-21 ###

The presentation of assessment is developing to much more useful layouts. Lots
of issues of an information-logistic nature had to be solved.

Talking of which: the conversion of legacy content has now improved. The import
is repeatable, and will not disturb data that has been added later, using the
contribution tool itself. Read
[more](../Legacy/Content.md)
.

## 2017-07-01 ###

### Functionally ####

The app can now create assessments and populate an assessment with the relevant
criteria based on the type of the contribution being assessed and the current
package.

A version of a few dozen real world criteria and their scoring has been added to
the database.

## Technically ###

We count the lines of code in all formats used. See the
[codebase](Codebase.md)
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

## 2017-05-19 ###

Fixed subtle issues in form entry:
[FieldEdit](../Client/Components.md#fieldedit)
and
[InputMulti]({{appBase}}/components/InputMulti.jsx)
.
