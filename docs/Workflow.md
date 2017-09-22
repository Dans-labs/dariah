---
title: Workflow
---

A contribution is a piece of work in Digital Humanities, delivered by a person or institute,
and potentially relevant to the European DARIAH research infrastructure.
The national members of DARIAH may add such a contribution to their agreed budget of inkind
contributions to DARIAH as a whole. This makes it necessary to assess contributions against
a set of well-defined criteria.

### Assessment model
Contributions may represent as diverse efforts as consultancy, workshops, software development, and hosting
services.
This asks for a diversification of contribution types and associated criteria.
Moreover, types and criteria may change over time, but during an assessment and review cycle they should
be fixed.
The assessor of a contribution (from now on called *applicant*)
needs to state how that contribution scores for each relevant criterion,
and for each score, evidence must be given.

**typeContribution** is the table with the set of contribution types.

**criteria** is the table with the individual criteria, where each criteria can be associated 
with one or more types.  

**package** is the table of fixed constellations of types and criteria.
At any point in time there is one active package.
A package defines a set of contribution types, and a set of criteria.
Every criterion is associated with exactly one package, hence the package ultimately determines the
mapping between types and criteria.

A package has a validity interval, i.e. a start date and an end date.
A package is *active* at a point in time, if that point in time is inside the validity interval.
The types of an active package are the active types, and its criteria are the active criteria.
Technically, more than one package can be valid at the same time. 
In that case, the sets of active types and criteria are the union of the sets of types
and criteria for each active package. 
But the intention is that there is always exactly one active package.

#### Assessing
Applicants with write access to a contribution can add a self-assessment to a contribution.
A self assessment is a record in the **assessment** table, and consists of a few metadata fields.

When an assessment record is created, additional *detail records* will be created as well.
These are **criteriaEntry** records.
For each assessment, there is a fixed set of criteriaEntry records.
This set is determined by the currently active set of criteria:
one criteriaEntry record will be created per active criterion.

A criteriaEntry record has a field for choosing a score and a text field for entering the evidence.
Scores are defined in yet another type of record.

#### Scoring
The scores for a criterion are in detail records of criteria: **score** records.
Scores have a number, typically `0`, `2`, `4`, and a short description, typically
`None`, `Partial`, `Full`, but the number and nature of scores may vary freely between criteria.

The score of an assessment as a whole will be computed as the straight average of all scores, when
all criteriaEntry records have been filled out.
A temporary overall score is obtained by treating unfilled scores as having value `0`.

However, some criteria may allow scores with a value `NA` (non-applicable).
If an assessment assigns that score to a criterion, the criterion will not be counted in the average.

*Example*:
Suppose there are four criteria, one of which has an `NA` value among its scores, and all have `0`, `2`, and `4`.
Now there are two contributions, and all score the maximum of all criteria, except the one with the `NA` value.
Contribution *A* scores `NA` for that criterion, and contribution `B` scores `0`.

Then the overall scores are:

```
score(A) = (4 + 4  + 4    ) / 3 = 4
score(B) = (4 + 4  + 4 + 0) / 4 = 3
```

Not all criteria will allow `NA` values!

### Review model
After a contributor has filled out an assessment, (s)he can ask for a review.
Two reviewers will be selected, and they will get access to the self assessment.

Upon asking for review, the assessment and the contribution will be made immutable, temporarily.

The two reviewers have distinct roles: reviewer 1 is advisory, reviewer 2 takes decisions.

Reviewer 1 and 2 can enter comments in a comment stream, which are detail records of the assessment.

At a certain point, Reviewer 2 can take a three fold decision:

* **approve**
* **reject**
* **modifications needed**

In all cases, a *consolidated* version of the assessment will be made.

#### Approve
This is a record, where all links to related records have been replaced by concrete values present at that time.
A consolidated record only contains text fields. 
Consolidated assessments will be stored in a collection called **\_assessment**.
They contain the id of the *live* assessment, and a time stamp of the moment of consolidating.

The *live* assessment will remain immutable, but the *live* contribution becomes mutable again.
Note that an assessment has a link to its contribution, and when we consolidate an assessment, it will
contain a consolidated contribution.

So the consolidated assessment contains all information upon which the outcome of the assessment is based.

The reason why contributions will not be permanently immutable is this.
Contributions are likely to continue to evolve after assessment.
Their metadata (among which urls and email addresses) may change, and the contributor may wish 
to keep the data for his/her contribution up to data, especially in view of data exchange between the contribtuon tool
and the Market Place.

#### Reject
In this case, a *consolidated* version of the assessment will be made.
The *live* assessment will remain immutable, but the *live* contribution becomes mutable again.
The applicant may enter an objection.
In that case the backoffice will ask a second opinion and take appropriate action.

* If the second opinion is still *reject*, a new consolidated version of the assessment is saved.
  This version contains the objection and the final decision.
* If the second opinion is *approve*, a new consolidated version of the assessment is saved,
  and the final verdict will be changed to *accept*
* If the second opinion is *reassess*, the applicant is invited to create a new self assessment and offer it for
  review. Two different reviewers will be chosen.

#### Modifications needed
The *live* assessment and *live* contribution will become mutable again, and the applicant can modify both
in response to comments by the reviewers.
When (s)he is finished, the applicant can again ask for review.

### Trails
After an assessment and review process, the system contains a trail of all that has gone on in the following form:

* **live contribution**
  The contribution record is still in place, mutable, and contains only the actual situation
* **live assessment**
  The assessment record is still in place, but immutable.
* **live comments trail**
  * by reviewers: comments and suggestions for modification
  * by the applicant: to state an objection
* **consolidated versions of assessments**
  There are snapshots of the assessment at pivotal points in time:
  * when the assessment has been offered for review
  * when reviewers have made decisions
  * when second opions have been asked and given
  These snapshots ccontain snapshots of all detail records, including
  * the contribution in question
  * the then active criteria
  * the then active scores
  * the filled out criteriaEntry records
  * the comment trail at that point in time
