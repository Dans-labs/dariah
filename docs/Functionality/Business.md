# Business Logic

Here we document the functionality of the app from the perspective of the users
and stakeholders. We focus on the scenarios that are supported.

???+ note "Status of implementation"
    The DARIAH contribution tool is a big experiment in accounting for
    research releated output of institutions that cooperate in
    a European Research Infrastructure with limited funding.

    The development of this tool so far has been a significant amount of work,
    in a landscape that has been changing in several respects:

    1.   the underlying goals and expectations
    1.   the business logic that is needed
    1.   the technology on which all is based

    It is likely that further developments will lead to simpler goals,
    easier business logic, and a simpler implementation.

    That is why we do not implement all of the initial specs.
    Some of the not-implemented items we mark with:

    (✗) a **single** ✗: 
    but expected to be implemented at some point in the future.

    (✗✗) a **double** ✗: 
    unsure if it will ever be be impemented.

## Business content

All information regarding the assessment and review of contributions,
is in so-called back-office tables: *packages*, *criteria*, *types*.

??? abstract "Source of business rules"
    The business tables have been compiled under guidance of the HaS project
    by Lisa de Leeuw.

    Dirk Roorda has entered them into a big
    [back office configuration file]({{staticBase}}/tools/backoffice.yaml)
    which will be read by an import script and transported into the MongoDB
    database.

## Contributions

A contribution is a piece of work in Digital Humanities, delivered by a person
or institute, and potentially relevant to the European DARIAH research
infrastructure.

??? abstract "Selection by National Coordinators"
    The National Coordinators of DARIAH may add such a contribution to
    their agreed budget of in-kind contributions to DARIAH as a whole.

    This makes it necessary to assess contributions
    against a set of well-defined criteria.

## Assessment scenario

Contributions may represent diverse efforts such as consultancy, workshops,
software development, and hosting services.

??? abstract "Diversification and time dependency"
    This asks for a diversification of contribution types and associated criteria.

    The assessor of a contribution (from now on called *applicant*) needs to
    state how that contribution scores for each relevant criterion, and for each
    score, evidence must be given.

    Moreover, types and criteria may change over time,
    but during an assessment and review cycle they should be
    fixed.

??? abstract "Packages, types, criteria"
    Contribution types and their associated assessment criteria
    are represented by a *package* record.

    ???+ abstract "What is a package?"
        A **package** is a fixed constellation of types and criteria;
        it defines a set of contribution types, and a set of criteria, and a mapping
        between criteria and types.

        Every criterion is
        linked to a number of contribution types, meaning that the criterion is relevant
        to contributions of those types and no others.

        Every criterion is associated
        with exactly one package, hence the package ultimately determines the mapping
        between types and criteria.

    ??? abstract "Active packages"
        At any point in time there are one or more *active* packages, usually just one.

        ??? explanation "Validity interval"
            A package has a validity interval, i.e. a start date and an end date. A package
            is *active* at a point in time, if that point in time is inside the validity
            interval.

        The types of an active package are the active types, and its criteria
        are the active criteria. Technically, more than one package can be valid at the
        same time. In that case, the sets of active types and criteria are the union of
        the sets of types and criteria for each active package. But the intention is
        that there is always exactly one active package.

    ??? abstract "Workflow looks at active packages"
        Other components may call workflow functions in order to determine what the
        active packages, types and criteria are, so they can render inactive and active
        ones in different ways.

        Moreover, workflow will prevent certain actions for inactive items.

        ??? example "Inactive contribution type"
            Contributions with an inactive type cannot be assessed.
            If there are already assessments of such a contribution in the system,
            they will remain in the system, but workflow will mark them as *stalled*,
            and they can no longer be edited.

            In order to assess such a contribution, you have to change its type to
            an active contribution type.

    ???+ abstract "Rationale"
        Time dependent packages of types and criteria allow evolution of insights.
        If the current classification of contributions into types appears to have
        shortcomings, it is possible to remedy the types.
        Also, criteria can be tweaked and rewritten.

    ??? abstract "Evolution of packages"
        If the current package has trivial mistakes, e.g. in wording or spelling,
        you can modify its criteria and type records.

        However, the best way to change a package for significant changes
        is by creating a new package, and associate
        new types and criteria to it, leaving the current package unchanged.

        Then set the validity interval to a suitable value. You can let the old and new
        package overlap for testing purposes. During that interval, the old and new types
        and criteria are valid.

        After that, you can terminate the old package by adjusting its validity interval.

### Assessments

Applicants with write-access to a contribution can add a self-assessment to a
contribution.

A self assessment is a record in the **assessment** table, and
consists of a few metadata fields.

??? abstract "Criteria and criteria entry records"
    When an assessment record is created, additional *detail records* will be
    created as well. These are **criteriaEntry** records. For each assessment, there
    is a fixed set of `criteriaEntry` records. This set is determined by the
    currently active set of criteria: one `criteriaEntry` record will be created per
    active criterion.

    A `criteriaEntry` record has a field for choosing a **score** and a text field
    for entering the evidence. Scores are defined in yet another type of record.

