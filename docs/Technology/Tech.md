# Technical references

This is an alphabetical list of tech references. Sometimes we refer to a
technology without making use of it in the app, we have marked those entries
with an ✗.

## References

???+ abstract "Generic"
    *   [bash]({{bash}}) shell scripting
    *   [cloc]({{cloc}}) counting lines of code
    *   [geojson]({{geojson}}) geographical data in json format
    *   [leaflet]({{leaflet}}) geo-mapping library
    *   [iso8601]({{iso8601}}) date and time format

???+ abstract "Web design"
    *   [spa]({{spa}}) single page application:
    *   [webApi]({{webApi}}) interacting with the loaded document in a browser

    ???+ "Styling"
        *   [css](https://developer.mozilla.org/en-US/docs/Web/CSS) cascading stylesheets:
        *   [flexbox]({{flexbox}}) laying out boxes in flexible ways
        *   [✗ grid]({{grid}}) laying out boxes in a grid
        *   [hsl]({{hsl}}) color space
        *   [✗ sass]({{sassDoc}}) css preprocessor

    *   [html]({{html}}) markup language for the web

    ???+ "Shorthands"
        *   [markdown]({{markdownDoc}}) rich text from plain text
        *   [yaml]({{yaml}}) configuration language, as simple as markdown.

???+ abstract "Editing"
    *   [✗ IDE]({{ide}}) Integrated Developer's Environment
    *   [✗ Atom]({{atom}}) IDE by GitHub
    *   [✗ SublimeText]({{sublimeText}}) commercial text editor
    *   [vim]({{vim}}) old-hands text editor, still competes with IDEs
        *   [ALE]({{ale}}) runs linters and formatters within vim
    *   [✗ Visual Studio Code]({{vsc}}) IDE by Microsoft
    *   [✗ Webstorm]({{webstorm}}) commercial IDE

    ???+ abstract "Linters and formatters
        *   [remark]({{remark}}) linter and formatter for markdown
        *   [flake8]({{flake8}}) code linter for Python
        *   [yapf]({{yapf}}) code formatter for Python

???+ abstract "Client side"
    ???+ abstract "language"
        *   [javascript]({{javascript}}) scripting language for the web
        *   [babel]({{babel}}) compiles ES6 (modern Javascript) to older Javascript
            (understood by browsers)
        *   [es7cp]({{es7cp}}) static methods for classes
        *   [eslint]({{eslint}}) checks ES6 code against style requirements
        *   [prettier]({{prettier}}) code formatter for javascript

    ???+ abstract "libraries"
        *   [lodash]({{lodash}}) handy functions for dealing with collections
        *   [mocha]({{mocha}}) test framework

    ???+ abstract "tools"
        *   [node]({{node}}) run javascript outside browsers
        *   [npm]({{npm}}) package manager for javascript
        *   [webpack]({{webpack}}) build tool for javascript

    ???+ abstract "frameworks"
        *   [✗ mern]({{mern}}) mongo-express-react-node stack for web development
        *   [✗ meteor]({{meteor}}) full-stack javascript web framework
        *   [react]({{react}}) web framework for rendering in the browser
            *   [immutability]({{immutability}}) immutable data structures
            *   [autovivification]({{autovivification}}) creating sub-objects when
                needed
            *   [✗ select]({{reactSelect}}) select boxes in React
            *   [reselect]({{reactReselect}}) selecting data from the state
            *   [router]({{reactRouter}}) routing in React
                *   [tutorial]({{reactRouterTutorial}})
        *   [redux]({{redux}}) global state management in React and other frameworks
            *   [ducks]({{ducks}}) source code organization for redux apps
            *   [videos]({{reduxVideos}})
            *   [redux-form]({{reduxFormBase}}) user entry forms, processable in redux
            *   [react-redux]({{reactReduxRepo}}) bindings for redux in react

???+ abstract "Server side"
    *   [python]({{python}}) data-oriented scripting language
    *   [flask]({{flask}}) micro web framework
    *   [wsgi]({{wsgi}}) bridge between the python language and webservers
    *   [✗ socket]({{socket}}) push messages from server to all connected clients
        *   [✗ python-socket]({{socketPython}}) python wrapper for *socket.io*

???+ abstract "Database"
    *   [mongodb]({{mongodb}}) NO-SQL database, JSON/Javascript based

???+ abstract "Other"
    *   [✗ shebanq]({{shebanq}}) web interface for Hebrew text and linguistic
        annotations

