# Routing

## Client

### Entry point

At the client side, the app starts in [main](Components#main).

The first priority is to create a Redux [Provider](React#redux) component, which
will be ancestor to all other components.

### Routing

The second priority is to set up the routes configuration, i.e. the way URLs
give rise to activating certain components.
![diag](../design/design.006.png)

We are still talking about *client* side routing.

## Server

At the *server* there are other rules that link URLs to behaviour.

Here are a few rules that capture how routing works in a Single Page App (SPA)
like this, and the diagram visualizes the same logic.

### Fall-back behaviour

The server responds to any URL with sending the
[index]({{serverBase}}/views/index.tpl) page, which also causes the bundled
app in [dist]({{repBase}}/static/dist) to load.

The server's rules are very simple: no matter what the URL, respond with the
whole app. The response is static, it is always the same. The client has to
figure out what component(s) of the app to show and where, based on the details
of the URL. This behaviour is needed to cater for the case that the user hits
the browser's refresh button. At that moment, the current URL might be a deep
path, and we cannot expect the server to know those paths. The best the server
can do is to send the whole app again.

### Special behaviour

There are a few exceptions, though:

#### Static ###

If the URL points to a static file, i.e. a file under `/static/`, the server
will respond with the file contents. Otherwise there was no way to serve the
static JavaScript app in the first place.

#### Api ###

If the URL points to `/api/`, the server will respond in a variety of ways,
depending on the rest of the URL. By means of these `/api/` URLs the client can
ask for additional data services, from file system or database. The server side
routing in [index.py]({{serverBase}}/index.py) maps these URLs to specific
controllers that fetch and assemble the requested data.

Not only the client app can access this [api](API), you can too.
