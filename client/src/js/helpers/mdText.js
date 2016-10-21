export default  {
    about: `
![logo](/static/images/inkind_logo.png)

# What is the DARIAH contribution tool?

This is a [system](/contrib) to assess the tools that have been contributed to the DARIAH infrastructure by its national members.
These tools constitute the in-kind contributions of the member states to the European DARIAH ERIC.
The purpose of the assessment is to establish the quality and value of the contributed tools.
It is important to know how much effort has gone into the creation, maintenance and delivery of the tool.
But also the satisfaction of the parties that use the tool are an important indicator of the value of the tool.

# Browse Contributions

The first step is to know what contributions are there, to oversee the landscape of contributions.

# Enter assessments

If you have contributed a tool, you start with writing a self-assessment.
This application will guide you through the relevant questions, depending on the type of your contribution.

# Review assessments
If you are a national coordinator or a delegate, you can review assessments, and add comments, and ultimately, assign a level.

# Engage in data analysis
This tool will contain valuable information for policy makers in science and education.
Here are your opportunities to mine that information, analyse it and visualize it.

# Contact
Mail: [dirk.roorda@dans.knaw.nl](mailto:dirk.roorda@dans.knaw.nl)

`,
    deploy: `
# DARIAH Contrib Tool - Deployment

2016-10-18 Dirk Roorda

# Basic information

**server ip** tclarin11.dans.knaw.nl

**url** dariah-beta.dans.knaw.nl

**database** Mongodb via pymongo (no connection information needed)

# Web-app
We use
[Bottle](http://bottlepy.org/docs/dev/index.html),
a Python3 micro framework to route urls to functions that perform requests and return responses.
The webserver is **httpd (Apache)**. Bottle connects to it through
[mod_wsgi](https://modwsgi.readthedocs.io/en/develop/index.html)
(take care to use a version that speaks Python3).
See Prerequisites below.

The connection is defined in the default config file (for contents, see *default_example.conf* in the github repo):

- \`/etc/httpd/config.d/\`
  - \`default.conf\` (config for this site)
  - \`shib.conf\` (config for shibboleth authentication)
  - ...

# File structure
The absolute location is not important. Here we assume everything resides in \`/opt\`.

- \`/opt\`
  - \`shibboleth\`
  - \`web-apps\`
    - \`dariah\`
      - \`server\`
        - \`controllers\` routes and controllers
          - \`app.py\` entry point
          - \`data.py\` json data from mongodb
          - \`login.py\` handle user data and the login process
        - \`serve.py\` wsgi entry-point for apache
        - \`serve.sh\` local development server
        - \`config\`
          - \`requirements.txt\` the list of python packages needed; to be installed with \`pip3\`
          - \`default_example.conf\` example config file for Apache httpd server
      - \`static\` (static files, css, javascript, fonts, etc)
        - \`css\` stylesheets built from \`client/src/css\`
        - \`js\` javascript built from \`client/src/js\`
        - \`favicons\`
        - \`images\`
        - \`fonts\`
        - \`docs\`
          - \`deploy.pdf\` notes on deploying this web app
        - \`tools\` These files are not active in the web scenarios, except for documentation. 
            They are helpers to prepare the data for the app.
          - \`update.sh\` script to deploy updates of the web app. Pulls code from the github repo, restarts httpd.
          - \`from_filemaker.ipynb\` Jupyter notebook for legacy data conversion
          - \`dump.sh\` dump the mongodb as set of bson files
          - \`load.sh\` load a set of *.bson* files into mongodb
          - \`compose_countries\` tool to tweak a map of European countries, 
            result in \`/client/src/js/helpers/europe.geo.js\`
      - \`client\`
        - \`node_modules\` javascript dependencies
        - \`package.json\` npm config file
        - \`README.md\` short description for humans
        - \`gulpfile.babel.js\` config file for gulp, the build tool
        - \`gulp_dev.sh\` script for development builds
        - \`gulp_prod.sh\` script for production builds
        - \`index.html\` html entry-point for the client side app
        - \`src\`
          - \`css\`
            - \`*.scss\`, \`*.css\` (plain CSS and SASS stylesheets)				
          - \`js\`
            - \`components\`
              - \`*.jsx\` client-side code in JSX
            - \`helpers\`
              - \`*.js\` client-side code and data in ES6
            - \`main.jsx\` client-side entry-point for the javascript
          - \`css\`				

# Prerequisites for the server
We assume httpd (Apache) is already installed, and Mongodb likewise.

Python can be installed by means of the package manager.

    yum install python34

On a strict system, like SELinux, you can install Python3 and the extra modules needed by means of \`yum install\` ...
However, some of these modules end up in the Python2 framework, so I had to use \`pip3\`.
On a strict system, you have to build \`pip3\` first! On SELinux, this worked

    sudo yum install python34-setuptools
    sudo easy_install-3.4 pip

Then you can say

    sudo pip3 install pymongo bson bottle beaker bottle-cork

In order to run python3 in the webserver, I followed the
[mod_wsgi guide](https://modwsgi.readthedocs.io/en/develop/user-guides/quick-installation-guide.html).
As preliminaries I had to install devel versions of apache and python3 first:

    yum install httpd-devel
    yum install python34-devel

Then I downloaded the
[mod_wsgi source code](https://github.com/GrahamDumpleton/mod_wsgi/releases)
(version 4.5.7),
untarred it, and configured it with whatever python3 I found on the path.

    cd mod_wsgi-4.5.7
    ./configure --with-python=/bin/python3

Then

    make
    sudo make install

After this, httpd works with python3.
The website runs with SELinux enforced, and also the updating process works.

# Develop environment prerequisites
## Client and Javascript
### Installation

Install **nodejs** from its
[download page](https://nodejs.org/en/download/).
Then install all javascript dependencies in one go by executing

    cd /path/to/dariah/client
    npm install

### Building
The JSX and ES6 of client components and helpers will be bundled with other javascript sources from \`node_modules\`. 
Javascript from other sources, such as
[leaflet](http://leafletjs.com),
resides in \`static/js\` and will be included directly by the main html file \`index.html\`.

The build tool is **gulp**.
You can perform builds, by saying, in the \`client\` directory

    ./gulp_dev.sh

or

    ./gulp_prod.sh

It will browserify the javascript, apply babel transformations from ES6 and JSX to browser compatibele Javascript.
It will bundle, minify, and provide source maps.
I have configured two tasks: for developent and for production.
The development task skips minification, and continues to watch for changes
so that when you work, builds will happen whenever you save source files.
The production task runs once, and does perform minification.

### Running
The client application is a
[React](https://facebook.github.io/react/)
component. The source code is in \`client/src\`.
It is a set of components in JSX, (a react enhancement of Javascript), and the javascript itself is ES6.
There are also a few auxiliary functions in helpers, all in plain ES6.
Most of the styling is defined in the JSX, but there are a few CSS style files, either in SASS, or in plain CSS.
For example, we use the open source mapping library
[leaflet](http://leafletjs.com),
which comes with a plain style file.

## Server and Python
### Installation

Install \`python3\`.*x*\`.\`*y* from its
[download page](https://www.python.org/downloads/).
Then install additional modules by means of \`pip3\`:

    pip3 install pymongo bson bottle

## Serving
The server is **bottle**.

We use the following plugins

- [beaker](http://beaker.readthedocs.io/en/latest/)
  for session middleware

- [bottle-cork](http://cork.firelet.net)
  [github](https://github.com/FedericoCeratto/bottle-cork)
  for authentication

The code for the server is basically a mapping between routes (url patterns) and functions (request => response transformers).
The app source code for the server resides in \`app.py\` and other \`.py\` files imported by it.
The module \`app.py\` defines routes and associates functions to be executed for those routes.
These functions take a request, and turn it into a response.
This file imports a few more specialized controllers:

- \`data.py\` they query the mongodb and return json data
- \'login.py\` handle all login activity

In development, **bottle** runs its own little webserver, in production it is connected to Apache through **wsgi**.
You can run the development server by saying, in the \`server\` directory

    ./serve.sh

which starts a small webserver that listens to localhost on port 8001.
Whenever you save a python source file, the server reloads itself.
`,
}
