---
title: Deployment
---

# Basic information

**source code** GitHub repository [Dans-labs/dariah](https://github.com/Dans-labs/dariah)

**tech doc** GitHub Pages [dans-labs.github.io/dariah](https://dans-labs.github.io/dariah/)

**server** [dariah-beta.dans.knaw.nl](https://dariah-beta.dans.knaw.nl)

**database** Mongodb via pymongo (no connection information needed)

# Web-app overview

For the *server* application code we use
[Bottle](http://bottlepy.org/docs/dev/index.html),
a Python3 micro framework to route urls to functions that perform requests and return responses.
It contains a development webserver.

The production webserver is **httpd (Apache)**. Bottle connects to it through
[mod_wsgi](https://modwsgi.readthedocs.io/en/develop/index.html)
(take care to use a version that speaks Python3).
This connection is defined in the default config file (for contents, see *default_example.conf* in the github repo):

- `/etc/httpd/config.d/`
  - `default.conf` (config for this site)
  - `shib.conf` (config for shibboleth authentication)
  - ...

The *client* code is done in 
[React](https://facebook.github.io/react/)
using the
[JSX](https://facebook.github.io/react/docs/introducing-jsx.html)
idiom.
We have added
[Redux](http://redux.js.org)
to the mix and various other libraries, obtained through 
[npm](https://www.npmjs.com).
Everything is glued together by means of modern Javascript:
[ES6 = ES2015](https://babeljs.io/docs/learn-es2015/).
The build tool is
[Webpack](https://webpack.js.org).
All hand written code is monitored syntactically and stylistically by [eslint](http://eslint.org).

We make use of the DARIAH infrastructure for *user authentication* 
[AAI](https://wiki.de.dariah.eu/display/publicde/DARIAH+AAI+Documentation)
(see in particular
[/Integrating Shibboleth Authentication into your Application](https://wiki.de.dariah.eu/display/publicde/Integrating+Shibboleth+Authentication+into+your+Application)

The app itself gives access to *documentation*, not only for end users, but also for developers and designers.

# File structure

The absolute location is not important. Here we assume everything resides in `/opt`.

- `/opt`
  - `shibboleth`
  - `web-apps`
    - `dariah`
      - `README.md` short description for humans
      - `build.sh` script for build/development tasks, the options are documented inside, or run it without arguments for help
      - `server`
        - `controllers` routes and controllers
          - `index.py` entry point
          - `db.py` json data from mongodb
          - `file.py` json data from file system
          - `auth.py` handle the login process
          - `user.py` handle the user data
          - `perm.py` permission control
        - `models` yaml files and python files generated on the basis of the yaml files
          - `data.yaml` the data model
          - `permission.yaml` the permissions model
        - `views` html templates
          - `index.tpl` the html template of the single page
        - `serve.py` wsgi entry-point for apache
        - `confyg.py` converts yaml model files into python modules
        - `config`
          - `requirements.txt` the list of python packages needed; to be installed with `pip3`
          - `default_example.conf` example config file for Apache httpd server
      - `static` (static files, css, javascript, fonts, etc)
        - `css` fixed stylesheets
        - `dist` javascript and css built from `client/src`
        - `favicons`
        - `images`
        - `fonts`
        - `docs`
          - `design.pdf` notes on the design of this web app
          - `about.md` "about" text of the contribution tool
        - `tools` These files are not active in the web scenarios, except for documentation. 
            They are helpers to prepare the data for the app.
          - `update.sh` script to deploy updates of the web app. Pulls code from the github repo, restarts httpd.
          - `from_filemaker.ipynb` Jupyter notebook for legacy data conversion
          - `mongoFromFm.py` Stand-alone definitive data conversion from FileMaker original to MongoDb
          - `dump.sh` dump the mongodb as set of bson files
          - `load.sh` load a set of *.bson* files into mongodb
          - `compose_countries` tool to tweak a map of European countries, 
            result in `/client/src/js/lib/europe.geo.js`
      - `client`
        - `node_modules` javascript dependencies
        - `package.json` npm config file
        - `webpack.config.js` config file for webpack, the build tool
        - `index.html` soft link to ../server/views/index.tpl, the entry html that holds the whole app
        - `src`
          - `css`
            - `*.scss`, `*.css` (plain CSS and SASS stylesheets)				
          - `js`
            - `app`
              - `dux` connectors between React components and the Redux state. Plain ES6.
                Every duct handles a specific concern of the app.
                All contain the following sections: *actions*, *reducer*, *selectors*, *helpers*.
              - `components`: React components in `*.jsx` files.
              - `main.jsx` client-side entry-point for the javascript
            - `lib`
              - `*.js` client-side code and data in ES6

# Technology
## Server
### Installation

We assume httpd (Apache) is already installed, and Mongodb likewise.

Python can be installed by means of the package manager.

    yum install rh-python35 rh-python35-python-pymongo rh-python35-mod_wsgi
    scl enable rh-python35 bash
    cp /opt/rh/httpd24/root/usr/lib64/httpd/modules/mod_rh-python35-wsgi.so modules
    cd /etc/httpd
    cp /opt/rh/httpd24/root/etc/httpd/conf.modules.d/10-rh-python35-wsgi.conf conf.modules.d/
    pip install bottle beaker

On a development server, install `python3`.*x*`.`*y* from its
[download page](https://www.python.org/downloads/).
Then install additional modules by means of `pip3`:

    pip3 install pymongo bottle beaker jwt

More info about running python3 in the webserver
[mod_wsgi guide](https://modwsgi.readthedocs.io/en/develop/user-guides/quick-installation-guide.html).

The website runs with SELinux enforced, and also the updating process works.

The server framework is
[Bottle](http://bottlepy.org/docs/dev/index.html),

We use the following plugins

- [beaker](http://beaker.readthedocs.io/en/latest/)
  for session middleware

The code for the server is basically a mapping between routes (url patterns) and functions (request => response transformers).
The app source code for the server resides in `app.py` and other `.py` files imported by it.
The module `app.py` defines routes and associates functions to be executed for those routes.
These functions take a request, and turn it into a response.
This file imports a few more specialized controllers:

- `data.py` they query the mongodb and return json data
- `login.py` handle all login activity

The server needs a secret key, we store it in a fixed place.
Here is the command to generate and store the key.

    cd /opt/web-apps
    date +%s | sha256sum | base64 | head -c 32 > dariah_jwt.secret

On the mac you have to say

    date +%s | shasum -a 256 | base64 | head -c 32 > dariah_jwt.secret


## Running

In development, **bottle** runs its own little webserver, in production it is connected to Apache through **wsgi**.
You can run the development server by saying, in the `server` directory

    ./serve.sh

which starts a small webserver that listens to localhost on port 8001.
Whenever you save a python source file, the server reloads itself.

## Client
### Installation
This is only needed on machines where you want to develop the client application.
If you merely want to run the app, this is not needed.

Install **nodejs** from its
[download page](https://nodejs.org/en/download/).
Then install all javascript dependencies in one go by executing

    cd /path/to/dariah/client
    npm install

### Building
The JSX and ES6 of client components and helpers will be bundled with other javascript sources from `node_modules`. 
The result ends up in `static/dist`.
Javascript from other sources, such as
[leaflet](http://leafletjs.com),
resides in `static/js` and will be included directly by the main html file `index.html`.

The build tool is **webpack**.
You can perform builds, by saying, in the `client` directory

    webpack 

or

    webpack-dev-server

or

    webpack -p 

The first one produces a development build.

The second one starts op a development server, and produces an incremental development build on every saved change\
in the source code, with hot-reloading of react modules.

The third one provides a minified production build.

#### build.sh
We have collected all routine tasks for building and updating the app and its data into
a [build script]({{server.repBase}}/build.sh).
See the code for an overview of what it can do, or run

```
./build.sh
```

(without arguments).

