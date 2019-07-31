# Tables with templates

Here are the particulars of our templates. Below you find all tables for which
we do have specialized templates.

Consult
[Templates](../Client/Templates.md)
to read how the mechanism of applying templates
works.

??? explanation "Kinds of templates"
    Each table specifies several kinds of templates, corresponding for the
    situations in which records must be presented.
    See
    [template organization](../Client/Templates.md#template-organization)
    .

## [contrib]({{appBase}}/tables/contrib.jsx)

[data model]({{modelBase}}/tables/contrib.yaml)

??? abstract "mainAction"
    The status of the assessment/review process is translated into big, clear
    panels that state whether you are prevented to edit this record and why.
    It also presents the assessment score (if any) of the first associated
    assessment (if any).

    Secondly, there are action buttons to (de)select this contribution,
    or to revoke such a decision. These buttons are only displayed
    if the user has rights to press them.

    To users without those rights, the selection status is indicated here.

??? abstract "related"
    Here is is defined how a contribution record should be presented as part
    of the presentation of an other record, in this case an `assessment`.

    A minimal amount of information is presented, but an url to the origin of
    the contribution is included.

    Furthermore, a link to the contribution record itself is inncluded.

## [assessment]({{appBase}}/tables/assessment.jsx)

[data model]({{modelBase}}/tables/assessment.yaml)

??? abstract "main, mainEdit"
    We move a number of fields from the normal record display to the action
    template.
    The idea is that we want to present the user clear workflow buttons,
    to perform a next step in the workflow, instead of the minute standard controls.

??? abstract "mainAction"
    A lot happens here, in terms of reading
    [workflow](Workflow.md)
    attributes and
    triggering the display of workflow buttons and info panels.

    ??? explanation "Assessment score"
        In particular the current score of the assessment is presented here. The score
        is computed server-side by the workflow function
        [assessmentScore](Workflow.md#assessmentscore)
        .
        Not only the score is presented,
        but also its derivation.

    ??? explanation "Submission"
        It is presented whether the assessment currently counts as submitted for review,
        and if yes, also the date-time of the last submission. In this case there is
        also a button to withdraw the assessment from review.

        If the assessment does not count as submitted, a submit button is presented.

        ??? caution "Permissions"
            This is not the whole truth, the presence of these action buttons is dependent
            on additional constraints, such as whether the current user has rights to
            submit, and whether the assessment is complete.

        It can also be the case that the assessment has been reviewed with outcome `revise`.
        In that case, the submit button changes into an `Enter revisions` button, and
        later to `Submit for review (again)`. 

        ??? caution "Stalled"
            If the contribution has received an other *type* since the creation of this
            assessment, this assessment will count as *stalled*, and cannot be used for
            review.

            In this case, the criteria of the assessment are not the criteria by which the
            contribution should be assessed. So the system stalls this assessment. It is
            doomed, it can never be submitted. Unless you decide to change back the type of
            the contribution. If that is not an option, the best thing to do is to copy the
            worthwhile material from this assessment into a fresh assessment.

??? abstract "insert"
    This template is used when other records, such as `contrib` need to present
    a control to add an assessment.
    Care must be taken whether this is the only assessment or 
    an additional assessment.

## [criteriaEntry]({{appBase}}/tables/contrib.jsx)

[data model]({{modelBase}}/tables/criteriaEntry.yaml)

??? abstract "detail, detailEdit"
    These records are meant to be shown as detail records of an assessment.
    As such, they are part of a big form. Each record is a row in that form
    in which the user can enter a score and state evidence for that score.

    The display of the rows is such that completed entries are clearly differentiated
    from incomplete ones.

## [review]({{appBase}}/tables/contrib.jsx)

[data model]({{modelBase}}/tables/review.yaml)

??? abstract "main, mainEdit"
    The biggest task for review templates is to show the reviews
    of both reviewers side by side, and to make the review editable
    for the corresponding reviewer.

    In doing so, the app needs to know the exact stage the review process is in,
    to be able to temporarily lock reviews when they are considered by the final
    reviewer.

??? abstract "mainAction"
    This is responsible to present the reviewers with controls to make their decisions,
    and present to other users the effects of those decisions.

??? abstract "insert"
    This template is used when other records, such as `assessment` need to present
    a control to add a review. Care must be taken whether this is a primary or 
    secondary review.

## [reviewEntry]({{appBase}}/tables/reviewEntry.jsx)

[data model]({{modelBase}}/tables/reviewEntry.yaml)

??? abstract "detail, detailEdit"
    These records are meant to be shown as detail records of a review.
    As such, they are part of a big form. Each record is a row in that form
    in which the user can enter review comments.