### Assessment scoring

??? abstract "Score records"
    The scores for a criterion are entered in with the help of **score** records,
    which are detail records of criteria. Scores have a number, typically `0`, `2`,
    `4`, and a short description, typically `None`, `Partial`, `Full`, but the
    number and nature of scores may vary freely between criteria.

    The score of an assessment as a whole is the sum of the individual scores
    expressed as percentage of the total amount of points that can be assigned. A
    temporary overall score is obtained by treating unfilled scores as having value
    `0`.

??? caution "Non applicable scores"
    Some criteria may allow scores with a value `-1` (non-applicable). If
    an assessment assigns that score to a criterion, 0 points are added, but points
    missed from this criterion will be subtracted from the total score, so that this
    criterion will not be counted in the average.

    ??? example
        Suppose there are four criteria, A, B, C, D.

        A, B, and C have scores `0`, `2`, and `4`.

        D has scores `-1`, `0`, `2`, `4`.

        Now there are two contributions U and V, with scores as follows:

        Criterion | `contrib` U | `contrib` V
        --------- | ----------- | -----------
        A | 4 | 4
        B | 4 | 4
        C | 4 | 4
        D | -1 | 0
        sum | 12 | 12
        total | 12 | 16
        score | 100% | 75%

        See how U does better than V although they have an equal number of points. But
        for U criterion D does not count, while for V it counts, but the score is 0.

    ???+ note
        Not all criteria will allow `-1` values!

## Review scenario

After a contributor has filled out an assessment, (s)he can submit it for
review.

The office will select two reviewers, and they will get access to the
self-assessment.

Upon asking for review, the assessment and the contribution will be locked.

??? abstract "Reviewer roles"
    The two reviewers have distinct roles:

    *   **reviewer 1 (expert)** inspects the assessment closely and *advises* a
        decision;
    *   **reviewer 2(final say)** *makes* the decision.

    (✗✗) Both reviewers can enter comments in a comment stream, which are detail
    records of the assessment.

    The advice/decision that can be made by the reviewers is

    ??? abstract "approve"
        End of review process with positive outcome.

        The assessment will remain locked.

        The assessment score will be made public.

    ??? abstract "reject"
        End of review process with negative outcome.

        The assessment will remain locked.

        No assessment score will be made public.

        (✗✗) The applicant may enter an objection. In that case the back office will ask
        a second opinion and take appropriate action, which might lead to a change of
        decision, e.g. towards *revise*, or to a new review by other reviewers.

    ??? abstract "revise"
        The assessment and contribution will be unlocked, and the
        applicant can modify both of them in response to comments by the reviewers.
        When (s)he is finished, the applicant can resubmit the modified version.

## Selection scenario

The National Coordinator of a country can select contributions from his/her country
as in-kind contribution of his country to DARIAH for a specific year.

??? caution "Selection may overrule"
    Ideally, only contributions that have been well-reviewed will be selected.

    But the app also supports the selection of contributions in whatever stage of the
    assessment/review process.

??? explanation "Selection states"
    The national coordinator can *select* or *deselect* a contribution.
    Deselect means: explicitly *reject*. 

    (S)he can also refrain from making a decision.
    As a consequence, there are three possible selection states for a contribution:

    *   selected
    *   deselected
    *   undecided

??? explanation "Selection interface"
    The contribution record has a button for selecting it.
    Only NCs and backoffice people can see/use it.

    There is also an overview page for contributions which show the selected state
    of them. NCs can use this overview to (de)select the contributions of their country.

??? explanation "Revoking selection decisions"
    Once a NC makes a selection decision, (s)he cannot revoke it.

    As a last resort, a backoffice member can undo a decision, after which
    the NC gets a new chance to decide.

??? explanation "Selection workflow"
    There are no preconditions for selecting a contribution other than that a
    contribution is not already selected or deselected.

    After (de)selection, a contribution gets the workflow attribute `frozen`,
    which prevents all modifications of that contribution, except changing its
    selected field (only by backoffice personnel).

    Also, all its assessments and reviews,
    including their criteria entry records and review entry records
    get `frozen`.

    (✗) Moreover, the contribution will be consolidated and a pdf report
    can be generated from the consolidated record on demand.

### Consolidation

A consolidated contribution record
contains the information of the contribution, its assessments (if any), and its
reviews (if any).

??? explanation "What is consolidated?"
    It means that all links to related records have been
    replaced by the concrete values found in those records at that time.

    Consolidated records do not contain fields that point to other records, only
    concrete text/number/datetime values.

??? abstract "Storage"
    Consolidated contributions are stored in the database as complex documents
    in the `contribConsolidated` collection.

    The image below shows how this tree ends up in the client, on the application
    state.

    It is shown by the console of the web page, in development mode.

    You can see how this tree is a mini database of records and related records,
    hanging together with simple identifiers
    of the form `"ddd"` where `d` is a digit.

    ![diag](../design/design.013.png)

