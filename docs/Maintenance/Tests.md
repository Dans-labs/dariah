# Tests

We use [Mocha]({{mocha}}) for testing. As we started building tests
relatively late (not a good practice!) we do not have too many of them.

In fact, I started writing them in order to keep some of the subtler algorithms
of the app in check, such as merging new data into objects that should not
mutate.

## [fields]({{testBase}}/fields.js)

Contains a test for the [sortInterval](Lib#sorttimeinterval) function, which
compares time intervals, including intervals that are open at either side, even
at both sides.

## [memo]({{testBase}}/memo.js)

Our [memoize](Lib#memoize) function is quite sophisticated, and used many times
in the app. So it should be tested thoroughly.

There are extensive tests of the logic of the memoizer and there is a
performance test which compares it to an older, unsophisticated version of it.

## [merge]({{testBase}}/merge.js)

Several methods for merging new data (read *action data*) into an existing
object (read *state*) are tested. Do they create new objects even if the values
have not changed?

The most important test is between the two candidates `lodash/merge` and
`Immutability-Helper/update`. The outcomes shows that the latter achieves a
better stability: unchanged parts will not be replaced by new copies of values.

## [genericReducer]({{testBase}}/genericReducer.js)

### runActionTest

Given an action and the description of a few state transitions, and a list of
inspection instructions, with expected outcomes, this function will execute
those state transitions and carry out the inspections, and check whether the
expected outcomes have materialized.

The inspection instructions specify a selection of the state. This part will be
selected from the state before and after the transition, and then both parts
will be checked for object identity.

In this way you can test the effect of actions on the state in detail, and
especially whether parts that you think should be unaffected, are indeed
strictly equal.

### [filtersReducer]({{testBase}}/reduce/filtersReducer.js)

... *There areno tests here yet*

### [tablesReducer]({{testBase}}/reduce/tablesReducer.js)

There are a fair amount of tests of the table actions. The `tables` slice of the
state is the biggest and most complex piece of the state. There are also a fair
amount of actions that operate on this slice. Together this means that there is
a huge number of scenarios to be tested.

After each state transition, there are two basic things to assess:

*   the new state has the right value (the semantics is good)
*   the unchanged parts of the new state are still the same objects as those part
    in the old state (the pragmatics is good).

If the semantics turns out to be wrong, the app will appear to act
stupidly/sloppily. This is the first order error.

If the pragmatics is wrong, the app will show sluggish behaviour. For example,
if you have a big list on the screen, and there are many occurrences where a new
state is semantically equal, but wrapped in a fresh object, all list items will
be rendered twice, or, four times, or eight times, depending on the cascades of
actions that are being triggered by these spurious state changes.
