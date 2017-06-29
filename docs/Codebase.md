---
title: Codebase
---

# Statistics

{% include_relative Stats.md %}

# Legend

## [YAML](http://www.yaml.org)

A simple plain-text way to convey structured data.
What [Markdown](#markdown) is to text, YAML is to XML-JSON.
In this app we use YAML for configuration details.

* the conversion of legacy contribution data into MongoDB is steered by a 
  [config.yaml]({{site.repBase}}/static/tools/config.yaml).
* the [data model]({{site.repBase}}/server/models/data.yaml) lists all the tables
  and fields, including how they hang together and how we want to represent them on screen.
  If you, as developer, need to add new tables and fields, you can do so by modifying this
  file. No extra coding is needed.
* the [permissions]({{site.repBase}}/server/models/permissions.yaml) define a system of
  access control. There are groups, levels, actions, tables and fields. This config file
  utterly defines who may do what operations on which data.

## [Markdown](https://guides.github.com/features/mastering-markdown/)

A simple plain-text way to write formatted text.
See it as a shortcut to writing HTML.
It is handy for writing documentation without being distracted by too many
formatting options and issues, as you experience when writing in Word or plain HTML.

Markdown is usually converted to HTML, but even when it is not converted, it is still
very readable.

If you use Github, one of the first things is to write a README file for your project.
This must be a markdown file.
If you use other documentation options on Github, such as Wiki or Pages, you will also
write markdown.

Markdown has a sister: [YAML](#yaml), which is used for structured data.

In this app we use markdown in the following ways:

* all documentation here is written in markdown
* the app can present markdown [documents](Components#docmd)
* all big [text fields](Components#markdownarea) in this app support markdown.

## [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

The principal scripting language for web applications.
It has evolved into a performant language with a beautiful syntax, capable
of running on the server and in websites.

This app uses javascript in the client only.
We use it as a work horse which takes care of a copy of data from the database.
It reacts to changes by integrating new bits of data into the existing state,
a process that is called [reducing](Dux).

## [JSX](https://facebook.github.io/react/docs/introducing-jsx.html)

This is also Javascript, but with a thin layer of syntactic sugar, by which you
can present your code as a collection of [React](https://facebook.github.io/react/)
[components](https://facebook.github.io/react/docs/react-component.html).

In this app we have dozens of jsx files, each containing exactly one component
(with a few exceptions).
[Components](Components) are pieces of code that realize parts of the website
that you can actually see, and often interact with.

They are supported by sophisticated [plumbing (dux, ducts)](Dux),
which connects them to the global
state of the app.
The state is divided in sections, where individual duct connects such a section
with several components. See [Architecture](Architecture) for how this hangs together.

The plumbing needs some specialized, technical functions, which are collected in the
[lib](Lib) section of the app.
One of the most crucial is [memoization](Lib#memo).

## [Python](https://docs.python.org/3/)

A general purpose scripting language with excellent data processing facilities.

This app uses python (version 3.6.1+) for the webserver. The webserver itself
is [Bottle](http://bottlepy.org/docs/dev/),
a light-weight framework for handling
http(s) requests.

We have added a set of [controllers](Server).
The actual [code there]({{site.serverBase}}/controllers/controller.py) is quite lean,
but when it comes to database access, the module
[db]({{site.serverBase}}/controllers/db.py) does the heavy lifting and tends
to become uglier and uglier.

## [SASS](http://sass-lang.com)

This is syntactic sugar on top of [CSS](#css).
Styling the app has nigthmarish overtones, because the concerns of style often cut
right across the concerns of the components.
There are several ways to control the resulting mess, and one of the best is to use
the modern features of CSS.

Another way is to embed pieces of styling in your [JSX](#jsx) components.

And finally, you can extract common color and size properties in handy functions that compute
them from parameters.
For this we use SASS, but we do it half-heartedly.

## [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

Cascading stylesheets are the ultimate way to paint the final look and feel of the website.
By using [flex boxes](http://sass-lang.com) instead of tables we can make
the app respond gracefully to changes in the size of the display without
resorting to the bureaucracy of overdefining style properties.
Note that our app does not use the HTML `<table>` element anymore for aligning pieces of content.

## [Shell](https://www.gnu.org/software/bash/)

The shell is the interpreter of system level commands. 
Our app does not use it, but we use it to develop the app.
All the development tasks, such as transpiling code, pushing code to github, transporting
databases to the production server are done by specialized frameworks.
These frameworks must be steered by intricate commands mith many options which are
easily forgotten.

That's why we have a [build]({{site.repBase}}/build.sh) script.
You have to pass it just the name of a task, and the script executes that task with all the
sophistication needed.

## [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)

The core language of the web.
Surprisingly, our code does not contain HTML anymore.
In [JSX](#jsx) there are fragments that look like HTML, but that is exactly what it is, and
real HTML it is not.

When the browser encounters HTML material, it parses it and stores it in its memory in a certain
standard representation: the [DOM](React#dom).

But our server does not send HTML anymore to the browser, except for a very first
[short page]({{site.serverBase}}/views/index.tpl),
that serves to load a bulk of stylesheets and [javascript](#javascript) into the browser.
This javascript code builds and manipulates the DOM directly, without generating any formal HTML.

## [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

A format to serialize javascript objects.
In web applications, the program logic happens at two separate places (at least):
the server and the client. 
It is important that data can flow seamlessly from one programming context to the other.
JSON achieves that.

In our app, we use JSON:

* to send data from server to client
* [configure]({{site.clientBase}}/webpack.config.js) the main development tools, such as
  [Webpack](https://webpack.js.org/concepts/) for building and [Mocha](https://mochajs.org) for testing.
 
