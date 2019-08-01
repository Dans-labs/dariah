# Server

Although this app is a single page application with most of the business logic
coded at the client side, there are a bunch of things that are handled at the
server side.

??? abstract "Data access"
    Almost all data access is handled by server side controllers that implement a data api.
    These controllers are informed by the
    [data model](../Concepts/Model.md)
    .

    When the web server starts, the data model files are read, and converted to
    python modules with the same base name that encapsulate the information in the
    YAML files.

    These modules are then imported by all controllers, so that almost all data access
    happens in conformance with the data model and its permissions.

    ??? caution "Other way of data access"
        The module
        [**info**](#info)
        bypasses the regular data access methods, and peeks straight into the 
        MongoDB data. 

## perm

See [perm]({{serverBase}}/controllers/perm.py).

Contains the methods to compute permissions for controllers, tables and fields.
Here are the main methods.

??? abstract "allow()"
    ```python
    allow(
        table, action, msgs,
        verbose=True,
        controller=None,
        record=None,
        newValues=None,
        my=None,
    )
    ```

    ??? explanation "task"
        Given *table* and an *action* (such as `read`, `update`), this method computes
        whether that *action* may be performed on behalf of the current web user.

        No workflow attributes are being used, this is a lower level operation.

    ??? explanation "msgs, verbose"
        If, during the computation of the permission, circumstances occur that must be reported,
        they will be appended to the list *msgs*.
        
        If the permission is denied, *msgs* will contain the reason if *verbose* is `True`.

    ??? explanation "controller"
        If given, the controller-level permissions will be looked up to see
        whether the *controller* may execute for the user at all.
        If not, no permission will be given and the computation stops.

    ??? explanation "record"
        If given, this is the record in the database for which the permission is computed.
        If a *record* is specified, the information in that *record* will be used to
        determine whether the *record* has a special relationship to the user,
        such as *ownership*, *editorship*, or *same country* and in that case the
        permissions tend to be more liberal. Without a *record*, permissions are
        calculated as if the user does not own any *record* in the *table*.

    ??? explanation "newValues"
        If given, this is (part of) the record that results from the action, 
        and it will be used in the calculation of the permission.
        
        It is mainly used when one user changes the permission group of another user:
        we must take care that the principles of who can promote/demote and to what level
        are not violated.

    ??? explanation "my"
        If given, it is a list of fields.
        These fields will be looked up in the *record*, and if the user id of the
        current user is listed in one of them, the record counts as "connected"
        to the user.
        Based on the other permission settings, this may lead to permit the action,
        which might not be permitted if there were no such connection between *record*
        and user.

    ??? explanation "returns"
        ??? explanation "*good*"
            a boolean: `True`: allowed, or `False`: forbidden.

        ??? explanation "*rowFilter*"
            specifies, in case of *good* = True, to which rows the *action* may
            be applied.
            Otherwise, the *rowFilter* is `None`.

            If a *record* is passed *rowFilter* will be also  be `None`, because it is not needed.

            Only if no *record* is given, a *rowFilter* will be computed.
            It has the shape of a MongoDB selection criterion (a dict), but it can
            also be `False` (no rows) or `True` (all rows) or `None` (irrelevant). 

            If the operation is not permitted on any row,
            *rowFilter* becomes `False`.
            The reaction to this outcome should be
            to not perform a database lookup at all.

            ??? note "not an error"
                But this is not a permission error, because in this case the
                list of records for which
                the operation is allowed is empty.
                This is different from *good* is `False` and *rowFilter* is `None`.

        ??? explanation "*fieldSet*"
            specifies, in case of yes, the set of fields in those rows which may be acted upon.
            Otherwise, the *fieldSet* is `None`.

            If no fields are permitted, *fieldSet* is returned as `set()`.
            This will still deliver the `_id` fields,
            because `_id` fields are always permitted.
            If all or part of the fields are permitted,
            the set of permitted fields is returned.

## db

See [db]({{serverBase}}/controllers/db.py).

This is the data access module. It uses the
[data model](../Concepts/Model.md)
to serve any
data to any user in such a way that no data is sent from server to client that
the current user is not entitled to see.

??? explanation 'Model driven"
    The code in `db` is generic, it does not contain explicit reference to
    particular tables and fields. All specifics are derived form the
    [model config file]({{modelBase}}/model.yaml)
    and the table
    specific files in
    [tables]({{modelBase}}/tables)
    .

??? explanation "Workflow hooks"
    There are also *hooks*, where specific behaviour for certain tables can be
    specified. That behaviour is coded in the
    [workflow module](#workflow)
    .

??? abstract "validate()"
    ```python
    validate(table, itemValues, updateFields)
    ```

    ??? explanation "task"
        Server validation of the values of a record.

    ??? explanation "*itemValues*"
        The dictionary of all field values of the item.

    ??? explanation "*updateFields*"
        The set of fields to be updated.

    ??? explanation "returns"

        ??? explanation "valItemValues"
            A dictionary, keyed by field containing:

            ??? explanation "valid"
                A boolean that states whether all values are valid,

            ??? explanation "diags"
                A dictionary of diagnostic information if there are validation errors.

            ??? explanation "msgs"
                A list of error messages if the validation process itself failed.

            ??? explanation "valValues"
                A list of validated values for this field.

        ??? explanation "newValues"
            A list of new values created in related tables.

??? abstract "getList()"
    ```python
    getList(
        controller, table,
        data, msgs,
        verbose=True,
        titleOnly=False,
        withValueLists=True,
        withDetails=True,
        my=False,
    )
    ```

    ??? explanation "task"
        A true workhorse, that retrieves the contents of a table, in various
        circumstances.

    ??? explanation "*controller*"
        is the name of the top-level method that called this function.

    ??? explanation "*table*"
        is the name of the table in question.
        Permissions that are in force may cause a selection on the rows
        and a restriction on the fields that will be shown for each row.

    ??? explanation "*data*"
        A dictionary that holds the results.
        It is keyed by table name, because a single request may need to fetch
        data from related tables as well.

    ??? explanation "*msgs, verbose*"
        A list that accumulates messages incurred by fetching data and checking permissions.
        Will receive more messages if *verbose* is `True`.

    ??? explanation "*titleOnly*"
        tells whether only the titles or the full data of the records should
        be fetched. Again: access levels may constrain the set of returned fields
        further.

    ??? explanation "*withValueLists*"
        If true and if there are fields whose values reside in value
        lists, these value lists will be fetched as well, if needed.

    ??? explanation "*withDetails*"
        If true, the detail records as specified by the data model whose masters
        are in the results, will also be fetched and returned.

    ??? explanation "*my*"
        if True: only fetches rows that have been created by the current user.

        If *my* is a list of fields, these are *ourFields*.
        These fields contain user ids,
        and only records with the current user occurring in one of those fields,
        will be fetched.

        Whereas `my=True` is intended to fetch records
        that are owned or editable by the current user, 
        `my=ourFields` is intended to fetch records
        that are connected to the current user in an other, configurable way.

        It only works if the data model of *table*,
        contains a section `ourFields` listing a number of fields.

??? abstract "getItem()"
    ```python
    getItem(controller, table, eId)
    ```

    ??? explanation "task"
        Fetches a single record from a table.

    ??? explanation "*controller*"
        is the name of the top-level method that called this function.

    ??? explanation "*table*, *eId*"
        is the name of the table in question, and *eId* the identifier
        of a record in that table.
        Permissions that are in force may prevent the record to be fetched
        or cause a restriction on the fields that will be shown.

    ??? explanation "returns"

          ??? explanation "values"
              A dictionary of the values of each field in the record.

          ??? explanation "perm"
              Whether the record may be updated and or deleted.

          ??? explanation "fields"
              A set of field names of the fields that the user may update.
              This is is determined solely on the basis of the permissions,
              the workflow attributes do not play a role.

          ??? explanation "workflow"
              A dictionary of all the workflow attributes associated with this
              record.

??? abstract "modItem()"
    ```python
    modItem(controller, table, action)
    ```

    ??? explanation "task"
        An other workhorse. This function can insert, update and delete a single item.
        New items are inserted as rows with blank fields. The information to update
        items is fetched from the request object. The client has sent this material to
        the server.

        ??? note "workflow"
            These operations are workflow-sensitive: 

            *   before the operation, workflow attributes will be inspected
                in order to determine whether the action can be carried out
            *   after the operation, workflow attributes will be recomputed
                to reflect the changes to the data made by the operation.

    ??? explanation "*controller*"
        Is the name of the top-level method that called this function.

    ??? explanation "*table*"
        Is the name of the table in question.

    ??? explanation "*action*"
        A keyword `insert`, `update` or `delete`.
        
    ??? explanation "request data"
        The request data should contain the data to perform the *action*:

        *   `insert`: a dictionary of field-values for the new record;
        *   `delete`: a dictionary containing a pair `_id: eId`
            which specifies the record to delete;
        *   `update`: a modified record containing a pair `_id: eId`
            which specifies the record to delete;

    ??? abstract "insert"
        When inserting records as details of an other record,
        each inserted record gets the field pointing to the master filled in.

        The workflow hook
        [`detailInsert`](../Functionality/Workflow.md#hooks)
        is called to insert certain detail records after inserting
        the master record.
        
    ??? abstract "delete"
        When deleting records, the questions arise:

        *   what if the record is used by another record as related record?
            Deletion would render that other record incomplete.
        *   what if the record has releated records? 
            Should they be deleted too?
            If those are related to other records as well, those records
            could become incomplete?

        We deal with these questions as follows:

        The table model may specify that a certain kind of details should be
        cascade-deleted by means of the `cascade` key.

        ??? example
            The
            [assessment model]({{modelBase}}/tables/assessment.yaml)
            has

            ```yaml hl_lines="12"
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

            This means that when an assessment is deleted, all its criteria-entries
            will be deleted as well.
            Criteria entries form an integral part of an assessment, and no
            criteria entry record serves multiple assessments.

        If after cascade-deleting of detail records, there would remain undeleted
        detail records, then the record will *not* be deleted, nor any of its details.
        This check is carried out without deleting anything.

    ??? abstract "update"
        Before an update happens, the new values will be validated on the server.
        If there are errors, warnings will travel to the client, and the update
        does not occur.

        The workflow hook
        [`consolidateRecord`](../Functionality/Workflow.md#hooks)
        is called to consolidate the record if some conditions are met.
        
        ??? explanation "provenance metadata"
            Upon each update, it will be recorded in the updated document who did
            the update and when. These values will be appended to the field 
            `modified` in a consolidated way, i.e. the name of the updater is
            looked up in the related table first.

            ??? note "Filtering update times"
                Recording every single update may lead to very long trails in the
                `modified` field. For that reason, we filter the trail for each update.
                Filtering thins updates made before today.
                For those days, it keeps for each person that modified on that day the
                last modification time.

## user

See [user]({{serverBase}}/controllers/user.py).

Contains the logic needed to maintain the user table.
The `eppn` attribute is key to identify users.
It is the name by which they are identified by the DARIAH identity provider.

??? abstract "getUser()"
    ```python
    getUser(eppn, email=None)
    ```

    ??? explanation "task"
        Return all characteristics of this user that can be found in the system,
        including to what permission group the user belongs.

    ??? explanation "*eppn*, *email*"
        The *eppn* attribute is used as primary means to identify the user, and only
        if that does not yield a result, the email address is used.

??? abstract "storeUpdate()"
    ```python
    storeUpdate(newUserInfo):
    ```
    
    ??? explanation "task"
        When new users log in through the DARIAH infrastructure,
        the identifying attributes from the identity provider are collected
        by [`authenticate()`](Authentication.md).

        From there, this function stores those details in the user table.
        Or, if there is already an entry for this user,
        that entry is updated with the new information gathered.

## auth

See [auth]({{serverBase}}/controllers/auth.py).

Contains the methods to authenticate users. Here all the logic about user
sessions and session cookies is written down. It builds on the Flask web
framework.

It starts working when the server is started.
Then it collects information from the environment to set up the cryptography for the 
sessions.

And it (re)computes all workflow attributes of all records in the database from scratch.

??? abstract "readBundleNames()"
    ```python
    readBundleNames(regime)
    ```

    ??? explanation "task"
        This is an initialization routine which realizes
        [cache busting](../Maintenance/Deploy.md#client-code)
        of javascript and css files.

        It is called when the `AuthApi` object is initialized.

        ??? explanation "Cache busting"
            For production, the JS and CSS bundles for the browser
            have names with a random hash in it, so that an update of
            the app will trigger all clients to fetch a new version
            of these bundles instead of relying on their cached versions.

        ??? details "Fiddling with the index page"
            The server generates the HTML index page that will load these bundles,
            to we have to fiddle those hashes into the index template.

            We have set up the client build script (webpack) in such a way
            that the hashed file names are written to a file
            `bundle.html` in the distribution directory.

    ??? explanation "*regime*"
        There are several run scenarios, and inspecting the environment variable
        `REGIME` enables the server to determine the scenario it works in.

        ??? details "Run scenarios"
            There are three scenarios for running the DARIAH app:

            ??? note "`None`"
                **production build served by a production webserver**

                The server has not been started with the build script.

                Hashed file names needed.

            ??? note "`develop`"
                **production build served by the local flask webserver**

                The server has been started by the build script with argument `serve`.

                Hashed file names needed.

            ??? note "`hot`"
                **develop build served by the webpack devserver**

                The server has been started by the build script with argument `servehot`.

                Hashed file names *not* needed.

        The proper tweaking of `bundle.html` will take place
        for all these scenarios.

??? abstract "authenticate()"
    ```python
    authenticate(login=False)
    ```

    ??? explanation "task"
        Tries to authenticate the current user by looking up a session created by
        the DARIAH identity provider, and retrieving the attributes of that session.

        If it finds unsatisfactory attributes in the session, the session will be deleted,
        and the user is not authenticated.

    ??? explanation "*login*"
        This is only relevant on the development system.
        If `True`, the server asks for a login name on the command line,
        and if a valid test user is typed in, it logs that user in.

        On the production system, the login process takes place outside this app.
        Only after login this app is able to detect whether a user has logged in
        and if so, which user that is.

??? abstract "deauthenticate()"
    ```python
    deauthenticate()
    ```

    ??? explanation "task"
        Clears the info of the current user and if that user has been identified
        by the DARIAH identity provider, the corresponding session will be deleted.

## file

See [file]({{serverBase}}/controllers/file.py).

Contains the methods to get file data from the server.

??? abstract "determineOrigin()"
    ```python
    determineOrigin(path)
    ```

    You can configure origin directories for static files depending on the url path.

    The configuration is in
    [file]({{serverBase}}/controllers/file.py)
    itself, in the variable `origins`, which is a dictionary of
    initial path strings mapped to an origin directory.

    For each request for a static file, this function is called to
    locate the file on the server.

??? abstract "static()"
    ```python
    static(path)
    ```

    ??? explanation "task"
        Reads the file identified by `path` on the server and sends its contents
        as a static file over HTTP to the client.

??? abstract "json()"
    ```python
    json(path)
    ```

    ??? explanation "task"
        Reads the file identified by `path` on the server and sends its contents,
        wrapped as JSON data over HTTP to the client.

## workflow

See [workflow]({{serverBase}}/controllers/workflow.py).

Implements the [workflow engine](../Functionality/Workflow.md) which
takes care of various aspects of the business logic, just above the level
of data fetching and permissions.

## info

See [info]({{serverBase}}/controllers/info.py).

This module is reponsible for an overview of the statistics
of the contributions.

National coordinators and backoffice personnel
can (de)select contributions from this page.

??? note "Permissions"
      It does manage access to data, and takes care that every user can access
      the data under the proper conditions.
      
      It will hide the sensitive fields (cost) from unauthorized users.

      Care is taken that NCs can only take selection decisions for
      contributions from their own country.
      Backoffice users can modify any selection decision.

## utils

See [utils]({{serverBase}}/controllers/utils.py).

Low level stuff.

