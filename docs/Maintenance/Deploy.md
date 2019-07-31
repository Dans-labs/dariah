# Deployment

## Basic information

what | where
--- | ---
source code GitHub repository | [{{repo}}]({{repo}})
tech doc GitHub Pages | [{{docSite}}]({{docSite}})
tech doc source | [{{docsBase}}]({{docsBase}})
app live | [{{liveBase}}]({{liveBase}})

## Python

This app needs
[Python]({{python}})
,
version at least 3.6.3.

??? details "development"
    Install it from [{{pythondl}}]({{pythondl}}).

    The list of Python dependencies to be `pip`-installed is in
    [requirements.txt]({{serverBase}}/config/requirements.txt)
    .

    A snapshot of installed modules and versions is in
    [requirements.md]({{serverBase}}/config/requirements.md)
    .

    Install them like so:

    ```sh
    pip3 install pymongo flask
    ```

??? details "production"
    Python can be installed by means of the package manager.

    ```
    yum install rh-python36 rh-python36-python-pymongo rh-python36-mod_wsgi
    scl enable rh-python36 bash
    cp /opt/rh/httpd24/root/usr/lib64/httpd/modules/mod_rh-python36-wsgi.so modules
    cd /etc/httpd
    cp /opt/rh/httpd24/root/etc/httpd/conf.modules.d/10-rh-python36-wsgi.conf conf.modules.d/
    pip install flask
    ```

    More info about running Python3 in the web server
    [mod_wsgi guide]({{wsgi}}/user-guides/quick-installation-guide.html)
    .

    The website runs with SELinux enforced,
    and also the updating process works in that mode.

## Mongo DB

This app works with database
[Mongo DB]({{mongodb}}) 
version 4.0.3 or higher.

??? abstract "On the mac"
    ??? details "Installing"
        ```sh
        brew install MongoDB
        ```

    ??? details "Upgrading"
        ```sh
        brew update
        brew upgrade MongoDB
        brew link --overwrite MongoDB
        brew services stop MongoDB
        brew services start MongoDB
        ```

    ??? details "Using"

        ??? details "Daemon"
            ```sh
            mongod -f /usr/local/etc/mongod.conf 
            ```

            Stop it with ++ctrl+"c"++

        ??? details "Console"
            ```sh
            mongo
            ```

            If the DARIAH data has been loaded, say on the mongo prompt:

            ```sh
            use dariah
            ```

            and continue with query statements inside the daria collection.

        ??? details "In programs"
            Via pymongo (no connection information needed).

            ```sh
            pip3 install pymongo
            ```

            ```python
            from pymongo import MongoClient
    
            clientm = MongoClient()
            MONGO = clientm.dariah

            contributions = list(MONGO['contrib'].find()
            ```
    
## Web framework
For the *server* application code we use
[Flask]({{flask}})
,
a Python3
micro framework to route URLs to functions that perform requests and return
responses. It contains a development web server.

??? details "What the server code does"
    The code for the server is at its heart a mapping between routes (URL patterns) and
    functions (request => response transformers).
    The app source code for the server
    resides in
    [serve.py]({{serverBase}}/serve.py)
    and other `.py` files in
    [controllers]({{serverBase}}/controllers)
    imported by it.

    The module
    [index.py]({{serverBase}}/index.py)
    defines routes and associates functions to be executed for those routes.
    These functions take a request, and turn it into a response.

??? details "Sessions and a secret key"
    The server needs a secret key, we store it in a fixed place. Here is the command
    to generate and store the key.

    ```sh tab="server"
    cd /opt/web-apps
    date +%s | sha256sum | base64 | head -c 32 > dariah_jwt.secret
    ```

    ``` sh tab="mac"
    cd /opt/web-apps
    date +%s | shasum -a 256 | base64 | head -c 32 > dariah_jwt.secret
    ```


## Web server
??? explanation "production"
    The production web server is **httpd (Apache)**.
    Flask connects to it through
    [mod_wsgi]({{wsgi}})
    (take care to use a version that speaks Python3).
    This connection is defined in the default config file.
    See
    [default_example.conf]({{serverBase}}/config/default_example.conf)
    .

    *   `/etc/httpd/config.d/`
    *   `default.conf` (config for this site)
    *   `shib.conf` (config for shibboleth authentication)
    *   ...

    The app starts/stops when Apache starts/stops.

