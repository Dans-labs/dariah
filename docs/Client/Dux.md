# Dux (Appliances)

Dux (ducts) are appliances within the app, i.e. sets of components that all work
with the same slice of the state A dux is a connector between a slice of the
state and the components that work with that slice. As such, it is a piece of
plumbing, hidden behind the walls and under the floors.

??? abstract "Organization"
    A *dux* is organized as one file that contains its
    *actions*, *reducer*, *selectors* and *helpers*;

    ??? abstract "reducer"
        Programmed as an object of *flows*.
        For each *action*,
        there is a flow with the same name,
        which is a function that produces a new state on the
        basis of that action.

??? abstract "Associated components"
    A *dux* is associated 
    a number of React components that make use of it by importing
    its *actions*, *selectors*, and/or *helpers*.


??? caution "Many-many relationship between dux and components"
    However, life is complicated, and the interplay between dux and components is no
    exception. Sometimes actions will be fired that affect more than one slice of
    the state.

    ??? example "filters, alter"
        For example, in order to set up filters for a table, both the `tables` slice and
        the `filters` slice are needed.

        And when the user expands a table row into a
        record form, the `alter` state is changed to cater for the expand action, and
        the `tables` slice is changed by receiving additional data for that record.

    In Redux, the slices of the state are not sealed off from each other. In the
    end, there is one and only one reducer, that examines every dispatched action
    for its `type` property, and hands it over to a sub-reducer that has
    "subscribed" to handle actions for that type. It is perfectly possible that
    multiple sub-reducers will deal with a single action.

    ??? example "detail records"
        A good example is when a record is displayed with multiple detail records,
        displayed as a list of titles. There is a button "Open All" on the interface.
        When it is pressed, data for all detail records is fetched, and the titles
        expand into full record views for those details.

        The way it is implemented, is that pressing "Open All" leads to the dispatch of
        an action with type `fetchItems`, and with payload the list of ids of the
        entities that must be fetched.

        To this action, the `tables` sub-reducer reacts by fetching the corresponding
        entity data from the server, and the `alter` sub-reducer reacts by expanding the
        corresponding entity titles into full records.

    Whenever you are tempted to write complicated, time-sensitive logic to
    orchestrate what happens at multiple slices of the state, all that is needed is
    in fact just an extra response of an other sub-reducer.

## [alter]({{appBase}}/dux/alter.js)

???+ explanation
    A mechanism for switching between alternative representations of a component,
    such as: expanded / collapsed, editable / read-only. It is a bit more general
    than that: you can supply *n* alternatives and *n* controls, and let the user
    cycle through the alternatives by clicking the controls.

    Components that work with alternatives must collect them in a group. The name of
    that group is passed as a prop called `alterSection`. Component that are passed
    this prop, have access to the state of the alternatives in this group. To get
    the state information for a single alternative, another key must be supplied,
    usually called `alterTag`.

    The component that displays the alternatives need not be the same component that
    presents the controls to switch alternatives.

??? abstract "actions"
    All/ actions below work relative an `alterSection` and `alterTag`.

    ??? explanation "nextAlt"
        Switch to the next alternative. This action must specify the total number of
        alternatives and an optional initial value. If there is not yet a state for this
        instantiation, the initial value will be used to start from.

    ??? explanation "setAlt"
        Switch to specified alternative.

    ??? explanation "setItems"
        This function is used to switch a bunch of records from an open to a closed
        state or vice versa.

??? abstract "reducer"
    Increases the index of the alternative by one, cyclically, and puts it under the
    right keys in the state..

??? abstract "selectors"
    ??? explanation "getAltSection"
        Delivers the numbers of the current alternatives as far as they are registered
        under the `alterSection` key in the `alter` slice of the state.

??? abstract "helpers"
    ??? explanation "compileAlternatives"
        A component that wants to work with the alternatives, of a group of components,
        must call `compileAlternatives()` with the right parameters.

        Think of a List component that wants to provide child items with a control to
        expand themselves. It is more efficient that the List connects to the `alter`
        state, than that each item connects to that state individually.

        This function is a factory function that, given an `alterTag`, delivers an
        object with functions for getting and setting the alternatives of that
        particular instance.

