# Home

![logo](images/inkind_logo.png)

[DARIAH contribution tool]({{liveBase}})

This is the documentation for the DARIAH contribution tool, an instrument to
register and assess community contributions to the
[DARIAH]({{dariah}})
.

The documentation contains parts that range from *functional*, *conceptual*,
*technical* to *mundane*.

## About

??? abstract "Code base"
    To get an impression of the kind of work behind this app, we reveal how many
    lines of code have been written in which languages. See also how we managed to
    keep the code in all those languages tidy.
    [More ...](About/Codebase.md)

??? abstract "Lessons learned"
    It has taken a lot of time to develop this app. Lots more than I expected from
    the start.
    [More ...](About/Lessons.md)

??? abstract "News"
    Every now and then I resume what has happened during development. It is not
    regular and not comprehensive!
    [More ...](About/News.md)

## Functionality

??? note "Slides"
    For an impression of the intended functions of this app, see these
    [slides](assets/Functions.pptx)
    which I made near the end of the project (2017-12-14).

??? abstract "Business logic"
    The actual handling of contributions, assessments and reviews is the business
    logic of this app.
    [More ...](Functionality/Business.md)

??? abstract "Workflow"
    At the highest level of abstraction a workflow engine implements the business
    logic.
    [More ...](Functionality/Workflow.md)

??? abstract "Tables"
    Several tables work together with the workflow engine.
    [More ...](Functionality/Tables.md)

## Legacy data

??? abstract "Content"
    This app inherits 800 contributions that have been entered in 2015-2017 into a
    FileMaker database. We have migrated those to a MongoDB model.
    [More ...](Legacy/Content.md)

## Concepts

??? abstract "Model"
    The whole app is centered around data: contributions, assessments, reviews and
    more. We have to organize and specify that data.
    [More ...](Concepts/Model.md)

??? abstract "Architecture"
    This is a complex app. We need a lot of structure to get every bit of data there
    where it is needed. On time.
    [More ...](Concepts/Architecture.md)

??? abstract "Routing"
    This is a *web* app. We need to divide labour between client and server, and
    define a routing scheme that steers the app by URLs.
    [More ...](Concepts/Routing.md)

## Server

??? abstract "Server"
    The part of the app that guards the data sits at the server. From there it sends
    it to the web browsers (clients) of the users.
    [More ...](Server/Server.md)

??? abstract "Authentication"
    Users are authenticated at the server, and every bit of data that they
    subsequently receive, has passed a customs control.
    [More ...](Server/Authentication.md)

## Client

??? abstract "Components"
    The client (web browser) is where the app speaks to the user. The user interface
    is built up from dozens of components, that mediate between the user and the
    server.
    [More ...](Client/Components.md)

??? abstract "Dux"
    The client collects the actions of the user and the data from the server into an
    internal state, from which it flows back to the components.
    [More ...](Client/Dux.md)

??? abstract "Templates"
    Those tables receive custom formatting through a very dynamic templating system.
    [More ...](Client/Templates.md)

??? abstract "Lib"
    We have developed quite a bit of library functions to assist our components.
    [More ...](Client/Lib.md)

## Technology

??? abstract "ES6"
    We have implemented the client application in ES6, i.e. modern Javascript. That
    is our glue language.
    [More ...](Technology/ES6.md)

??? abstract "React"
    Our components are written in React, a framework that defines a syntactic sugar
    right within ES6.
    [More ...](Technology/React.md)

??? abstract "Tech index"
    We have listed most of the technology that we have made use of.
    [More ...](Technology/Tech.md)

## Integration

??? abstract "API"
    The data of the tool is accessible through an API. In fact, this app itself uses
    that API, whenever the client needs data from the server.
    [More ...](Integration/API.md)

## Maintenance

??? abstract "Deploy"
    Here are the bits and pieces you have to do in order to get a working system out
    of this.
    [More ...](Maintenance/Deploy.md)

??? abstract "Tests"
    Testing becomes a life saver when your app is growing in complexity. When you
    add new behaviours you run the risk that existing behaviours break. The remedy
    is to write tests for all aspects of the behaviours, and run them rigorously
    after each change and refactoring. That way, you proactively discover your bugs
    before your users do.
    [More ...](Maintenance/Tests.md)

## Author

Dirk Roorda
[DANS]({{dans}})
<mailto:dirk.roorda@dans.knaw.nl>

*   2019-08-06
*   2019-07-29
*   2019-03-04
*   2017-12-14
