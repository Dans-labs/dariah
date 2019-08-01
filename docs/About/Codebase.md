# Codebase

## Statistics

??? explanation "Legend"
    The numbers stand for lines of code. 1000 lines is ~ 20 typed A4 pages of text.

    The statistics have been gathered by the
    [cloc tool]({{cloc}})
    .

[Statistics](Stats.md)

## Formalisms

### YAML

See [YAML]({{yaml}}).

A simple plain-text way to convey structured data. What
[Markdown](#markdown)
is
to text, YAML is to XML-JSON. In this app we use YAML for configuration details.

??? details "Usage in this app"
    *   the conversion of legacy contribution data into MongoDB is steered by a
        [config.yaml]({{staticBase}}/tools/config.yaml)
        .
    *   the
        [data model](../Concepts/Model.md)
        lists all the tables and fields, including how they
        hang together and how we want to represent them on screen. It also defines
        access control. If you, as developer, need to add new tables and fields, you
        can do so by modifying these files:

        *   [model]({{modelBase}}/model.yaml)
        *   [per table]({{modelBase}}/tables)
            .
            No extra coding is needed.

### Markdown

See [Markdown]({{markdownDoc}}).

A simple plain-text way to write formatted text. See it as a shortcut to writing
HTML. It is handy for writing documentation without being distracted by too many
formatting options and issues, as you experience when writing in Word or plain
HTML.

??? details "General usage"
    Markdown is usually converted to HTML, but even when it is not converted, it is
    still very readable.

    If you use GitHub, one of the first things is to write a README file for your
    project. This must be a markdown file. If you use other documentation options on
    GitHub, such as Wiki or Pages, you will also write markdown.

    Markdown has a sister:
    [YAML](#yaml)
    ,
    which is used for structured data.

??? details "Usage in this app"
    *   all documentation here is written in markdown
    *   the app can present markdown
        [documents](../Client/Components.md#docmd)
    *   all big
        [text fields](../Client/Components.md#markdownarea)
        in this app support markdown.

### JavaScript

See [JavaScript]({{javascript}}).

The principal scripting language for web applications. It has evolved into a
performant language with a beautiful syntax, capable of running on the server
and in websites.

??? details "Usage in this app"
    This app uses JavaScript in the client only. We use it as a work horse which
    takes care of a copy of data from the database. It reacts to changes by
    integrating new bits of data into the existing state, a process that is called
    [reducing](../Technology/React.md#redux)
    .

### JSX

See [JSX]({{reactDocs}}/introducing-JSX.html).

This is also JavaScript, but with a thin layer of syntactic sugar, by which you
can present your code as a collection of
[React]({{reactDocs}})
[components]({{reactDocs}}/react-component.html)
.

??? details "Usage in this app"
    In this app we have dozens of JSX files, each containing exactly one component
    (with a few exceptions).
    [Components](../Client/Components.md)
    are pieces of code that
    realize parts of the website that you can actually see, and often interact with.

    They are supported by sophisticated
    [plumbing (dux, ducts)](../Client/Dux.md)
    ,
    which connects
    them to the global state of the app. The state is divided in sections, where
    individual duct connects such a section with several components. See
    [Architecture](../Concepts/Architecture.md)
    for how this hangs together.

    The plumbing needs some specialized, technical functions, which are collected in
    the
    [lib](../Client/Lib.md)
    section of the app. One of the most crucial is
    [memoization](../Client/Lib.md#memo)
    .

### Python

See [Python]({{pythondocs}}).

A general purpose scripting language with excellent data processing facilities.

??? details "Usage in this app"
    This app uses python (version 3.6.1+) for the web server. The web server itself
    is
    [Flask]({{flask}})
    ,
    a light-weight framework for handling http(s)
    requests.

    We have added a set of
    [controllers](../Server/Server.md)
    .
    The actual
    [code there]({{serverBase}}/controllers/controller.py)
    is quite lean, but
    when it comes to database access, the module
    [db]({{serverBase}}/controllers/db.py)
    does the heavy lifting and tends to
    become uglier and uglier.

### CSS

See [CSS]({{css}}).

Styling the app has nightmarish overtones, because the concerns of style often
cut right across the concerns of the components. There are several ways to
control the resulting mess, and one of the best is to use the modern features of
CSS.

??? details "General usage"
    Cascading style sheets are the ultimate way to paint the final look and feel of
    the website. By using
    [flex boxes]({{flexBox}})
    instead of tables we can
    make the app respond gracefully to changes in the size of the display without
    resorting to the bureaucracy of overdefining style properties. Note that our app
    does not use the HTML `<table>` element any more for aligning pieces of content.

??? details "Usage in this app"
    We use a lot of the CSS-3 features, including
    [variables]({{css}}/var)
    ,
    and
    [calc()]({{css}}/calc)
    .

    This lessens our need for a style sheet preprocessor such as
    [SASS]({{sassDoc}})
    to 0%.

    Note especially how colour management has become easy:

    1.  all colour definitions are in variables
    2.  all colour definitions are in
        [HSLA]({{hsl}})
        ,
        which allows a very
        consistent definition of families of colours. Quote from
        [Mozilla]({{css}}/color_value)
        :

    > One advantage of HSLA over RGB is that it is more intuitive: you can guess

          at the color you want, and tweak it from there. It is also easier to create
        a set of matching colors (e.g., by keeping the hue the same, while varying
        the lightness/darkness and saturation).

    This is exactly what we do. See
    [vars.css]({{cssBase}}/vars.css)
    .

### Shell

See [Shell]({{bash}}).

The shell is the interpreter of system level commands.

??? details "Usage in this app"
    Our app does not use it,
    but we use it to develop the app. All the development tasks, such as transpiling
    code, pushing code to GitHub, transporting databases to the production server
    are done by specialized frameworks. These frameworks must be steered by
    intricate commands with many options which are easily forgotten.

    That's why we have a
    [build]({{repBase}}/build.sh)
    script. You have to pass
    it just the name of a task, and the script executes that task with all the
    sophistication needed.

### HTML

See [HTML]({{html}}).

The core language of the web.

??? details "Usage in this app"
    Surprisingly, our code does not contain HTML any more. In
    [JSX](#JSX)
    there are fragments that look like HTML, but that is
    exactly what it is, and real HTML it is not.

    When the browser encounters HTML material, it parses it and stores it in its
    memory in a certain standard representation: the
    [DOM](../Technology/React.md#processing-concepts)
    .

    But our server does not send HTML any more to the browser, except for a very
    first
    [short page]({{serverBase}}/templates/index.html)
    ,
    that serves to load a
    bulk of style sheets and
    [JavaScript](#JavaScript)
    into the browser. This
    JavaScript code builds and manipulates the DOM directly, without generating any
    formal HTML.

### JSON

See [JSON]({{javascript}}/Global_Objects/JSON).

A format to serialize JavaScript objects.

??? details "General usage"
    In web applications, the program logic
    happens at two separate places (at least): the server and the client. It is
    important that data can flow seamlessly from one programming context to the
    other. JSON achieves that.

??? details "Usage in this app"
    *   to send data from server to client
    *   [configure]({{clientBase}}/webpack.config.js)
        the main development tools,
        such as
        [Webpack]({{webpack}})
        for building and
        [Mocha]({{mocha}})
        for testing.

## Keeping the code tidy

There are three progressive levels of caring for your code.

??? abstract "Level 1: code style"
    Adopt a style guide and meticulously keep to it.
    It is
    hard, especially if you work in two syntactically and culturally diverse
    languages such as JavaScript and Python. Add CSS, Markdown and YAML to the mix,
    and you can feel the need for a next step.

    Yet this is the fundamental step, it cannot be skipped.

??? abstract "Level 2: linters"
    Linters are little programs that observe your code
    and check it for correctness and style, as far as that is possible without
    actually running the code. Usually, your editing environment runs them sneakily
    while you type or when you save, and give you unobtrusive but conspicuous
    feedback. It saves you a lot of round trips of compiling/building/running/staring
    at errors. Moreover, it gives you the feedback right where you are typing, so
    you do not have to lookup files and line numbers.

    Sometimes linters give you so much feedback that your heart sinks at the thought
    of going through all those cases and fix them all, even if you have a splendid
    IDE.

    That is where the next step comes in.

??? abstract "Level 3: formatters"
    Formatters have a lot in common with linters, but
    they *fix* the problems. Sometimes they parse your program with the parser of the
    language and then format the abstract syntax three they've got. That is the end
    of all style inconsistencies.

??? details "Tools"
    Here is an overview of tools used in developing this app.

    ??? details "Formatters"
        Formatters are not perfect, sometimes they produce code at which the linter
        balks, especially *yapf* is doing that. Luckily, you can selectively suppress
        certain kinds of transformations.

        language | linter | formatter
        --- | --- | ---
        JavaScript | [eslint]({{eslint}}) | [prettier]({{prettier}})
        Python | [flake8]({{flake8}}) | [yapf]({{yapf}})
        Markdown |[remark]({{remark}}) | [prettier]({{prettier}}) [remark]({{remark}})

    ??? details "Editor or IDE?"
        For projects like these, you need a good editing environment.

        ??? details "IDEs"
            The good old ones like Eclipse are not really suited to the JavaScript
            and Python environments. There are interesting modern ones such as GitHub's
            [Atom]({{atom}})
            modernized ones such as Microsoft's
            [Visual Studio Code]({{vsc}})
            and commercial ones such as
            [Webstorm]({{webstorm}})
            .

        ??? details "Editors"
            You can also choose to work with a text editor, such as the free
            [Vim]({{vim}})
            or the commercial
            [Sublime Text]({{sublimeText}})
            .

    ??? details "Vim"
        My choice has been Vim, since I use it from its start in 1991. These are the key
        reasons for which Vim stands out:

        *   it has a compositional command set, like Unix itself. By this you get all your
            (massive) editing chores done without much remembering and thinking.
        *   it has a rich ecosystem of plugins. By this you can turn Vim into an IDE.
        *   It is rock solid and performant.
            You can edit many small files and then some big ones, at the
            same time. You do not loose data.

        ??? details "My Vim setup"
            Just for the record, here is a piece of my `.vimrc` file (the configuration
            file, which draws in plugins, and customises the interface).

            You can find out more about the plugins by clicking on them,
            they are all GitHub repos:

            ```vim
            call plug#begin()
            ```

            `Plug `['morhetz/gruvbox']({{githubBase}}/morhetz/gruvbox)

            `Plug `['fenetikm/falcon']({{githubBase}}/fenetikm/falcon)

            `Plug `['jelera/vim-javascript-syntax']({{githubBase}}/jelera/vim-javascript-syntax)

            `Plug `['pangloss/vim-javascript']({{githubBase}}/pangloss/vim-javascript)

            `Plug `['mxw/vim-jsx']({{githubBase}}/mxw/vim-jsx)

            `Plug `['hail2u/vim-css3-syntax']({{githubBase}}/hail2u/vim-css3-syntax)

            `Plug `['nathanaelkane/vim-indent-guides']({{githubBase}}/nathanaelkane/vim-indent-guides)

            `Plug `['othree/yajs.vim']({{githubBase}}/othree/yajs.vim)

            `Plug `['othree/javascript-libraries-syntax.vim']({{githubBase}}/othree/javascript-libraries-syntax.vim)

            `Plug `['scrooloose/nerdtree']({{githubBase}}/scrooloose/nerdtree)

            `Plug `['w0rp/ale']({{githubBase}}/w0rp/ale)

            ```vim
            call plug#end()
            ```

            An honourable mention for the
            [ALE]({{ale}})
            plugin. This is an asynchronous plugin
            that invokes linters for your files while you edit. The beauty is, that if you
            have installed the linters first outside Vim, ALE is smart enough to detect them
            and run them for you, asynchronously, and with zero configuration.
