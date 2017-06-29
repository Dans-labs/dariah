---
title: Tests
---

We use [Mocha](https://mochajs.org) for testing.
As we started building tests relatively late (not a good practice!) we do not have too many
of them.

In fact, I started writing them in order to keep some of the subtler algorithms
of the app in check, such as merging new data into objects that should not mutate.

[fields]({{site.testBase}}/fields.js)
=============================================================================================

[memo]({{site.testBase}}/memo.js)
=============================================================================================

[merge]({{site.testBase}}/merge.js)
=============================================================================================

[genericReducer]({{site.testBase}}/genericReducer.js)
=============================================================================================

## [filtersReducer]({{site.testBase}}/reduce/filtersReducer.js)

## [tablesReducer]({{site.testBase}}/reduce/tablesReducer.js)