??? explanation "PDF generation"
    It is not completely trivial to distil a nice, well-readable document out of
    this.

    What we need is a consolidation *template*, that grabs the relevant data
    from this mini-database.

    From that template, we can produce first HTML and then
    PDF.

    Rather than a single template, we should make templates for each of the
    tables involved.

    (✗) Consolidated records will be stored as PDF and viewable from within the
    app. What needs to be done here, is to write templates that select the desired
    information from the tree of consolidated documents.

??? caution "Selection of contribs in unfinished scenarios"
    Selection may take place even if assessments and reviews have not been completed.

    After selection, no work on self-assessments and no review work can take place anymore.

    Consolidation will grab the information in assessments and reviews as they have proceeded
    so far, without attempting to complete that information in any way.

### Trails

After an assessment/review/selection process,
the system contains a trail of all that
has gone on in the following form:

???+ explanation "live contribution"
    The contribution record is still in place, frozen, and
    contains the actual situation

???+ explanation "live assessment"
    The assessment record is still in place, frozen.

??? explanation "(✗✗) comments trail"
    *   (✗✗) **live comments trail**
        *   (✗✗) by reviewers: comments and suggestions for modification
        *   (✗✗) by the applicant: to state an objection

??? explanation "(✗) consolidated contribution"
    A snapshot of the contribution, assessments and reviews at the moment
    of (de)selection.

## Management information

The app compiles management information of a statistical nature, both to the
public and authenticated users.

??? caution "Access rights"
    The quantity of information given is dependent
    on user rights.

    The public can see contributions, but not assessments and reviews, except the
    ones that are finalized with outcome "accept".

    In those cases, the assessment score is also visible.

??? abstract "National coordinators"
    NCs can (se)select contributions from this overview, but only the ones that
    belong to the country for which they are national coordinator.

## Left-overs

??? abstract "(✗✗) Email notification"
    It might be handy to send emails to users involved in assessing and reviewing to
    notify them that a key event has occurred, such as the submission of an
    assessment, the appointment of reviewers, the decisions by reviewers.

    Currently, the app does not send mail.

    ???+ note "password mail"
        Users are able to request a password reset, and will get a mail with a password link.
        These emails are not sent by the app, but by the DARIAH
        Authentication Infrastructure.

??? caution "(✗✗) Concurrent access"
    When multiple users work on the same item, or one user works on the same item
    in multiple browsers/browser windows/browser tabs, save conflicts may occur.

    These save conflicts are not handled graciously. The last saver wins.

    This problem is hard to solve, but it can be mitigated.

    One way of mitigation is already in the app: whenever a user leaves a field
    (s)he has been editing, it will be saved to the database.

    However, in those cases the whole record will be saved, which may lead to
    more data loss than is strictly necessary.

    ??? example "A data loss scenario"
        A user opens a browser tab to edit a contribution record, with the
        aim to add a keyword. The contribution has no description yet.

        Before assigning the label, the same user opens the same contribution in another
        tab and starts writing a lengthy description, and saves it.

        Then (s)he returns to the first tab and assigns a keyword.
        Upon saving, the whole record will be saved, including the description,
        which is still empty. This will overwrite the description saved
        in the second tab, a moment before.

    ??? example "Push notifications"
        An other problem is that important actions such as submission or selection
        maybe triggered from one tab, without other tabs being aware of that.

        In such cases, it would be desirable to send push notifications to all browsers
        that have that record open so that the user can refresh the page.

        I know it can be done (
        [socket]({{socket}})
        ,
        [python-socket]({{socketPython}})
        ) but it requires a bit of research to
        find the best way to do it.

## Alternatives

This app has become super flexible, but also super complicated.

??? caution "Consider to call it a day"
    We strongly advice to not develop this app further,
    but to simplify the requirements and to 
    reimplement the app, if needed.

    Also, think again whether the whole assessment/review process is
    best served by an app that codes all details of the business logic.

    It could be that other approaches serve the goals equally well and prove far more effective.

    ???+ example "GitHub as contribution tool"
        *   Define a document format for contribution metadata and for outcomes of the
            review and selection proces.
        *   Add a contribution metadata document to the GitHub repository of a contribution.
        *   Use GitHub issues for assessing, reviewing and selecting contributions,
            and store the outcomes in a document in the same repository.
        *   Use the GitHub API to query repositories that contain contributions and
            obtain their status.
        *   Even if contributions that are not stored in GitHub repositories,
            it is very easy to create a repo for them.
        *   For long term preservation, rely on generic services such as
            [Zenodo]({{zenodo}})
            and the
            [Software Heritage Archive]({{sha}})
            .

    See also  the
    [Lessons](../About/Lessons.md#this-approach-alternative-approaches)
    .
