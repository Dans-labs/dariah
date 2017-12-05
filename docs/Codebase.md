---
title: Codebase
---

# Statistics

[cloc tool]({{site.cloc}}) {% include_relative Stats.md %}

# Legend

The numbers stand for lines of code. 1000 lines is ~ 20 typed A4 pages of text.

## [YAML]({{site.yaml}})

A simple plain-text way to convey structured data. What [Markdown](#markdown) is
to text, YAML is to XML-JSON. In this app we use YAML for configuration details.

* the conversion of legacy contribution data into MongoDB is steered by a
	[config.yaml]({{site.staticBase}}/tools/config.yaml).
* the [data model](Model) lists all the tables and fields, including how they
	hang together and how we want to represent them on screen. It also defines
	access control. If you, as developer, need to add new tables and fields, you
	can do so by modifying these files: _
	[model]({{site.serverBase}}/models/model.yaml) _
	[per table]({{site.serverBase}}/models/tables). No extra coding is needed.

## [Markdown]({{site.markdownDoc}})

A simple plain-text way to write formatted text. See it as a shortcut to writing
HTML. It is handy for writing documentation without being distracted by too many
formatting options and issues, as you experience when writing in Word or plain
HTML.

Markdown is usually converted to HTML, but even when it is not converted, it is
still very readable.

If you use GitHub, one of the first things is to write a README file for your
project. This must be a markdown file. If you use other documentation options on
GitHub, such as Wiki or Pages, you will also write markdown.

Markdown has a sister: [YAML](#yaml), which is used for structured data.

In this app we use markdown in the following ways:

* all documentation here is written in markdown
* the app can present markdown [documents](Components#docmd)
* all big [text fields](Components#markdownarea) in this app support markdown.

## [JavaScript]({{site.javascript}})

The principal scripting language for web applications. It has evolved into a
performant language with a beautiful syntax, capable of running on the server
and in websites.

This app uses JavaScript in the client only. We use it as a work horse which
takes care of a copy of data from the database. It reacts to changes by
integrating new bits of data into the existing state, a process that is called
[reducing](React#redux).

## [JSX]({{site.reactDocs}}/introducing-JSX.html)

This is also JavaScript, but with a thin layer of syntactic sugar, by which you
can present your code as a collection of [React]({{site.reactDocs}})
[components]({{site.reactDocs}}/react-component.html).

In this app we have dozens of JSX files, each containing exactly one component
(with a few exceptions). [Components](Components) are pieces of code that
realize parts of the website that you can actually see, and often interact with.

They are supported by sophisticated [plumbing (dux, ducts)](Dux), which connects
them to the global state of the app. The state is divided in sections, where
individual duct connects such a section with several components. See
[Architecture](Architecture) for how this hangs together.

The plumbing needs some specialized, technical functions, which are collected in
the [lib](Lib) section of the app. One of the most crucial is
[memoization](Lib#memo).

## [Python]({{site.python}})

A general purpose scripting language with excellent data processing facilities.

This app uses python (version 3.6.1+) for the web server. The web server itself
is [Bottle]({{site.bottle}}), a light-weight framework for handling http(s)
requests.

We have added a set of [controllers](Server). The actual
[code there]({{site.serverBase}}/controllers/controller.py) is quite lean, but
when it comes to database access, the module
[db]({{site.serverBase}}/controllers/db.py) does the heavy lifting and tends to
become uglier and uglier.

## [CSS]({{site.css}})

Styling the app has nightmarish overtones, because the concerns of style often
cut right across the concerns of the components. There are several ways to
control the resulting mess, and one of the best is to use the modern features of
CSS.

Cascading style sheets are the ultimate way to paint the final look and feel of
the website. By using [flex boxes]({{site.flexBox}}) instead of tables we can
make the app respond gracefully to changes in the size of the display without
resorting to the bureaucracy of overdefining style properties. Note that our app
does not use the HTML `<table>` element any more for aligning pieces of content.

We use a lot of the CSS3 features, including [variables]({{site.css}}/var), and
[calc()]({{site.css}}/calc).

This lessens our need for a stylesheet preprocessor such as
[SASS]({{site.sassDoc}}) to 0%.

Note especially how colour management has become easy:

1. all colour definitions are in variables
2. all colour definitions are in [hsla]({{site.hsl}}), which allows a very
	consistent definition of families of colours. Quote from
	[Mozilla]({{site.css}}/color_value):

	> One advantage of HSL over RGB is that it is more intuitive: you can guess

	    at the color you want, and tweak it from there. It is also easier to create
		a set of matching colors (e.g., by keeping the hue the same, while varying
		the lightness/darkness and saturation).

	This is exactly what we do. See [vars.css]({{site.cssBase}}/vars.css).

## [Shell]({{site.bash}})

The shell is the interpreter of system level commands. Our app does not use it,
but we use it to develop the app. All the development tasks, such as transpiling
code, pushing code to GitHub, transporting databases to the production server
are done by specialized frameworks. These frameworks must be steered by
intricate commands with many options which are easily forgotten.

That's why we have a [build]({{site.repBase}}/build.sh) script. You have to pass
it just the name of a task, and the script executes that task with all the
sophistication needed.

## [HTML]({{site.html}})

The core language of the web. Surprisingly, our code does not contain HTML any
more. In [JSX](#JSX) there are fragments that look like HTML, but that is
exactly what it is, and real HTML it is not.

When the browser encounters HTML material, it parses it and stores it in its
memory in a certain standard representation: the [DOM](React#dom).

But our server does not send HTML any more to the browser, except for a very
first [short page]({{site.serverBase}}/views/index.tpl), that serves to load a
bulk of style sheets and [JavaScript](#JavaScript) into the browser. This
JavaScript code builds and manipulates the DOM directly, without generating any
formal HTML.

## [JSON]({{site.javascript}}/Global_Objects/JSON)

A format to serialize JavaScript objects. In web applications, the program logic
happens at two separate places (at least): the server and the client. It is
important that data can flow seamlessly from one programming context to the
other. JSON achieves that.

In our app, we use JSON:

* to send data from server to client
* [configure]({{site.clientBase}}/webpack.config.js) the main development tools,
	such as [Webpack]({{site.webpack}}) for building and [Mocha]({{site.mocha}})
	for testing.