??? explanation "development"
    In development,
    [flask]({{flask}})
    runs its own little web server.
    You can run the development server by
    saying, in the top level directory of the repo clone:

    ```sh
    ./build.sh serve
    ```

    which starts a small web server that listens to localhost on port 8001.

    In this case a production build of the app is served locally.

    For real development, it is better to work with a development server for the
    client as well that can hot-load modified css and javascript.

    Whenever you save a modified python source file, the server reloads itself.

    In order to follow that scenario, you should start the server as

    ```sh
    ./build.sh servehot
    ```

    ??? caution
        This does not yet start the client site development server!

## Client code

The *client* code is done in
[React]({{reactDocs}})
using the
[JSX]({{reactDocs}}/introducing-jsx.html)
idiom.

We have added
[Redux]({{redux}})
to the mix and various other libraries, obtained through
[npm]({{npm}})
.

Everything is glued together by means of modern JavaScript:
[ES6 = ES2015]({{babel}}/docs/learn-es2015/)
.

The build tool is
[Webpack]({{webpack}})
.

??? abstract "Install"
    ??? hint "Not needed in production
        Installation is only needed on machines
        where you want to develop the client application.
        If you merely want to run the app, this is not needed.

    Install
    [node]({{node}})
    from its
    [download page]({{node}}/en/download/)
    .

    Then
    install all JavaScript dependencies in one go by executing

    ```sh
    cd /path/to/dariah/client
    npm install
    ```

