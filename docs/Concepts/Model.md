# Model

This application contains a generic engine to display MongoDB data according to
any specified data model, respecting access privileges.

## MongoDB

We store the data in a
[MongoDB]({{mongodb}})
.

??? details "Data as documents"
    A MongoDB does not work with
    a fixed schema. A MongoDB *collection* consists of *documents*, which are
    essentially JSON-like structures, arbitrarily large and arbitrarily nested. That
    makes it easy to add new kinds of data to documents and collections when the
    need arises to do so. This will not break the existing code.

    MongoDB is optimized to read quickly, at the cost of more expensive data
    manipulation operations. Its documentation favours storing related data inside
    the main document. This increases the redundancy of the data and may lead to
    consistency problems, unless the application tries to enforce consistency
    somehow.

    In this app, with a limited amount of data, we use MongoDB primarily for its
    flexibility. We still adhere largely to SQL-like practices when we deal with
    related tables. So instead of storing the information of related documents
    directly inside the main document, we only store references to related documents
    inside the main documents.

???+ caution "Terminology"
    Because our treatment of data is still very relational, 
    we prefer wording derived from SQL databases, at least in the present documentation:

    MongoDB | SQL
    --- | ---
    *collection* | **table**
    *document* | **record**

## Configuration

The
[model]({{modelBase}}/model.yaml)
and the files in
[table]({{modelBase}}/tables)
are YAML configuration files, and by
tweaking them you can achieve a lot of customization.

## Data model

The data model has a generic part and a table specific part.

### Generic part

See
[model.yaml]({{modelBase}}/model.yaml)
.

Here we define structures and values that are relevant for the system as a whole
and/or for all tables:

