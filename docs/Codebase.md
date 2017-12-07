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
  can do so by modifying these files:

  * [model]({{site.serverBase}}/models/model.yaml)
  * [per table]({{site.serverBase}}/models/tables).
    No extra coding is needed.

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
1. all colour definitions are in [hsla]({{site.hsl}}), which allows a very
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

# Keeping the code tidy

There are three progressive levels of caring for your code.

**Level 1** is adopting a style guide and meticulously keeping to it.
It is hard, especially if you work in two syntactically and culturally diverse
languages such as Javascript and Python. Add CSS, Markdown and YAML to the mix,
and you can feel the need for a next step.

Yet this is the fundamental step, it cannot be skipped.

**Level 2** is using *linters*.
They are little programs that observe your code and check it for correctness
and style, as far as that is possible without actually running the code.
Usually, your editing environment runs them sneakily while you type or
when you save, and give you unobtrusive but conspicuous feedback.
It saves you a lot of roundtrips of compiling/building/running/staring at errors.
Moreover, it gives you the feedback right where you are typing, so you do not have to
lookup files and line numbers.

Sometimes linters give you so much feedback that your heart sinks at the
thought of going through all those cases and fix them all,
even if you have a splendid IDE.

That is where the next step comes in.

**Level 3** is using *formatters*.
They have a lot in common with linters, but they fix the problems.
Sometimes they parse your program with the parser of the language and
then format the abstract syntax three they've got.
That is the end of all style inconsistencies.

## Tools

ForJavascript we use [eslint]({{site.eslint}}) as linter,
and [prettier]({{site.prettier}}) as formatter.

For Python we use [flake8]({{site.flake8}}) as linter,
and [yapf]({{site.yapf}}) as formatter.

Formatters are not perfect, sometimes they produce
code at which the linter balks, especially *yapf* is doing that.
Luckily, you can selectively suppress certain kinds of transformations.

## Editor or IDE?

For projects like these, you need a good editing environment.
IDEs can give you that, but the good old ones like Eclipse
are not really suited to the Javascript and Python environments.
There are interesting modern ones such as 
GitHub's [Atom]({{site.atom}})
modernized ones such as
Microsoft's [Visual Studio Code]({{site.vsc}})
and commercial ones such as [Webstorm]({{site.webstorm}}).

You can also choose to work with a text editor,
such as the free [Vim]({{site.vim}})
or the commercial [Sublime Text]({{site.sublimeText}}).

My choice has been Vim, since I use it from its start in 1991.
These are the key reasons for which Vim stands out:
* it has a compositional command set, like Unix itself.
  By this you get all your (massive) editing chores done.
* it has a rich ecosystem of plugins.
  By this you can turn Vim into an IDE.
* It is rock solid. 
  You can edit many small files and then some big ones, at the same time.
  You do not loose data.

Just for the record, here is a piece of my `.vimrc` file (the
configuration file, which draws in plugins, and customises the interface).

You can find out more about the plugins by visiting 
[github]({{site.githubBase}}) and append the full plugin
reference to the url, since they are all GitHub repos.

```vim
  call plug#begin()
  Plug 'bennyyip/vim-yapf'
  Plug 'jelera/vim-javascript-syntax'
  Plug 'pangloss/vim-javascript'
  Plug 'mxw/vim-jsx'
  Plug 'hail2u/vim-css3-syntax'
  Plug 'kien/ctrlp.vim'
  Plug 'nathanaelkane/vim-indent-guides'
  Plug 'othree/yajs.vim'
  Plug 'othree/javascript-libraries-syntax.vim'
  Plug 'prettier/vim-prettier', {
    \ 'do': 'npm install',
    \ 'for': ['javascript', 'css', 'json' ] }
  Plug 'scrooloose/nerdtree'
  Plug 'w0rp/ale'
  call plug#end()
```

An honourable mention for the [ALE]({{site.ale}}) plugin.
This is an arch plugin that invokes linters for your files while you edit.
The beauty is, that if you have installed the linters first outside Vim,
ALE is smart enough to detect them and run them for you,
asynchronously, and with zero configuration.