??? abstract "Build"
    ??? explanation "Bundling"
        The JSX and ES6 of client components and helpers will be bundled with other
        JavaScript sources from `node_modules`.
        The result ends up in
        [`static/dist`]({{distBase}}).

        JavaScript for the 
        [info.html]({{serverBase}}/templates/info.html)
        template resides in
        [`static/js`]({{staticBase}}/js)
        and will be included directly by the main html file `index.html`.

    ??? explanation "Build tool"
        The build tool is **webpack**.
        We use our own 
        [build.sh]({{repBase}}/build.sh)
        to call webpack for various scenarios.

        You can perform builds, by saying, in the toplevel
        directory of the GitHub clone:

        ```sh tab="production"
        ./build.sh prod
        ```

        ```sh tab="development"
        ./build.sh dev
        ```

        ```sh tab="hot development"
        ./build.sh hot
        ```

        **Production** provides a minified production build.

        *Hot development* starts a development server,
        and produces an incremental development build on every saved change
        in the source code, with hot-reloading of react modules.

        ??? caution "building for server and client"
            In order to run the app on a development machine,
            you need three terminal tabs open:

            ??? details "mongo"
                ```sh
                ./build.sh mongo
                ```

                runs the Mongo DB daemon.

            ??? details "server"
                ```sh tab="production"
                ./build.sh serve
                ```

                ```sh tab="development"
                ./build.sh serve
                ```

                ```sh tab="hot development"
                ./build.sh servehot
                ```

            ??? details "client"
                ```sh tab="production"
                ./build.sh prod
                ```

                ```sh tab="development"
                ./build.sh dev
                ```

                ```sh tab="hot development"
                ./build.sh hot
                ```

                ??? note
                    You can run production builds and development builds
                    on your development machine.

        ??? explanation "Higher level build commands"
            Our build script is much more capable.
            For example

            ```sh
            ./build.sh shipcode message
            ```

            * builds and publishes the documentation
            * makes a production build of the client code
            * commits the repo with commit `message`

            so that after this you can deploy on the server by means
            of a single call of

            ``sh
            ./update.sh
            ```

            which pulls the changes from GitHub and restarts Apache.

        ??? explanation "More `build.sh` commands"
            See the code in
            [build script]({{repBase}}/build.sh)
            for an overview of what it can do, or run

            ```sh
            ./build.sh
            ```

            (without arguments).

??? abstract "Cache busting"
    When this app is being developed, and a new version is released,
    we want browsers to pick up the newer code,
    instead of serving the older javascript and css from cache.

    That is why new bundles always have different names.

    Webpack provides a bit of infrastructure to append *hashes*
    after the chunks that make up a bundle.
    The other thing is to pick those names up in the html template
    that embodies the Single Page App:
    [index.html]({{serverBase}}/templates/index.html)
    .

    You see that the links to the CSS and the Javascript
    are variable elements of this template.
    When the server starts,
    it may encounter two cases:

    ??? details "No `dist`"
        The
        [`/static/dist`]({{distBase}})
        directory does not exist or is empty.

        That means that we are in hot development mode
        running under the webpack dev-server.
        In this case we do not use hashed names,
        and the server can use fixed file names for the css and js code.

    ??? details "`dist` non-empty"
        There is a non-empty
        [`/static/dist`]({{distBase}})
        directory.

        It must contain a webpack generated minimal html file
        that includes the css and js bundles.

        The server extracts that info when it starts up and
        uses it to fill the template variables. 

    See also
    [readBundleNames](../Server/Server.md#auth)
    .

## User authentication
We make use of the DARIAH infrastructure for *user authentication*
[AAI]({{dariahIDP}})
(see in particular
[Integrating Shibboleth Authentication into your Application]({{dariahShib}})
.

## Documentation
The app itself gives access to documentation:

what | where
--- | --
live | [{{docSite}}]({{docSite}})
source | [{{docsBase}}]({{docsBase}})

not only for end users, but also
for developers and app-designers.

The docs are generated as static GitHub pages by
[mkdocs]({{mkdocs}})
with a
[DANS theme]({{mkdocsdans}})
which has been customized from 
[mkdocs-material]({{mkdocsmaterial}}).

To get the DANS theme,
follow the instructions in
[mkdocs-dans]({{mkdocsdans}}/#quick-start)
.

## File structure

By GitHub clone we mean a clone of
[Dans-labs/dariah]({{repo}})
.

The absolute location is not important.

??? abstract "Production server"
    For the production server we assume everything resides in `/opt`, 
    on the development machine the location does not matter.

    On production we need in that location:

    *   `shibboleth`
        Config for the DARIAH identity provider.
    *   `webapps`
        *   `dariah`
            Root of the GitHub clone.
        *   `dariah_jwt.secret`
            Secret used for encrypting sessions,
            can be generated with 
            [gen_jwt_secret.sh]({{serverBase}}/gen_jwt_secret.sh)

??? abstract "Development machine"
    On the development machine we need just the GitHub clone and

    *   `dariah`
        Root of the GitHub clone.
    *   `/opt/web-apps/dariah_jwt.secret`

What follows is the structure of the GitHub clone.

???+ abstract "top level"
    *   [build.sh]({{repBase}}/build.sh)
        script for build/development tasks, the options are documented
        inside, or run it without arguments for help
    *   [LICENSE]({{repBase}}/LICENSE)
        license file (MIT)
    *   [mkdocs.yml]({{repBase}}/mkdocs.yml)
        documentation config file
    *   [README.md]({{repBase}}/README.md)
        short description for humans

??? abstract "server"
    See
    [server]({{serverBase}})
    .

    ???+ abstract "files"
        *   [compile.py]({{serverBase}}/compile.py)
            converts yaml model files into python modules
        *   [gen_jwt_secret.sh]({{serverBase}}/gen_jwt_secret.sh)
            Generate a secret for encrypting sessions
        *   [index.py]({{serverBase}}/index.py)
            entry point
        *   [server.py]({{serverBase}}/serve.py)
            wsgi entry-point for apache

    ??? abstract "config"
        See
        [config]({{serverBase}}/config)
        .
        ???+ abstract "files"
            *   [default_example.conf]({{serverBase}}/config/default_example.conf)
                example config file for Apache httpd server
            *   [requirements.txt]({{serverBase}}/config/requirements.txt)
                the list of python packages needed;
                to be installed with `pip3`

    ??? abstract "controllers"
        See
        [controllers]({{serverBase}}/controllers)
        .

        ???+ abstract "files"
            *   [auth.py]({{serverBase}}/controllers/auth.py)
                handle the login process
            *   [db.py]({{serverBase}}/controllers/db.py)
                JSON data from MongoDB
            *   [file.py]({{serverBase}}/controllers/file.py)
                JSON data from file system
            *   [info.py]({{serverBase}}/controllers/info.py)
                make overviews
            *   [perm.py]({{serverBase}}/controllers/perm.py)
                permission control
            *   [user.py]({{serverBase}}/controllers/user.py)
                handle the user data
            *   [utils.py]({{serverBase}}/controllers/utils.py)
                low level utilities
            *   [workflow.py]({{serverBase}}/controllers/workflow.py)
                workflow engine

    ??? abstract "models"
        See
        [models]({{modelBase}})
        .

        Contains yaml files defining the
        [data model](../Concepts/Model.md)
        .

        The yaml files are source files to be compiled to python files in
        [compiled]({{modelBase}}/compiled)
        .

        ???+ abstract "files"
            *   [model.yaml]({{modelBase}}/model.yaml)
                Generic settings and parameters of the data model
                and the permission model.

        ??? abstract "compiled"
            See
            [compiled]({{modelBase}}/compiled)
            .

            ???+ abstract "files (generated)"
                *   [model.py]({{modelBase}}/compiled/model.py)
                    Python datastructure containing the complete data model
                *   [names.py]({{modelBase}}/compiled/names.py)
                    Python class containing a lot of constant names

            ??? abstract "tables"
                See
                [tables]({{modelBase}}/tables)
                .

                *   [assessment.yaml]({{modelBase}}/tables/assessment.yaml)
                *   [contrib.yaml]({{modelBase}}/tables/contrib.yaml)
                *   [country.yaml]({{modelBase}}/tables/country.yaml)
                *   [criteria.yaml]({{modelBase}}/tables/criteria.yaml)
                *   [criteriaEntry.yaml]({{modelBase}}/tables/criteriaEntry.yaml)
                *   [decision.yaml]({{modelBase}}/tables/decision.yaml)
                *   [discipline.yaml]({{modelBase}}/tables/discipline.yaml)
                *   [keyword.yaml]({{modelBase}}/tables/keyword.yaml)
                *   [package.yaml]({{modelBase}}/tables/package.yaml)
                *   [permissionGroup.yaml]({{modelBase}}/tables/permissionGroup.yaml)
                *   [review.yaml]({{modelBase}}/tables/review.yaml)
                *   [reviewEntry.yaml]({{modelBase}}/tables/reviewEntry.yaml)
                *   [score.yaml]({{modelBase}}/tables/score.yaml)
                *   [tadirahActivity.yaml]({{modelBase}}/tables/tadirahActivity.yaml)
                *   [tadirahObject.yaml]({{modelBase}}/tables/tadirahObject.yaml)
                *   [tadirahTechnique.yaml]({{modelBase}}/tables/tadirahTechnique.yaml)
                *   [typeContribution.yaml]({{modelBase}}/tables/typeContribution.yaml)
                *   [user.yaml]({{modelBase}}/tables/user.yaml)
                *   [vcc.yaml]({{modelBase}}/tables/vcc.yaml)
                *   [year.yaml]({{modelBase}}/tables/year.yaml)

    ??? abstract "templates"
        See
        [templates]({{serverBase}}/templates)
        .

        ???+ abstract "files"
            *   [info.html]({{serverBase}}/templates/info.html)
                the html template for displaying overviews and stats
            *   [index.html]({{serverBase}}/templates/index.html)
                the html template of the single page app

??? abstract "static"
    See
    [`static`]({{staticBase}})
    .

    ??? abstract "css"
        See
        [css]({{staticBase}}/css)
        .

        ???+ abstract "files"
            *   [font-awesome.min.css]({{staticBase}}/css/font-awesome.min.css)
            *   [info.css]({{staticBase}}/css/info.css)
                Styling for the
                [info]({{serverBase}}/templates/info.html)
                template.
            *   [leaflet-src.map]({{staticBase}}/css/leaflet-src.map)
            *   [leaflet.css]({{staticBase}}/css/leaflet.css)
            *   [vars.css]({{staticBase}}/css/vars.css)
                Variable settings for the styles for the
                [info]({{serverBase}}/templates/info.html)
                template.

        ??? abstract "images"
            See
            [images]({{staticBase}}/css/images)
            .

            For leaflet.

    ??? abstract "dist"
        See
        [dist]({{staticBase}}/dist)
        .

        JavaScript and css built from
        [client/src]({{clientBase}}/src)
        .

    ??? abstract "docs"
        See
        [docs]({{staticBase}}/docs)
        .

        Specific bits of information.

        ???+ abstract "files"
            *   [about.md]({{staticBase}}/docs/about.md)
                "about" text of the contribution tool
            *   [criteria.docx]({{staticBase}}/docs/criteria.docx)
                Specification of criteria (editable in Word).
            *   [criteria.pdf]({{staticBase}}/docs/criteria.pdf)
                Specification of criteria (pdf).
            *   [design.pdf]({{staticBase}}/docs/design.pdf)
                notes on the design of this web app

    ??? abstract "favicons"
        See
        [favicons]({{staticBase}}/favicons)
        .

        Generated set of favicons, based on the logo
        of the contribution tool,
        designed in a
        [keynote presentation]({{docsBase}}/icons/inkind_logo.key)

    ??? abstract "fonts"
        See
        [fonts]({{staticBase}}/fonts)
        .

        The fonts here come from FontAwesome and Leaflet.

    ??? abstract "images"
        See
        [images]({{staticBase}}/images)
        .

        Again favicons and logos.

    ??? abstract "js"
        See
        [js]({{staticBase}}/js)
        .

        *   [dariah.js]({{staticBase}}/js/dariah.js)
            Scripts for the 
            [info]({{serverBase}}/templates/info.html)
            template.
        *   [jquery.js]({{staticBase}}/js/jquery.js)
            Generic toolkit, used by
            [dariah.js]({{staticBase}}/js/dariah.js)

    ??? abstract "tools"
        See
        [tools]({{staticBase}}/tools)
        .

        These files are not active in the web scenarios,
        except for documentation.
        They are helpers to prepare the data for the app.

        ???+ abstract "files"
            *   [backoffice.yaml]({{staticBase}}/tools/backoffice.yaml)
                Start package in yaml format. 
                A result from manually transferring the content in
                [criteria.docx]({{staticBase}}/docs/criteria.docx)
                to yaml.
            *   [config.yaml]({{staticBase}}/tools/config.yaml)
                Is used in the conversion that generates initial content.
            *   [dump.sh]({{staticBase}}/tools/dump.sh)
                copy Filemaker legacy data to production server,
                as XML export
            *   [load.sh]({{staticBase}}/tools/load.sh)
                run Filemaker conversion and import
                into MongoDB on production server
            *   [mongoFromFm.py]({{staticBase}}/tools/mongoFromFm.py)
                Stand-alone definitive data conversion from
                FileMaker original to MongoDb
            *   [removeblank.py]({{staticBase}}/tools/removeblank.py)
                Script to remove blank documents from the Mongo Db
            *   [removeblank.sh]({{staticBase}}/tools/removeblank.sh)
                Wrapper around
                [removeblank.py]({{staticBase}}/tools/removeblank.py)
                to run it on the production server.
            *   [update.sh]({{staticBase}}/tools/update.sh)
                script to deploy updates of the web app.
                Pulls code from the github repo, restarts httpd.

        ??? abstract "country_compose"
            See
            [country_compose]({{staticBase}}/tools/country_compose)
            .

            Tool to tweak a map of European countries,
            result in
            [europe.geo.js]({{libBase}}/europe.geo.js)

            ???+ abstract "files"
                *   [countries.ipynb]({{staticBase}}/tools/country_compose/countries.ipynb)
                    Jupyter notebook to tweak the European country borders
                    to a lower resolution and export them to json.

            ??? abstract "geojson"
                See
                [geojson]({{staticBase}}/tools/country_compose/geojson)
                .

                Contains European country borders in files
                with geojson coordinates.

??? abstract "`client`"
    See
    [`client`]({{clientBase}})
    .

    ???+ abstract "files"
        *   [mocha-webpack.opts]({{clientBase}}/mocha-webpack.opts)
            Option file for unit testing with [mocha]({{mocha}}).
        *   [package-lock.json]({{clientBase}}/package-lock.json)
            [npm]({{npm}}) config file used to record the exact
            javascript module configuration that is in force.
        *   [package.json]({{clientBase}}/package.json)
            [npm]({{npm}}) config file.
        *   [webpack.common.js]({{clientBase}}/webpack.common.js)
            Config file for webpack, the build tool.
            Settings that are common for production and development.
        *   [webpack.config-test.js]({{clientBase}}/webpack.config-test.js)
            Config file for webpack, the build tool.
            Settings that specific for testing.
        *   [webpack.dev.js]({{clientBase}}/webpack.dev.js)
            Config file for webpack, the build tool.
            Settings that specific for development.
        *   [webpack.prod.js]({{clientBase}}/webpack.prod.js)
            Config file for webpack, the build tool.
            Settings that specific for production.


    ??? abstract "node_modules"
        See
        [node_modules]({{clientBase}}/node_modules)
        .

        JavaScript dependencies, managed by [npm]({{npm}}).

    ??? abstract "src"
        See
        [src]({{clientBase}}/src)
        .

        ??? abstract "css"
            See
            [css]({{clientBase}}/src/css)
            .

            ???+ abstract "files"
                *   [clickables.css]({{clientBase}}/src/css/clickables.css)
                *   [custom.css]({{clientBase}}/src/css/custom.css)
                *   [documents.css]({{clientBase}}/src/css/documents.css)
                *   [editing.css]({{clientBase}}/src/css/editing.css)
                *   [filtering.css]({{clientBase}}/src/css/filtering.css)
                *   [grid.css]({{clientBase}}/src/css/grid.css)
                *   [main.css]({{clientBase}}/src/css/main.css)
                *   [nav.css]({{clientBase}}/src/css/nav.css)
                *   [notification.css]({{clientBase}}/src/css/notification.css)
                *   [page.css]({{clientBase}}/src/css/page.css)
                *   [RelSelect.css]({{clientBase}}/src/css/RelSelect.css)
                *   [stats.css]({{clientBase}}/src/css/stats.css)
                *   [tables.css]({{clientBase}}/src/css/tables.css)
                *   [templates.css]({{clientBase}}/src/css/templates.css)
                *   [tooltip.css]({{clientBase}}/src/css/tooltip.css)
                *   [vars.css]({{clientBase}}/src/css/vars.css)
                *   [widgets.css]({{clientBase}}/src/css/widgets.css)
                *   [workflow.css]({{clientBase}}/src/css/workflow.css)

        ??? abstract "html"
            See
            [html]({{clientBase}}/src/html)
            .

            ???+ abstract "files"
                *   [bundle.html]({{clientBase}}/src/html/bundle.html)
                    Template for the html file that calls the built bundle.
                    That html file will be tweaked for the sake of
                    [cache busting](#client-code)
                    of css and js files.

        ??? abstract "js"
            See
            [js]({{clientBase}}/src/js)
            .

            ??? abstract "app"
                See
                [app]({{clientBase}}/src/js/app)
                .

                ???+ abstract "files"
                    *   [main.jsx]({{clientBase}}/src/js/app/main.jsx)
                        client-side entry-point for the app

                ??? abstract "components"
                    See
                    [components]({{clientBase}}/src/js/app/components)
                    .

                    [React components](../Client/Components.md)
                    in `*.jsx` files.

                    ???+ abstract "files"
                        *   [App.jsx]({{clientBase}}/src/js/app/components/App.jsx)
                        *   [Bool3.jsx]({{clientBase}}/src/js/app/components/Bool3.jsx)
                        *   [ByValue.jsx]({{clientBase}}/src/js/app/components/ByValue.jsx)
                        *   [CheckboxI.jsx]({{clientBase}}/src/js/app/components/CheckboxI.jsx)
                        *   [Doc.jsx]({{clientBase}}/src/js/app/components/Doc.jsx)
                        *   [DocHtml.jsx]({{clientBase}}/src/js/app/components/DocHtml.jsx)
                        *   [DocMd.jsx]({{clientBase}}/src/js/app/components/DocMd.jsx)
                        *   [DocPdf.jsx]({{clientBase}}/src/js/app/components/DocPdf.jsx)
                        *   [EditControl.jsx]({{clientBase}}/src/js/app/components/EditControl.jsx)
                        *   [EditDelete.jsx]({{clientBase}}/src/js/app/components/EditDelete.jsx)
                        *   [EditHelp.jsx]({{clientBase}}/src/js/app/components/EditHelp.jsx)
                        *   [EditInsert.jsx]({{clientBase}}/src/js/app/components/EditInsert.jsx)
                        *   [EditStatus.jsx]({{clientBase}}/src/js/app/components/EditStatus.jsx)
                        *   [ErrorBoundary.jsx]({{clientBase}}/src/js/app/components/ErrorBoundary.jsx)
                        *   [EUMap.jsx]({{clientBase}}/src/js/app/components/EUMap.jsx)
                        *   [Expand.jsx]({{clientBase}}/src/js/app/components/Expand.jsx)
                        *   [Facet.jsx]({{clientBase}}/src/js/app/components/Facet.jsx)
                        *   [FieldEdit.jsx]({{clientBase}}/src/js/app/components/FieldEdit.jsx)
                        *   [FieldRead.jsx]({{clientBase}}/src/js/app/components/FieldRead.jsx)
                        *   [FieldSet.jsx]({{clientBase}}/src/js/app/components/FieldSet.jsx)
                        *   [Filter.jsx]({{clientBase}}/src/js/app/components/Filter.jsx)
                        *   [Fulltext.jsx]({{clientBase}}/src/js/app/components/Fulltext.jsx)
                        *   [Input.jsx]({{clientBase}}/src/js/app/components/Input.jsx)
                        *   [InputMulti.jsx]({{clientBase}}/src/js/app/components/InputMulti.jsx)
                        *   [Insert.jsx]({{clientBase}}/src/js/app/components/Insert.jsx)
                        *   [ItemAction.jsx]({{clientBase}}/src/js/app/components/ItemAction.jsx)
                        *   [ItemContainer.jsx]({{clientBase}}/src/js/app/components/ItemContainer.jsx)
                        *   [ItemDetails.jsx]({{clientBase}}/src/js/app/components/ItemDetails.jsx)
                        *   [ItemEdit.jsx]({{clientBase}}/src/js/app/components/ItemEdit.jsx)
                        *   [ItemForm.jsx]({{clientBase}}/src/js/app/components/ItemForm.jsx)
                        *   [ItemRead.jsx]({{clientBase}}/src/js/app/components/ItemRead.jsx)
                        *   [ItemRow.jsx]({{clientBase}}/src/js/app/components/ItemRow.jsx)
                        *   [ListContainer.jsx]({{clientBase}}/src/js/app/components/ListContainer.jsx)
                        *   [ListFilter.jsx]({{clientBase}}/src/js/app/components/ListFilter.jsx)
                        *   [ListGrid.jsx]({{clientBase}}/src/js/app/components/ListGrid.jsx)
                        *   [ListPlain.jsx]({{clientBase}}/src/js/app/components/ListPlain.jsx)
                        *   [ListStats.jsx]({{clientBase}}/src/js/app/components/ListStats.jsx)
                        *   [Login.jsx]({{clientBase}}/src/js/app/components/Login.jsx)
                        *   [MarkdownArea.jsx]({{clientBase}}/src/js/app/components/MarkdownArea.jsx)
                        *   [NotFound.jsx]({{clientBase}}/src/js/app/components/NotFound.jsx)
                        *   [Notification.jsx]({{clientBase}}/src/js/app/components/Notification.jsx)
                        *   [OpenCloseAll.jsx]({{clientBase}}/src/js/app/components/OpenCloseAll.jsx)
                        *   [RelSelect.jsx]({{clientBase}}/src/js/app/components/RelSelect.jsx)
                        *   [Root.jsx]({{clientBase}}/src/js/app/components/Root.jsx)
                        *   [ScoreBox.jsx]({{clientBase}}/src/js/app/components/ScoreBox.jsx)
                        *   [Stat.jsx]({{clientBase}}/src/js/app/components/Stat.jsx)
                        *   [Static.jsx]({{clientBase}}/src/js/app/components/Static.jsx)
                        *   [SubApp.jsx]({{clientBase}}/src/js/app/components/SubApp.jsx)
                        *   [Tooltip.jsx]({{clientBase}}/src/js/app/components/Tooltip.jsx)
                        *   [TooltipSwitch.jsx]({{clientBase}}/src/js/app/components/TooltipSwitch.jsx)
                        *   [Window.jsx]({{clientBase}}/src/js/app/components/Window.jsx)
                        *   [WorkflowInfo.jsx]({{clientBase}}/src/js/app/components/WorkflowInfo.jsx)

                ??? abstract "dux"
                    See
                    [dux]({{clientBase}}/src/js/app/dux)
                    .

                    [Connectors (a.k.a. ducts/dux)](../Client/Dux.md)
                    between React components and the Redux state.

                    Plain ES6. Every duct handles a specific concern of the app.
                    All are structured with the following sections:
                    *actions*, *reducer*, *selectors*, *helpers*.

                    ???+ abstract "files"
                        *   [alter.js]({{clientBase}}/src/js/app/dux/alter.js)
                        *   [docs.js]({{clientBase}}/src/js/app/dux/docs.js)
                        *   [filters.js]({{clientBase}}/src/js/app/dux/filters.js)
                        *   [forms.js]({{clientBase}}/src/js/app/dux/forms.js)
                        *   [grid.js]({{clientBase}}/src/js/app/dux/grid.js)
                        *   [me.js]({{clientBase}}/src/js/app/dux/me.js)
                        *   [notes.js]({{clientBase}}/src/js/app/dux/notes.js)
                        *   [roots.js]({{clientBase}}/src/js/app/dux/roots.js)
                        *   [select.js]({{clientBase}}/src/js/app/dux/select.js)
                        *   [server.js]({{clientBase}}/src/js/app/dux/server.js)
                        *   [settings.js]({{clientBase}}/src/js/app/dux/settings.js)
                        *   [tables.js]({{clientBase}}/src/js/app/dux/tables.js)
                        *   [win.js]({{clientBase}}/src/js/app/dux/win.js)
                        *   [workflow.js]({{clientBase}}/src/js/app/dux/workflow.js)

                ??? abstract "tables"
                    See
                    [tables]({{clientBase}}/src/js/app/tables)
                    .

                    [Templates (in JSX)](../Client/Templates.md)
                    for custom formatting
                    [some tables](../Functionality/Tables.md)
                    .

                    ???+ abstract "files"
                        *   [assessment.jsx]({{clientBase}}/src/js/app/tables/assessment.jsx)
                        *   [contrib.jsx]({{clientBase}}/src/js/app/tables/contrib.jsx)
                        *   [criteriaEntry.jsx]({{clientBase}}/src/js/app/tables/criteriaEntry.jsx)
                        *   [review.jsx]({{clientBase}}/src/js/app/tables/review.jsx)
                        *   [reviewEntry.jsx]({{clientBase}}/src/js/app/tables/reviewEntry.jsx)

            ??? abstract "lib"
                See
                [lib]({{clientBase}}/src/js/lib)
                .

                ???+ abstract "files"
                    *   [datatypes.js]({{clientBase}}/src/js/lib/datatypes.js)
                    *   [details.js]({{clientBase}}/src/js/lib/details.js)
                    *   [edit.js]({{clientBase}}/src/js/lib/edit.js)
                    *   [europe.geo.js]({{clientBase}}/src/js/lib/europe.geo.js)
                    *   [fields.js]({{clientBase}}/src/js/lib/fields.js)
                    *   [handle.js]({{clientBase}}/src/js/lib/handle.js)
                    *   [memo.js]({{clientBase}}/src/js/lib/memo.js)
                    *   [templates.js]({{clientBase}}/src/js/lib/templates.js)
                    *   [utils.js]({{clientBase}}/src/js/lib/utils.js)
                    *   [values.js]({{clientBase}}/src/js/lib/values.js)

            ??? abstract "test"
                See
                [test]({{clientBase}}/src/js/test)
                .

                Test suites for mocha testing.

                ???+ abstract "files"
                    Not enumerated.

