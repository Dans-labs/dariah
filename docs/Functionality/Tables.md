# Tables with templates

Here are the particulars of our templates. Below you find all tables for which
we do have specialized templates.

Consult [Templates](Templates) to read how the mechanism of applying templates
works.

## [assessment]({{appBase}}/tables/assessment.jsx)

[data model]({{serverBase}}/models/tables/assessment.yaml)

### main, mainEdit

We move a number of fields from the normal record display to the action
template. The idea is that we want to present the user clear workflow buttons,
to perform a next step in the workflow, instead of the minute standard controls.

### mainAction

A lot happens here, in terms of reading [workflow](Workflow) attributes and
triggering the display of workflow buttons and info panels.

#### Assessment score ###

In particular the current score of the assessment is presented here. The score
is computed server-side by the workflow function
[assessmentScore](Workflow#assessmentscore). Not only the score is presented,
but also its derivation.

#### Submission ###

It is presented whether the assessment currently counts as submitted for review,
and if yes, also the date-time of the last submission. In this case there is
also a button to withdraw the assessment from review.

If the assessment does not count as submitted, a submit button is presented.

This is not the whole truth, the presence of these action buttons is dependent
on additional constraints, such as whether the current user has rights to
submit, and whether the assessment is complete.

It can also be the case that the assessment has been reviewed with outcome `revise`.
In that case, the submit button changes into an `Enter revisions` button, and
later to `Submit for review (again)`. 

If the contribution has received an other *type* since the creation of this
assessment, this assessment will count as *stalled*, and cannot be used for
review.

In this case, the criteria of the assessment are not the criteria by which the
contribution should be assessed. So the system stalls this assessment. It is
doomed, it can never be submitted. Unless you decide to change back the type of
the contribution. If that is not an option, the best thing to do is to copy the
worthwhile material from this assessment into a fresh assessment.

## [contrib]({{appBase}}/tables/contrib.jsx)

[data model]({{serverBase}}/models/tables/contrib.yaml)

## [criteriaEntry]({{appBase}}/tables/contrib.jsx)

[data model]({{serverBase}}/models/tables/criteriaEntry.yaml)

## [review]({{appBase}}/tables/contrib.jsx)

[data model]({{serverBase}}/models/tables/review.yaml)

## [reviewEntry]({{appBase}}/tables/reviewEntry.jsx)

[data model]({{serverBase}}/models/tables/reviewEntry.yaml)