??? caution "all alternatives together"
    It is tempting to make one `alterSection` for all components in the app that need
    alternatives. The flip side of doing so is that all those components will be
    triggered for re-render whenever any single one of them switches alternatives.
    That is why we offer the possibility of grouping related components under the same
    `alterSection` and be shielded from updates in the components that belong to
    other `alterSections`.

## [docs]({{appBase}}/dux/docs.js)

???+ explanation
    Manages Markdown documents. Fetches raw source from the server and stores it
    into the state, under a key, which is the path information of the document. The
    [DocMd](Components.md#docmd)
    provides a widget for such documents.

??? abstract "actions"
    ??? explanation "fetchDoc"
        Fetches a document from the server asynchronously.

??? abstract "reducer"
    Stores the fetched raw document source into the state.

??? abstract "selectors"
    ??? explanation "getDoc"
        Retrieves the stored data for the specified document.

??? abstract "helpers"
    ??? explanation "needDoc"
        Check whether a component contains the data for its document.

    ??? explanation "changedDoc"
        Check whether a component has new props in such a way that a new document should
        be fetched.

## [filters]({{appBase}}/dux/filters.js)

???+ explanation
    Supports the display of filtered lists, where there is a bunch of filters and a
    list with items filtered by those.

    ![diag](../design/design.002.png)

    Lists and filters form a complex system of components, involving

    *   fetching list data from the server,
    *   fetching filter specifications
    *   fetching the metadata that is used by the filtering
    *   handling the user interactions with the filters
    *   supporting special effects such as a map of European countries with markers
        having a radius indicative of the number of filtered items by that country.

    ??? note "multiple slices"
        This dux not only needs data from the `filters` slice, but also from the
        `tables` slice!

??? abstract "actions"
    ??? explanation "changeFulltext"
        Responds to a change in the search text in a
        [Fulltext](Components.md#fulltext)
        search widget.

    ??? explanation "changeFacet"
        Responds to a click in the checkbox of a facet
        [Facet](Components.md#facet)
        .

    ??? explanation "changeFacetAll"
        Responds to a click to (de)select all facets of a field.

    ??? explanation "initFiltering"
        Initializes filtering for a table. This action also looks at the tables slice of
        the state, which is managed by
        [tables](#tables)
        .

        The actual work is done by a
        memoized helper function
        `compileFieldIds()`
        below.

        On the basis of this, initial settings of facet filters can be made.
        This is done by the helper function
        `initFilterSettings()` below
        and these settings are to be
        added to the `filters` slice of the state under the key `table` and then under a
        key `filterTag`. In this way you can set up various kinds of filtering for the
        same table.

??? abstract "reducer"
    Transforms the state in response to dispatched actions, notably the `filters`
    slice and within that a sliced keyed by `table`.

??? abstract "selectors"
    ??? abstract
        Filter information is being translated from the state to props that can be
        consumed by components.

    ??? explanation "getFilters"
        Reads the current settings of a filter and injects it as `filters` into the
        props of the receiving components, which are typically the filter widgets that
        receive user interaction:
        [Fulltext](Components.md#fulltext)
        [Facet](Components.md#facet)
        ,
        and also
        [CheckboxI](Components.md#checkboxi)
        ,
        [EUMap](Components.md#eumap)
        .

??? abstract "helpers"
    ??? explanation "compileValues"
        For every field that is chosen for faceted browsing, the list of values will be
        compiled.

        The result is used by
        [ByValue](Components.md#byvalue)
        .
        This component is
        responsible for all the facets of a field.

        ??? note "memoization"
            It is useful to store the results of this compilation, but where?
            We do not store it in the state, because it is derived data,
            and we adhere to the principle that the state is a
            [normalized single source of truth]({{redux}}/docs/recipes/reducers/NormalizingStateShape.html)
            .
            Selectors are invoked upon each rendering, but in this case we do not want to
            redo the compilation all the time. The solution is to use a
            [memoized function]({{redux}}/docs/recipes/ComputingDerivedData.html)
            .
            I
            have created my own
            [memoizer](Lib.md#memo)
            .

    ??? explanation "computeFiltering"
        Applies the filters, according to the current filter settings. Applying means:
        determine the subset of filtered items (`filteredData`), and provide statistics
        for the facets.

        Every faceted field displays as total the amount of items filtered by all
        *other* filters (`filteredAmountOthers`). For each of its facets, it displays
        how many items of this relative total correspond to that facet (`amounts`).

        So this function delivers exactly that: `filteredData`, `filteredAmountOthers`,
        `amounts`.

        It is also a costly function, but it does need to be invoked upon each rendering
        caused by a click or a key press.

    ??? explanation "makeTag"
        Makes a `filterTag`, depending on the situation of the List of items that needs
        the filtering. The most fundamental issue is: is the list showing all items in
        the table, or my items only, or is it a list of detail records of some master
        record in an other table?

    ??? explanation "testAllChecks"
        Looks if all facets are checked, or all unchecked, of none of both. Used to
        steer the *collective* checkbox that governs all facets.

## [forms]({{appBase}}/dux/forms.js)

???+ explanation
    The `forms` slice of the state is under control of the
    [Redux-Form]({{reduxFormBase}})
    module. It contains all current form data
    of components where the user is interacting with forms.

    Some other components might want to know whether a component is engaged in data
    entry or not, without fully connecting to all form state properties of
    redux-form.

    This dux gives that information and that information only.

??? abstract "reducer"
    No reducer, because
    [Redux-Form]({{reduxFormBase}})
    has its own reducer and we include it in our overall reducer.

??? abstract "selectors"
    ??? explanation "getForms"
        Returns the set of keys of the `forms` slice of the state. It calls a memoized
        function to turn the keys into a set. So, if the set of keys is asked repeatedly
        without having been changed, exactly the same set object is being returned.

## [grid]({{appBase}}/dux/grid.js)

???+ explanation
    This dux support grid views of tables, by managing sorting information of the
    grid columns. Every grid table must identify itself with a `gridTag` and its
    data resides on the `grid` slice of the state under that tag.

??? abstract "actions"
    ??? explanation "resetSort"
        Removes all sorting information under a `gridTag`.

    ??? explanation "addColumn"
        Adds a sorting column. Grids can be sorted by multiple columns.

    ??? explanation "delColumn"
        Deletes a sorting column.

    ??? explanation "turnColumn"
        Toggles the sort method between ascending and descending for a specified column.

??? abstract "reducer"
    Applies the state changes, defined by the actions, to the `grid` slice, under
    the key `gridTag`.

??? abstract "selectors"
    ??? explanation "getGrid"
        Returns the `grid` slice of the state.

??? abstract "helpers"
    ??? explanation "compileSortedData"
        This function actually applies a given sort order to a list of ids of items from
        a table.

## [me]({{appBase}}/dux/me.js)

???+ explanation
    Powers the login widget, top right on the screen, realized by the component
    [Login](Components.md#login)
    .

    The login procedure caters for shibboleth logins. Upon successful login, the
    server sends information about the currently logged in user to the client.

    The main task of Login is to fetch the current authentication status: is there
    an authenticated user, and if so, what is his/her name?

    ??? note "How the client knows the user name"
        Because of the federated login, the username and password are not
        entered in any form in this app. So the client does not know who the user is,
        except by asking the server. The current user can be retrieved by
        `/api/db/who/ami`.

??? abstract "actions"
    ??? explanation "fetchMe"
        Fetches data about *me*, the logged in user. It is actually handled by the
        helper
        [server](Lib.md#server)
        .

??? abstract "reducer"
    Transforms the state in response to dispatched ticket, notably the `me` slice.
    It just contains the known attributes of a single user, the one that is logged
    in.

??? abstract "selectors"
    ??? explanation "getMe"
        Plainly hand over the attributes of the currently logged in user. At the moment
        only the
        [Login](Components.md#login)
        component is interested in it.

## [notes]({{appBase}}/dux/notes.js)

???+ explanation
    Powers the notification widget, top right on the screen, realized by the
    component
    [Notification](Components.md#notification)
    .

    A notification has a *kind* and a *text*. The kind is one of `error`, `warning`,
    `special`, `info`. All non-info messages are considered important.

    Normally, the notification panel is hidden, but it can be called up by clicking
    on the progress circle in the top-right of the screen. The panel also shows up
    if there is a new important message, and it will scroll to the last important
    one.

    The user can click away the panel and hide the messages.

    ![diag](../design/design.005.png)

??? abstract "actions"
    ??? explanation "notify"
        Issues its payload, which consists of an array of messages, as notifications.

    ??? explanation "clear"
        Clears the existing list of notifications.

    ??? explanation "display"
        Turns the visibility of notification panel on or off.

        Other components can issue notifications easily, either by importing these
        actions, or by dispatching the right actions themselves. The helper function
        [accessData](Lib#.mdserver)
        can issue notifications. These notifications are given
        the type `async` and convey a status `pending`, `success`, or `error`.

??? abstract "reducer"
    Transforms the state in response to dispatched ticket, notably the `notes`
    slice. The state maintains a counter `busy`, which is the number of currently
    asynchronously pending operations. A notification widget can show a progress
    spinner if `busy > 0`.

??? abstract "selectors"
    ??? explanation "getNotes"
        The notification widget gets the notifications from the state, including `busy`
        and `show`, the latter indicating whether the notification panel should be
        hidden or not. For the convenience of the
        [Notification](Components.md#notification)
        component, the index of the last
        important notification message is also computed, and its kind.

## [roots]({{appBase}}/dux/roots.js)

???+ explanation
    Top level management of the state: initialization and combination of all the
    other dux.

??? abstract "actions"
    ??? explanation "configureStore"
        `Root` does not have proper actions of its own. But it does set up the store,
        and passes it on to the
        [main](Components.md#main)
        component.

??? abstract "reducer"
    Combines all slices of the state and combines all reducers that work their own
    slice of the state into the *root reducer*, that operates on the whole state.

## [select]({{appBase}}/dux/select.js)

???+ explanation
    Manages the UI-state of the
    [RelSelect](Components.md#relselect)
    component. Every
    *RelSelect* instance must be identified by a tag, so that the states of the
    select controls do not get confused. The most obvious choice for a tag value is
    a composition of the table name, the entity id, and the field name.

??? abstract "actions"
    ??? explanation "setSearch"
        When a user types something in the search input field associated with the select
        control, the search string is sent to the state.

    ??? explanation "setPopUp"
        Parts of the interface of the select widget will pop up after a user action, or
        disappear after an other user action. This action sets the *popped up state*
        categorically to *true* or *false*, depending on a parameter.

    ??? explanation "togglePopUp"
        Toggles the popped up state of the relevant part of the widget.

??? abstract "reducer"
    Straightforward merge of the payload of pop up actions and search string updates
    into the state.

??? abstract "selectors"
    ??? explanation "getSelect"
        Retrieves all state information of a *specific* select control, i.e. an instance
        identified by a tag.

??? abstract "helpers"
    ??? explanation "compileOptions"
        Initializes the state for a specific select control. This is an initialization
        *per tag*.

## [server]({{appBase}}/dux/server.js)

???+ explanation
    Here all interaction with the server is managed. All activity that involves
    waiting for a server, will eventually reach out to actions here. The actions
    below only are concerned with requesting a server response, waiting for it, and
    reporting success or failure.

    Before a request is made, it is checked whether that request has been submitted
    before and is still pending. In that case, the *request counter* will be
    increased, and no new request will be made.

    *   request counters that are non-zero correspond to requests that are either
        pending, or have ended in failure;
    *   pending requests have positive request counters, the number represents the
        number of requests the app has tried to make so far (only 1 request will be
        issued effectively);
    *   successful request have their request counter set to 0 again.

??? abstract "actions"
    ??? explanation "accessData"
        Asynchronous action to fetch data from the server, and also to send data to it.

        A `task` object specifies what to fetch, and can contain data to send to the
        server.

        It can be used for database queries or file content. During the stages of a
        request,
        [notify](Dux.md#notes)
        actions will be dispatched.

    ??? explanation "progress"
        This action represents the situation that a request is offered multiple times
        before the first one has been completed. The request will not be made, but the
        request counter will be increased.

    ??? explanation "ask"
        Just before a request is made, this action sets the request counter to 1.

    ??? explanation "err"
        When a request returns failure, the request counter is set to -1.

    ??? explanation "succeed"
        When a request returns success, the request counter is set to 0.

??? abstract "reducer"
    Manages the request counter and puts it under a key under the `server` slice of
    the state. The key is identical to the `path` of the request (the URL that is
    fired to the server).

??? note "triggering of `notes` reducer"
    All actions except `accessData` are also picked up by the
    [notes](#notes)
    reducer, where they result in notifications.

## [settings]({{appBase}}/dux/settings.js)

???+ explanation
    Cross cutting settings for the app are defined here. The `settings` slice of the
    state is just a store of keys and values.

??? abstract "actions"
    ??? explanation "set"
        Adds a key value pair.

??? abstract "reducer"
    Straightforward reducer.

??? abstract "selectors"
    ??? explanation "getSettings"
        Returns the `settings` slice of the state.

## [tables]({{appBase}}/dux/tables.js)

???+ explanation
    Manages database data from the server. It keeps a normalized copy of the data.
    When different components fetch the bits and pieces they need, it all lands
    here, properly organized. This reduces the amount of fetching that is needed,
    and it improves consistency, because all data consuming components look at the
    same data.

    Principal data consuming components are
    [ListContainer](Components.md#listcontainer)
    and
    [Items](Components.md#itemmy)
    .


    ??? note "filters"
        In order to do the job properly, a fair amount of metadata about tables and
        fields is also fetched and stored. In particular, tables specify which filters
        can be used on which fields. This filter setup is not hard-wired into the client
        app, but comes from the server, where it is configured in the
        [data model](../Concepts/Model.md)
        .

??? abstract "actions"
    ??? explanation "fetchTable"
        Fetches a complete table, but only the title fields and the fields needed for
        filtering.

    ??? explanation "fetchTables"
        Fetches a list of tables by successively calling `fetchTable`.

    ??? explanation "fetchItem"
        Fetches a single rows from a table, all fields. The server decides which fields
        I am allowed to retrieve.

        If fields refer to other tables for their values, the above actions will fetch
        these tables as well.

    ??? explanation "fetchItems"
        Fetches a selection of rows from a table, all fields. The selection is given by
        a list of `_id`s to fetch. The server decides which fields may be retrieved.

    ??? explanation "modItem"
        Sends a request to update an item to the server, and merges the answer (the
        updated values) into the state.

    ??? explanation "insertItem"
        Sends a request to insert an item to the server, and merges the answer (the
        inserted item) into the state.

    ??? explanation "delItem"
        Sends a request to delete an item to the server, and updates the state to
        reflect the deletion of that item.

??? abstract "reducer"
    The actions above potentially receive overlapping data. The reducer takes care
    that all gets sorted out, and that every bit ends up in its proper place.

    ???+ abstract "entities"
        A table is stored under its name as key. The table information is an object of
        entities (rows), keyed by their database id.
        For each id there is an object containing the field values, an object that
        contains the workflow information, and an object that contains the permissions
        for that record.

        The entities themselves have a `values` object, with all the field values, keyed
        by field name. Next to the values there is an attribute `complete` that tells
        whether all fields for this entity have been fetched, or only the core fields.

    ??? abstract "order"
        Array of ids that specifies the order.

    ??? abstract "my"
        If only *my* rows are
        being retrieved, this array contains the
        ids of the retrieved entities in the right order.

    ??? abstract "fields"
        The fields of a table.

    ??? abstract "fieldOrder"
        The display order of the fields.

    ??? abstract "fieldSpecs"
        The specifications of a field: data type, multiplicity, related table,
        permissions (table wide).

    ??? abstract "details"
        An array of objects that describe the tables where the detail records of the main
        records are.

    ??? abstract "detailOrder"
        The display order of the lists of detail records.

    ??? abstract "complete"
        Whether the table has been retireved complete, or only the titles of the records.

    ??? abstract "filterList"
        An array of filters that are in force.

    ??? abstract "valueLists"
        An array of lists of values that this table refers to.

    ??? example "my items"
        As an example, consider the scenario that first the complete list of items is
        fetched, then the `my` items. The question is: after fetching the `my` items,
        will the full table that has been fetched before, be disturbed? The answer is of
        course no. Because the reducer merges the `my` entities with the existing
        entities. So the non-`my` entities are untouched. But what about `order`? Well,
        when reducing a `my-fetch` action, there is no incoming `order` array but a `my`
        array instead, and the `order` that already exists on the state is not touched.

    ??? example "single item and then full list"
        As a second example, consider the scenario where a single item is fetched first,
        with all its fields, and then the full list of items, but with only title
        fields. The question is: will the previously fetched item loose its extra
        fields? The answer is of course no. Because the reducer merges the new entities'
        values with existing entities' values.

    ??? note "the art of merging"
        Of all dux, this is the best example of what proper *reducing* is and what it
        achieves. It might look hard to take care of this merging, under the constraint
        that only those branches of the state should be touched that are actually
        updated.

        But the
        [lodash mergeWith]({{lodash}}/#mergewith)
        makes this a breeze.

        Unfortunately, this library does not always leave unchanged values untouched,
        which results in unnecessary re-renderings of components.

        The best solution turned out to be
        [Immutability-Helper]({{immutability}})
        .

        If you want to dive deeper into this issue, see the
        [tests about merging](../Maintenance/Tests.md#merge)
        ,
        which includes tests that makes this issue
        crystal clear.

        The methods of the Immutability-Helper have a syntax inspired by the MongoDB
        commands, which is a nice reduction of cognitive load, since we use MongoDB at
        the server side.

        Have a look again at the
        [reducer source code]({{appBase}}/dux/tables.js)
        and see how straightforward it is to code one of the most tricky reducers in
        this app.

        This reducer actively covered by
        [tests](../Maintenance/Tests.md#tablesreducer)
        .
        Have a look at
        them to get more feeling of how table actions cause state transitions.

??? abstract "selectors"
    ??? explanation "getTables"
        Return the whole `tables` slice of the state.

??? abstract "helpers"
    ??? explanation "entityHead"
        Computes the title for an item, based on the
        [data model](../Concepts/Model.md)
        or on
        specialized functions, defined here. See also
        [repr](#repr)
        .

    ??? explanation "needTable"
        Checks if sufficient `table` data is available in the state.

    ??? explanation "needTables"
        Checks a list of table names to see if sufficient data is available in the
        state.

    ??? explanation "needValues"
        Checks a single entity in a single table to see if it contains values for all
        fields.

    ??? explanation "listValues"
        Gives the list of all values of a specified field in a table.

    ??? explanation "presentUser"
        Presents a user, by means of name, email address, and/or `eppn`, depending on
        what information is available, which also depends on what information may be
        shared with the currently logged in user.

    ??? explanation "changedItem"
        Checks if properties have changed in such a few that new data should be fetched.

    ??? explanation "headEntity"
        The head line of a record, based on its title field and/or other data. For some
        specific tables custom logic is used.

    ??? explanation "repr"
        Makes a streamlined string representation out of a field value. It looks up ids
        in related value list tables. For some tables, special representation functions
        will be invoked. (users, countries, etc.).

    ??? explanation "toDb"
        Dispatches an item modification action to the store.

    ??? explanation "handleOpenAll"
        When a user clicks on an *Open All* button, this function is invoked to fetch
        the corresponding records (if needed).

    ??? explanation "handleCloseAll"
        When a user clicks on an *Close All* button, this function is invoked to
        collapse the corresponding records and remove the `_id`s of the previously open
        records from the URL, using
        [browserHistory]({{reactRouterTutorial}}/lessons/10-clean-urls)
        .

## [win]({{appBase}}/dux/win.js)

???+ explanation
    Reacts to window resizing by the user. It will deliver the new window size after
    resizing. Useful for components that care about the window size, such as
    [App](Components.md#app)
    .

??? abstract "actions"
    ??? explanation "changeWinDim"
        Responds to window resizing, as set up in
        [Window.md](Components.md#window)
        .
        It is
        just a matter of storing the `height` and the `width` of the window into the
        state. Note that the event emitter in
        [Window.md](Components.md#window)
        is being
        throttled, so that it does not run too frequently during the actual resizing.

??? abstract "reducer"
    Transforms the `win` slice of the state in response to resize events.

??? abstract "selectors"
    ??? explanation "getWinDim"
        Returns the `win` slice of the state, which is just the current width and height
        of the browser window.

## [workflow]({{appBase}}/dux/workflow.js)

???+ explanation
    A lot of the logic of showing lists, items, related items and fields is purely
    generic and driven by the
    [data model](../Concepts/Model.md)
    .

    But there is considerably more to an app than this kind of generic logic. The
    `workflow` dux is the entry point for additional, non-trivial business logic.

    It is still in development.

    ??? abstract "Active items"
        The `package` table determines a lot about the assessment process. It has
        records with a specified startDate end endDate. The packages that have started
        and are not yet passed there endDate are the *active* packages. Normally there
        will be exactly one package.

        From the active package derive a number of other active concepts:

        *   the contribution types listed in the `typeContribution` field of the active
            package are the *active types*
        *   the criteria that are details of the active package are *active criteria*.

        The generic List and Item components can be made sensitive to this notion of
        activity. Active items can be formatted specially, and likewise the non-active
        items, which can also be disabled in some contexts.

        The way (in)active items are displayed is controlled by the
        [data model](../Concepts/Model.md)
        .
        See for example the field `typeContribution` in the tables `package` and
        `criteria`.

??? abstract "actions"
    ??? explanation "fetchWorkflow"
        Fetch the info about the workflow information from the server, in particular the
        reset history since the last startup of the web server.

    ??? explanation "resetWorkflow"
        Fetch the same information as `fetchWorkflow` does, but add `?reset=true` to the
        URL that is used to query this information from the server. This will instruct
        the server to perform a workflow reset.

??? abstract "reducer"
    The reducer is simple, it only has to perform one action: put incoming workflow
    data unto the state. No sophisticated merging is needed, because this workflow
    meta information is only needed for one component,
    [WorkflowInfo](Components.md#workflowinfo)
    ,
    which is meant for sysadmins only.

    ??? note "uses tables reducer"
        The workflow data moves from server to client on the shoulders
        of the
        [tables](Dux.md#tables)
        reducer.

??? abstract "selectors"
    ??? explanation "getWorkflow"
        Returns the `workflow` slice of the state.

??? abstract "helpers"
    ??? explanation "compileActiveItems"
        Computes the active packages, types and criteria and deliver them in an object,
        keyed by kind of item and containing an array of active item MongoDB ids for
        that kind.

    ??? explanation "decisions"
        Most of the contents of the `decision` table, in the form of objects by which
        you can find various user-facing strings associated with the three possible
        review decisions: `accept`, `revise`, and `reject`.

    ??? explanation "finalDecision"
        From workflow attributes that contain reviewers and reviews respectively, find
        out whether there has been a final decision by reviewer 2, and if so, what it
        was.

    ??? explanation "getItem"
        Peels out items of data from a workflow attribute that has fetched arrays of
        data from other records.

    ??? explanation "isReviewerType"
        Computes whether a given author is the first or second reviewer.

    ??? explanation "loadExtra"
        This is a configuration object that specifies which extra tables should be
        fetched from the server along with particular other tables. For example, the app
        can only perform its business logic on contributions, if the tables `package`,
        `criteria`, `typeContribution`, and `decision` are all present on the state.

    ??? explanation "processStatus"
        Produce a string that contains the current assessment status and review status
        of an assessment. This function can be called from a contribution, an assessment
        and a review. So for all these kinds of record we can produce a short overview
        of the state they have reached in the assessment / review process.

        The outcome has a bit that reveals the assessment status and a bit about the
        review status.

        When it is run on behalf of a user with marginal rights, it delivers either the
        empty string, or the outcome of the final review, but only if there has been a
        positive outcome.

        For users with more rights:

        *   **assessment status:**
            *   `▶` if the assessment has been (re)submitted;
            *   `✍` otherwise;
            *   the assessment score
        *   **review status:**
            *   empty string if there review has not reached a final decision;
            *   `✔` on `accept`;
            *   `✋` on `revise`;
            *   `✘` on `reject`.

    ??? explanation "reviewerRole"
        Object that maps the acronyms `E` and `F` to appropriate labels designating
        first and second reviewer.
