---
title: Tables with templates
---

Here are the particulars of our templates. Below you find all tables for which
we do have specialized templates.

Consult [Templates](Templates) to read how the mechanism of applying templates
works.

[assessment]({{site.appBase}}/tables/assessment.jsx)
====================================================

[data model]({{site.serverbase}}/models/tables/assessment.yaml)

main, mainEdit
--------------

We move a number of fields from the normal record display to the action
template. The idea is that we want to present the user clear workflow buttons,
to perform a next step in the workflow, instead of the minute standard controls.

mainAction
----------

A lot happens here, in terms of reading [workflow](Workflow) attributes and
triggering the display of workflow buttons and info panels.

### Assessment score ###

In particularm the current score of the assessment is computed by the workflow
function [assessmentScore](Dux#assessmentscore). Not only the score is
presented, but also its derivation.

### Submission ###

It is presented whether the assessment currently counts as submitted for review,
and if yes, also the date-time of the last submission. In this case there is
also a button to withdraw the assessment from review.

If the assessment does not count as submitted, a submit button is presented.

This is not the whole truth, the presence of these action buttons is dependent
on additional constraints, such as whether the current user has rights to
submit, and whether the assessment is complete.

If the contribution has received an other *type* since the creation of this
assessment, this assessment will count as *stalled*, and cannot be used for
review.

[contrib]({{site.appBase}}/tables/contrib.jsx)
==============================================

[data model]({{site.serverbase}}/models/tables/contrib.yaml)

[criteriaEntry]({{site.appBase}}/tables/contrib.jsx)
====================================================

[data model]({{site.serverbase}}/models/tables/criteriaEntry.yaml)

[review]({{site.appBase}}/tables/contrib.jsx)
=============================================

[data model]({{site.serverbase}}/models/tables/review.yaml)

[review]({{site.appBase}}/tables/reviewEntry.jsx)
=================================================

[data model]({{site.serverbase}}/models/tables/reviewEntry.yaml)
