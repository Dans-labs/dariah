# Routing

Routing is the task to map urls to functions of the app.
It requires logic at the client side and at the server side.

![diag](../design/design.006.png)

## Client
For this we use the
[React Router](../Technology/React.md#routing)
.

??? abstract "Entry point"
    At the client side, the app starts in
    [main](../Client/Components.md#main)
    .

    The first priority is to create a Redux
    [Provider](../Technology/React.md#redux)
    component, which
    will be ancestor to all other components.

??? abstract "Routing"
    The second priority is to set up the routes configuration, i.e. the way URLs
    give rise to activating certain components.

    In previous versions of React-Router this tended to be done inside one or two
    components, but in the current version it is better done by calling
    `Route` components from the components that need it, i.e. a more
    distributed approach.

    These are the components that use functionality of the router:

    component | task
    --- | ---
    [main](../Client/Components.md#main) | use a router based on the HTML5 history API
    [App](../Client/Components.md#app) | navigate to `/login`, `/logout` etc
    [DocMd](../Client/Components.md#docmd) | navigate to parts of the app from within documents rendered by a markdown component
    [Insert](../Client/Components.md#insert) | wrap the component so that it can navigate to the affected table
    [ListPlain](../Client/Components.md#listplain) | wrap the component so that it can use the browser history object to navigate programmatically
    [OpenCloseAll](../Client/Components.md#opencloseall) | wrap the component so that it can use the browser history object to navigate programmatically
    [Static](../Client/Components.md#static) | make static links to components of the app
    [SubApp](../Client/Components.md#subapp) | make routes to components of the app

## Server

At the *server* there are other rules that link URLs to behaviour.

Here are a few rules that capture how routing works in a Single Page App (SPA)
like the DARIAH app, as visualized by the diagram above.

??? abstract "Fall-back behaviour"
    The server responds to any URL with sending the
    [index]({{serverBase}}/templates/index.html)
    page, which also causes the bundled
    app in
    [dist]({{distBase}})
    to load.

    The server's rules are very simple: no matter what the URL, respond with the
    whole app. The response is static, it is always the same. The client has to
    figure out what component(s) of the app to show and where, based on the details
    of the URL. This behaviour is needed to cater for the case that the user hits
    the browser's refresh button. At that moment, the current URL might be a deep
    path, and we cannot expect the server to know those paths. The best the server
    can do is to send the whole app again.

??? abstract "Special behaviour"

There are a few special patterns, though:

??? abstract "Static files"
    If the URL points to a static file, i.e. a file under
    [`/static/`]({{staticBase}})
    ,
    the server
    will respond with the file contents.

    Otherwise there was no way to serve the
    static JavaScript app in the first place.

??? abstract "Api requests"
    If the URL points to `/api/`, the server will respond in a variety of ways,
    depending on the rest of the URL.

    By means of these `/api/` URLs the client can
    ask for additional data services,
    from file system or database.

    The server side routing in
    [index.py]({{serverBase}}/index.py)
    maps these URLs to specific
    controllers that fetch and assemble the requested data.

    Not only the client app can access this
    [api](../Integration/API.md)
    ,
    you can too.