??? abstract "defaults"
    Defaults for table models. Whenever a table misses one of the keys
    listed here, the value here will be filled in for that table.

    The defaults are suited to tables that act as value lists, of which we have quite
    a bunch.

    All these tables need a very short own specification.

    The meaning of these keys are explained in
    [table configuration](#table-model)
    .

??? abstract "provenance"
    Fields for recording the edit history of a record.

    ??? details "provenanceOrder"
        Field names for provenance fields in a specific order.

    ???+ details "provenanceSpecs"
        Field specifications for the provenance fields.

        We have these fields:

        ??? details "editors"
            List of ids of non-owner users that may edit this record,
            even if their group permissions do not allow it.

        ??? details "creator"
            Id of the user that created the record.

        ??? details "dateCreated"
            Datetime when the record was created.

        ??? details "modified"
            Trail of modification events, each event has the name
            of the user who caused the change and the datetime when it happened.
            The trail will be weeded out over time.

        The field "editors" may be changed by the owner of a record, and by
        people with higher powers such as the backoffice,
        not by the editors themselves (unless they also have higher power).

        All other fields cannot be modified by users, not even by users with higher
        powers. Only the system itself will write and update these fields.

        ??? caution "Backdoors"
            A person with access to the underlying Mongo DB can do with the data
            what (s)he wants.

            This requires a direct interaction with the machine on which the database
            resides. Webaccess is not sufficient.

??? abstract "generic"
    A few values for the system:

    ??? abstract "systemFields"
        The list of provenance fields that the system must manage after each change
        to a record.

        ??? caution "Specs"
            These fields must still be specified in the tables where they occur,
            including their types.

    ??? abstract "noTitle"
        The default title of a record if the title is not given in any other way.

??? abstract "permissions"
    The mechanics of the group-based permissions system is defined here.

    See
    [permission model](#permission-model)
    below.

??? abstract "workflow"
    See
    [workflow engine](../Functionality/Workflow.md)
    .

??? abstract "names"
    Used in 
    [name handling](#name-handling)
    .

### Table model

Everything that the app needs to know about a table is in the table model.
For each table that needs specs beyond the default,
there is a corresponding model file in the
[model directory]({{modelBase}}/tables)
.

Here we describe the keys in the table models.

??? details "title"
    The name of the field that will be used as title when records are listed.

??? details "item"
    A display name by which we call individual entities, with a value for singular
    and plural. E.g. for the table `country` we have as item: `country` and
    `countries`.

??? details "sort"
    A list of sort keys. A sort key is a pair consisting of a field, and a direction
    (-1: descending, 1: ascending).

??? details "fieldOrder"
    A list of the fields, in the order by which will we displayed when the interface
    presents a record.

??? details "fieldSpecs"
    A dictionary of the fields and their characteristics, needed to accommodate the
    display and manipulation of its values. Field names are the keys, the values
    are themselves dictionaries, containing:

    ??? details "label"
        A user-friendly display name of the field.

    ??? details "multiple"
        Whether there is only one value allowed for this field,
        or a list of values.

    ??? details "valType"
        The data type of the field and its other behavioural characteristics.

        ??? details "Direct values"
            If a field contains an explicit value or list of values, i.e. a value that
            stands on its own and does not refer to other records, `valType` is just a
            string that specifies the type of the field.
            If the field may contain a list of values
            (`multiple=true`),
            `valType` specifies the type of a single value.

            Possible types are:

            ??? details "bool"
                `true` or `false`.

            ??? details "datetime"
                A date time, mostly represented in its
                [ISO 8601]({{iso8601}})
                format.

            ??? details "number"
                An integer or real number.

            ??? details "text"
                A string of characters, usually just a one-liner.

            ??? details "url"
                A syntactically valid URL: i.e. a string of text that can be
                interpreted as a URL. A validation routine will check this.

            ??? details "email"
                A syntactically valid email address. A validation routine will check
                this.

            ??? details "textarea"
                A string of characters, which may extend to several pages.
                It is assumed that this is Markdown text,
                and its formatted version will be shown on
                the interface, see
                [MarkdownArea](../Client/Components.md#markdownarea)
                .

        ??? details "Related values"
            When a field refers to other records, there is much more to specify.
            In this case `valType` is a dictionary with the following information:

            ??? details "relTable"
                The table that contains the related records.

            ??? details "allowNew"
                Whether the user is allowed to enter new records in the related
                table.

            ??? details "popUpIfEmpty"
                (*optional: default:* `false`)

                If an edit view on a record
                having an empty value for this field is shown,
                a widget to choose a value will pop up immediately.
                Otherwise there will be just a control button,
                inviting you to enter a value.

                ??? example "Score"
                    See the field `score` in
                    [criteriaEntry.yaml]({{modelBase}}/tables/criteriaEntry.yaml)
                    .

            ??? details "select"
                A criterion on records in the related table.

                Only the records that satisfy the criterion specified in `select`,
                are allowed values.
                The criterion may be an arbitrary MongoDb selction constraint.

                ??? example "Country"
                    The `country` field in the
                    [contrib table]({{modelBase}}/tables/contrib.yaml)
                    has `isMember: true`.

                    So when we choose a country for a contribution,
                    we will be presented with a
                    choice between those countries that are a member of DARIAH.

                ??? example "Reviewer"
                    The `reviewerE` field in the
                    [assessment table]({{modelBase}}/tables/assessment.yaml)
                    points to the user table, but it has a `select` condition:

                    ```yaml
                    authority:
                    - $ne: legacy
                    ```

                    That means, only users for which
                    the `authority` field is not `legacy`
                    can be chosen as reviewer.

            ??? details "fixed"
                (*optional, default:* `false`)

                Whether the value of this field is
                fixed after it has been assigned initially.

                A fixed field can be assigned a value,
                and after that it is frozen.
                If a field is fixed,
                the user interface will be informed to not provide edit controls for it,
                and the server will be instructed not to modify this field.

                ??? example "assessmentType"
                    When an assessment record is created for a contribution,
                    its field `assessmentType`
                    is copied from the `typeContribution`
                    field of the master `contribution` record.
                    Based on that, a fixed set of `criteriaEntry` records are
                    assembled as details to the `assessment` record.

                    If the contribution type is changed in a later stage,
                    the `assessmentType` still shows the type on which the
                    assembly of `criteriaEntry` records is based.

                    If we would allow the `assessmentType` to be changed,
                    we have no way to see the type on which the criteria entries
                    are based, therefore, we require it to be
                    immutable after having received its initial value.

                    ??? details "Way out"
                        How to proceed out of such a situation?

                        The system should not delete or change the
                        criteria entry records,
                        because the user may have entered data in it.

                        If the contribution really needs an other type,
                        the best way to proceed is to create a new blank assessment,
                        copy the relevant information over from the old assessment,
                        and then remove the old assessment.

            ??? details "inactive"
                (*optional*)

                This field relates to *active*/*inactive* items, defined in
                [Workflow](../Functionality/Workflow.md)
                .

                Inactive items may have to be rendered in such a way that the user
                is alerted to the fact that these items are currently a form
                of legacy content.

                The `inactive` dictionary instructs what to do with inactive items:

                ??? details "disabled"
                    If true, do not present inactive items in choice widgets: so if
                    you modify the value, you cannot choose inactive values.

                ??? details "attributes"
                    e.g. a CSS *className* and a HTML *title* attribute (tooltip) that
                    will be put on the element that renders the item.
                    Any set of valid attributes
                    will do, there are no additional constraints.

                ??? example "typeContribution"
                    The `typeContribution` field of a
                    [contrib record]({{modelBase}}/tables/contrib.yaml)
                    may be obsolete,
                    because it is not specified in the current package (see
                    [Workflow](../Functionality/Workflow.md)
                    .

                    In
                    the `valType` for this field we see the following specification:

                    ```yaml
                    valType:
                      relTable: typeContribution
                      allowNew: false
                      inactive:
                        attributes:
                          className: inactive
                          title: this value does not belong to the current package
                        disabled: true
                    ```

                    This is the rendered HTML for this value:

                    ```html
                    <a
                        href="/data/typeContribution/list/item/00000000cca4bbd9fe00000b"
                        class="tag disabled inactive"
                    >Tools and Software</a>
                    ```
        ??? note "Listing related records"
            When we need to show a related record as a single value,
            we use its *title* field.

            ??? details "Missing title field?"
                The name of the title field is specified by
                the `title` entry in the table model,
                if present, otherwise we
                look it up from `generic` dictionary under `noTitle`.

            ??? caution "Custom code for titles"
                The client code may have implemented special code
                for certain tables, such as `user`, and `country`.
                
                This happens in this piece of code

                ```javascript
                const headSwitch = {
                  user: headUser,
                  country: headCountry,
                  typeContribution: headType,
                  score: headScore,
                  default: headRelated,
                }
                ```

                in
                [tables.js]({{appBase}}/dux/tables.js)
                .

            ??? note "Value lists"
                In many cases, the related table is a *value list*:
                every record consists of an `_id` field
                (the standard MongoDB identifier field)
                and a field called `rep`,
                which contains the representation of the value.

                Value lists may or may not specify custom table information. 
                The default table information in `generic` is such that
                the value lists are covered by it.

            ??? note "Permissions"
                In all cases, the permissions model is also consulted,
                because the permissions model has a say
                in which fields are allowed to reach the client.

                ??? example "Creator"
                    If a non-authenticated user is shown the creator of a record,
                    (s)he sees information from the `user` table.
                    But the permissions are such that (s)he
                    may not see the email address of that user.
                    So the email address does not even reach the client.

    ??? details "grid"
        Specifies how to lay out the table in a grid
        by means of CSS
        [flex]({{flexBox}})
        attributes:

        ??? details "width"
            The intended width of the column in which this field is presented;

        ??? details "grow"
            (*optional: default:* `0`)

            The degree by which the column width is allowed to increase.

        ??? details "shrink"
            (*optional: default:* `0`)

            The degree by which the column width is allowed to decrease.

        ??? example "Country"
            The list of countries is typically displayed in a grid.

            The
            [country model]({{modelBase}}/tables/country.yaml)
            lays out its columns as follows:

            ```yaml
            iso:
              grid:
                width: 2em
                grow: 0
            name:
              grid:
                width: 10em
                grow: 1
            isMember:
              grid:
                width: 4em
                grow: 0
            latitude:
              grid:
                width: 4em
                grow: 0.5
                shrink: 0
            longitude:
              grid:
                width: 4em
                grow: 0.5
                shrink: 0
            ```

    ??? details "valid"
        The name of a client-side validation function by which
        new and modified values for this field are validated.

        The validators are exposed in
        [fields.js]({{libBase}}/fields.js)
        as member functions of a `validation`
        object.

        ??? example "Country"
            The field `iso` in the
            [country table]({{modelBase}}/tables/country.yaml)
            is subjected to the `isoCountry()` validation function:

            ```yaml
            iso:
              valid: isoCountry
            ```

            This function can be found in
            [datatypes.js]({{libBase}}/datatypes.js)
            as a member of the (exported) `validation` object.

        ??? caution "Server validation"
            The server carries out extensive, non-customizable validation
            as well, in order to protect the integrity of the database.

    ??? abstract "details"
        Specification of detail records: where are they and how are they connected
        to their masters?

        ??? explanation "master-detail"
            A record may have *detail records* associated with it.
            We call such a record a *master record* with respect to its details.

            Details are records, usually in another table,
            having a field that points to their master record
            by means of an `_id` value.

        ??? explanation "multiple kinds of details"
            A master record may have multiple kinds of detail records,
            i.e. detail records from several distinct tables.
            It is also possible to specify multiple kinds from
            one and the same originating table.

            To each kind of detail, a name is given,
            often this name is the same as the name of table in which the details
            are found.

        ??? explanation "Detail display"
            When a master record is presented in full view, all of its fields are expanded
            with their values.
            Below that there are lists of head lines of detail records,
            sorted by their kind.

        ??? details "detailOrder"
            The order in which details are displayed below their master record
            is given in the key `detailOrder`.

        ??? details "details"
            A list of specifications for each kind of detail.
            
            These specifications consist of:

            ??? details "table"
                The name of the originating table.

            ??? details "linkField"
                The name of the field in the originating table that links to the
                master record.

            ??? details "mode"
                The display mode of the detal records:

                name | meaning
                --- | ---
                `list` | plain list of record head lines
                `grid` | table of full records in grid view

            ??? details "filtered"
                Whether the detais of this kind should have filter controls.
                If yes, the filters are taken from the specification
                of the originating table.

            ??? details "expand"
                (*optional, default:* `false`)

                If this is true,
                all detail records of this kind will be immediately expanded.
                Normally, detail records are presented as head lines initially.

            ??? details "border"
                (*optional, default:* `read: true, edit: true`)

                Whether to put a border around each individual detail record of this kind.
                This feature must be specified for the read-only presentation
                and the editable presentation separately,
                by means of the keys `read` and `edit`.

                ??? example "criteriaEntry"
                    The criteriaEntry details of an
                    [assessment record]({{modelBase}}/tables/assessment.yaml)
                    will be displayed without borders,
                    thereby strengthening the impression that they constitute
                    a single form.

                    ```yaml
                    details:
                      criteriaEntry:
                        table: criteriaEntry
                        linkField: assessment
                        expand: own
                        mode: list
                        border: {
                          read: false,
                          edit: false,
                        }
                        filtered: true
                        cascade: true
                        fixed: true
                    ```

            ??? details "cascade"
                (*optional, default:* `false`)

                When the master record is deleted,
                its details have a dangling reference to a non-existing master record.
                In some cases it is desirable to delete the detail records as well.

                If `cascade: true`,
                the detail records of this kind will be deleted together with
                the master record.

                ??? example "criteriaEntry"
                    In the 
                    [assessment model]({{modelBase}}/tables/assessment.yaml)
                    it is stated that criteriaEntry records are deleted with their
                    master record.

                    ```yaml
                    criteriaEntry:
                      table: criteriaEntry
                      linkField: assessment
                      cascade: true
                    ```

                ??? example "criteria"
                    In the 
                    [package model]({{modelBase}}/tables/package.yaml)
                    it is stated that criteria records are *not* deleted with their
                    master record.

                    ```yaml
                    details:
                      criteria:
                        table: criteria
                        linkField: package
                        mode: list
                        filtered: true
                    ```

            ??? details "fixed"
                (*optional, default:* `false`)

                Whether the list of details of this kind is fixed.

                Details of a kind are fixed, if, after having been created, no
                details may be added or removed.
                Individual details may still be modified.

                ??? example  "Assessments and criteria entries"
                    Once an `assessment` record for a contribution has been created,
                    a special
                    [workflow](../Functionality/Workflow.md)
                    takes care to lookup the list of criteria that
                    apply to this contribution, based on its `typeContribution` field.

                    ??? details "read from package"
                        This mapping is read from the `criteria` detail records
                        of the currently active `package` records).

                    For each criterion a `criteriaEntry` detail record is
                    added to the master `assessment` record.

                    After that, the list of `criteriaEntries`
                    for this `assessment` record may not change anymore.
                    But the user is still be able to fill out the `criteriaEntry` records.

                    This is accomplished by `fixed: true` in

                    ```yaml
                    criteriaEntry:
                      table: criteriaEntry
                      linkField: assessment
                      expand: own
                      mode: list
                      border: {
                        read: false,
                        edit: false,
                      }
                      filtered: true
                      cascade: true
                      fixed: true
                    ```

                    See the
                    [assessment model]({{modelBase}}/tables/assessment.yaml)
                    .

    ??? abstract "needMaster"
        *optional: default:* `false`.

        Some tables act as containers for detail records exclusively,
        and it makes no sense to create a detail record if there is no
        master record to point to.

        If that is the case, specify `needMaster: true`, otherwise, leave it out.

        ??? details "Presentation"
            If `needMaster: true`, there will be no plus button (insert item)
            when the records are displayed as a main list.
            Only when they are displayed as a list of
            details to some master record, the plus button will appear.

        ??? example "Assessment"
            Assessments can only be created as detail of a `contribution`.

            ```yaml
            needMaster: true
            ```

            See the
            [assessment model]({{modelBase}}/tables/assessment.yaml)
            .

        ??? example "Package"
            Packages can be seen as details of `typeContribution`,
            in the sense that for each contribution type,
            there is a list of packages to tell
            when that contribution type was valid and
            which criteria were associated with it.

            Yet a package record makes sense on its own.

            When you create it, you do not have to
            select a contribution type first.

            Rather, you create a package, and in its
            `typeContribution` field you select a number of contribution types.

??? abstract "filters"
    A list of filters by which to constrain the set of records to be displayed.
    There are *fulltext* filters and *faceted* filters.

    Each filter is a dictionary with the following information:

    ??? details "field"
        The name of the field to be filtered.

    ??? details "relField"
        (*optional*)

        If `field` has values that are identifiers
        pointing to a related tables,
        `relField` specifies which field in the related table should be
        filtered.

        ??? example "criteriaEntry"
        If you want to filter `criteriaEntry` records on their `score`,
        you are faced with the fact that scores live in a separate table.
        The `criteriaEntry` records contain just an `_id` into the table `score`.

        The actual score is contained in the field `score` of that table.
        Hence,
        if we want to filter on actual scores, we say

        ```yaml
        filters:
          - field: score
            relField: score
            label: score
            type: ByValue
            maxCols: 1
            expanded: true
        ```

        See the
        [criteriaEntry model]({{modelBase}}/tables/criteriaEntry.yaml)
        .

    ??? details "label"
        A user friendly name for the filter, usually the label of the field to
        be filtered.

    ??? details "type"
        The type of filter:

        filter type | widget
        --- | --
        `ByValue` | faceted browsing
        `EUMap` | faceted, plus a visualisation on the map of Europe
        `Fulltext` | full text search in the field values

    ??? details "maxCols"
        (*not needed for `Fulltext` filters*)

        Facets are displayed in a table with at most this amount of columns.

    ??? details "expanded"
        (*not needed for `Fulltext` filters*)

        Whether the table of facets is initially expanded or collapsed.

## Permission model

The authorization system is built on the basis of *groups* and *permission* levels.

*Users* are assigned to groups, and *things* require
permission levels.

When a user wants to act upon a thing,
his/her group will be compared to the permission level of the thing,
and based on the outcome of the comparison, the action will be allowed or
forbidden.

The configuration of the permissions system as a whole is in
[model]({{modelBase}}/model.yaml)
,
under the key `permissions`,
and the table-specific permissions are under the `perm` keys
of the
[table model files]({{modelBase}}/tables)
.

??? abstract "Groups (informally)"
    Groups are attributes of users, as an indication of the power they have.

    Informally, we need to distinguish between:
    
    ??? details "Nobody"
        A group without users, and if there were users, they could not
        do anything.

        Useful in cases where you want to state that something is not
        permitted to anybody.

    ??? details "The public"
        Unidentified an unauthenticated users.

        They can only list/read public information
        and have no right to edit anything
        and can do no actions that change anything in the database.
    
    ??? details "Authenticated users"
        DARIAH users authenticated by the DARIAH Identity provider.

        This is the default group for logged-in users.

        They can see DARIAH internal information (within limits)
        an can add items and then modify/delete them, within limits.

    ??? details "National coordinators"
        DARIAH users that coordinate the DARIAH outputs
        for an enntire member country.

        They can (de)select contributions and see their cost fields
        but only for contributions in the countries they coordinate.

    ??? details "Backoffice employees"
        Users that work for the DARIAH ERIC office.

        They can modify records created by others (within limits),
        but cannot perform technical actions that affect the system.

    ??? details "System managers"
        Users that control the system,
        not only through the interface of the app,
        but also with low-level access to the database and the
        machine that serves the app.

        Can modify system-technical records, within limits.
    
    ??? details "root"
        One user that can bootstrap the system.

        Complete rights.
        Still there are untouchable things,
        that would compromise the integrity of the system.
        Even root cannot modify those from within the system.

        Root is the owner of the system, and can assign people to the roles
        of system managers and backoffice employees.

        From there on, these latter groups can do everything that is needed 
        for the day-to-day operation of the functions
        that the system is designed to fulfill.

    ??? caution "Pseudo groups"
        In some cases, the identity of the user is relevant, namely when
        users have a special relationship to the records they want to modify,
        such as *ownership*, *editorship*, etc.
        When those relationships apply, users are put in a
        pseudo group such *own* or *edit*.

        In yet other cases, when users change the permission levels of users,
        the permission levels of both users need to be taken into account.

??? abstract "Assigning users to groups"
    Once users are in a group, their permissions are known.
    But there are also permissions to regulate who may assign groups to users.
    These permissions derive from the groups as well,
    with a few additional rules:

    *   nobody can assign anybody to the group `nobody`;
    *   a person can only add people to groups that have at most his/her own power;
    *   a person can only assign groups to people that have less power than
        him/herself.

    ??? example
        *   If you are `office`, you cannot promote yourself or anyone else
            to `system` or `root`.
        *   If you are `office`, you cannot demote another member
            of `office` to the group `auth`.
        *   You cannot demote/promote your peers, or the ones above you.
        *   You can demote yourself, but not promote yourself.
        *   You can demote people below you.
        *   You can promote people below you, but only up to your own level.

??? abstract "Groups (formally)"
    ??? abstract "Authenticated versus unauthenticated users"
        The keys `auth` and `unauth` point to the names
        the groups to which authenticated and unauthenticated
        users are assigned by default (respectively).

    Under the key `groups` the groups and pseudo groups are given,
    with a short description. 

    group | is pseudo | description
    --- | --- | ---
    public | no | user, not logged in
    auth | no | authenticated user
    our | yes | authenticated user and mentioned in a specific field of records in question
    edit | yes | authenticated user and editor of records in question
    own | yes | authenticated user and creator of records in question
    coord | no | national coordinator
    office | no | back office user
    system | no | system administrator
    root | no | full control
    nobody | no | deliberately empty: no user is member of this group

    ??? details "our"
        the user is mentioned in specific fields of the record.
        Which fields?
        See the `ourFields` key in the yaml file for that table.

        ??? example "assessments"
            [assessment.yaml]({{modelBase}}/tables/assessment.yaml)

??? abstract "Levels"
    *Levels* are attributes of things: methods, tables, records, fields,
    as an indication of the power needed to act upon them.

    Under the key `levels` the *levels* are given,
    in the order: more powerful before less powerful.

    *   public
    *   auth
    *   our
    *   OUR
    *   edit
    *   EDIT
    *   own 
    *   OWN
    *   coord
    *   office
    *   system
    *   root
    *   nobody

    ??? note "Capitalized pseudo groups"
        The levels correspond largely to the groups, but there are a few
        capitalized variants of the pseudo groups.

        They come into play when users with higher powers want to access items.

        For example, a backoffice user is entitled to edit items which require
        level `own` for that, even if they are other people's items.
        This is because the power of a backoffice user exceeds the level `own`.

        But if you want to display a button `my items`, which lists
        the items `own`ed by the current user.
        The obvious thing to do, is to assign a permission level `own` to the action
        `list`.

        That works fine for normal, authenticated users.
        But a backoffice user will see *all* items nevertheless.

        This is where `OWN` comes in. The capitalized form
        states that the `own`ership condition outweighs the `office` potential.

        Thus, if the `list` action reuqires `OWN` permission, only records
        whose owner is the current user are listed.

        The same logic applies to `OUR` and `EDIT`.

    ??? note "`ownLT`"
        This is a very special pseudo-level.
        It requires that the user acting on the item is either the owner or
        is more powerful than the owner of the record.

        This is onnly applicable to the `group` field in the `user` table.

        In this way it is enforced that lower power users can not affect
        what higher power users can do.

??? abstract "Actions"
    Methods give rise to *actions*, listed in under the key `actions`:

    action | description
    --- | ---
    insert | create item
    list | read item title
    read | read item
    set | give item initial value
    update | update item
    delete | delete item

    ??? note "`read` versus `list`"
        An item may allow `list` to *public* but not `read`.
        In that case, unauthenticated users may see the list of items,
        usually their titles,
        but they cannot drill down to see the full details of records.

    ??? note "`set` versus `update`"
        The `set` action changes a value from `null`, `None`, or `undefined`
        to a defined value. It cannot change a defined value into another value.
        So `set` is a limited `update` action.
        `update` can change any value, including an undefined value, into
        any other value, including an undefined value.

??? abstract "Things"
    These are the things that may require permission levels:

    ??? details "Methods"
        If a user needs to do something, (s)he interacts with the user interface at the
        client. That will lead to an API call to the server, which will translate into
        the invocation of a *method*. At that point, the first check will be made: is
        this user allowed to invoke this method? The check is performed on the basis of
        the `methods` table, which is a dictionary of method names. For each method name a
        description is given, and the level required to invoke that method.

        method | level | description
        --- | --- | ---
        mylist | EDIT | list my items
        ourlist | OUR | list our items
        list | public | list all items
        view | public | details of an item
        mod | edit | modify (insert/update/delete) an item
        resetwf | system | reset the workflow information

    ??? details "Tables and fields"
        For every table and every field in it, we specify access levels.
        That means:
        for every *action* on that field we state the required access level.

        ??? explanation "Authorization logic"
            1.  the access level for invoking the method is checked;
            2.  if allowed, the actions that the method is going to perform on which
                tables are considered;
            3.  for every (table-action) combination a row filter and a field filter is
                constructed, restricting the action to only those rows and fields that are
                permitted to the user; this might be an empty set;
            4.  if the set is not empty, the action is executed on those rows and those
                fields that pass the filters.

        ??? explanation "Row and field filters"
            The `perm` key in the model file of a particular table
            states the permission level for actions on that table as a whole.
            This will be checked first.

            From this a row filter is computed, selecting those rows
            that may undergo the action.

            Then there is also a `perm` section in the field specification
            for each field in the table.

            From this a field filter is co,puted, selecting those fields
            that may undergo the action.

??? abstract "Authorization"
    Actions may proceed if the user shows a *group* that matches somehow
    the *level* required by the action and the things affected.

    The *matches somehow* is specified by a table whose first key
    is the group, whose second key is the level, and whose value is a number.

    If the number is `0`, or if the combination of group and level is missing,
    the action is not allowed.

    If the number is positive, it is always `1`, and the action is allowed.
    
    If the number is negative, the action maybe allowed, depending on subsequent
    conditions, indicated by the value of the nagative number.

    ??? details "Subsequent conditions"
        value | condition
        --- | ---
        `-1` | only if the user is owner of the record
        `-2` | only if the user is editor of the record
        `-3` | only if the user is mentioned in some specific fields of the record
        `-4` | only if the user is from the same country as the country field in the record

    ??? details "Authorization table"
        The mapping is under the key `authorize`.

        group | level | authorization
        --- | --- | ---
        public | public | 1
        auth | public | 1
        auth | auth | 1
        auth | coord | 0
        auth | our | -3
        auth | OUR | -3
        auth | edit | -2
        auth | EDIT | -2
        auth | own | -1
        auth | OWN | -1
        auth | ownLT | -1
        coord | public | 1
        coord | auth | 1
        coord | coord | -4
        coord | our | -3
        coord | OUR | -3
        coord | edit | -2
        coord | EDIT | -2
        coord | own | -1
        coord | OWN | -1
        coord | ownLT | -1
        office | public | 1
        office | auth | 1
        office | coord | 1
        office | our | 1
        office | OUR | -3
        office | edit | 1
        office | EDIT | -2
        office | own | 1
        office | OWN | -1
        office | ownLT | 1
        office | office | 1
        system | public | 1
        system | auth | 1
        system | coord | 1
        system | our | 1
        system | OUR | -3
        system | edit | 1
        system | EDIT | -2
        system | own | 1
        system | OWN | -1
        system | ownLT | 1
        system | office | 1
        system | system | 1
        root | public | 1
        root | auth | 1
        root | coord | 1
        root | our | 1
        root | OUR | -3
        root | edit | 1
        root | EDIT | -2
        root | own | 1
        root | OWN | -1
        root | ownLT | 1
        root | office | 1
        root | system | 1

    ??? note "`nobody`"
        Note that users in group `nobody` have no rights.
        There should be no users in that group, but if by
        misconfiguration there is a user in that group,
        (s)he can do nothing.

    ??? caution "`root`"
        A consequence of the promotion/demotion rules is
        that if there is no user in the group `root`, nobody can be made
        `root` from within the system.

        When importing data into the system by means of
        [load.sh]({{staticBase}}/tools/load.sh)
        you can specify to make a specific
        user `root`. Which user that is, is specified in
        [config.yaml]({{staticBase}}/tools/config.yaml)
        ,
        see `rootUser`.

        Once the root user is in place, (s)he can assign system admins and back office
        people. Once those are in place, the daily governance of the system can take
        place.

## Name handling

??? details "The problem"
    There are a lot of names in these yaml files. The most obvious way to use them
    in our programs (Python on the server, JavaScript on the client) is by just
    mentioning them as strings, e.g.:

    ```python
    title = DM['tables']['permissionGroup']['title']
    ```

    and

    ```javascript
    title = DM.tables.permissionGroup.title
    ```

    or

    ```javascript
    const { tables: { permissionGroup: { title } } } = DM
    ```

    But then the question arises: how can we use these names in our programs in such
    a way that we are protected agains typos?

??? details "Partial solution"
    We tackle this problem in the server code, but not in the client code.

    ??? abstract "Python"
        Well, we convert the `.yaml` model files to Python modules that expose the same
        model, but now as Python data structure. This is done by means of the
        [compile.py]({{serverBase}}/compile.py)
        script, just before starting the
        server. That enables us to collect the names and generate some code. Every part
        of the `.yaml` files that may act as a name, is collected. We generate a module
        [names.py]({{modelBase}}/compiled/names.py)
        that defined an object `N` that contains a member

        *name* `= '`*name*`'`

        for each *name*.

        This module of names will be imported whenever the models are imported. So
        whenever we want to refer to a name in one of the models, we have a Python
        variable in our name space that is equal to that name prepended with `N.`. By
        consequently using `N.`*names* instead of plain strings, we guard ourselves
        against typos, because the Python parser will complain about undefined
        variables.

        Moreover, the same
        [compile.py]({{serverBase}}/compile.py)
        module also
        checks all the code in the controllers directory for names:

        *   whether every `N.`*name* is defined in the `names.py` and
        *   if there are occurrences of plain strings for which an `N.`*name* is defined.

        This solves the case for the Python server code.

    ??? abstract "Javascript"
        For the client JavaScript code we do not have such measures. We could do the
        same approach, but that would severely uglify the code:

        ```javascript
        title = DM[N.tables][N.permissionGroup][N.title]
        ```

        or

        ```javascript
        const { [N.tables]: { [N.permissionGroup]: { [N.title]: title } } } = DM
        ```

        Especially the replacement of

        ```javascript
        {
          name
        }
        ```

        by

        ```javascript
        { [N.name]: name }
        ```

        really hurts. So we do not do anything here, and rely on debugging away the
        typos the hard way.

