# Home

![logo](images/inkind_logo.png)

[DARIAH contribution tool]({{liveBase}})

This is the documentation for the DARIAH contribution tool, an instrument to
register and assess community contributions to the [DARIAH]({{dariah}}).

The documentation contains parts that range from *functional*, *conceptual*,
*technical* to *mundane*.

* **About**
    * [Code base](About/Codebase.md)
      To get an impression of the kind of work behind this app, we reveal how many
      lines of code have been written in which languages. See also how we managed to
      keep the code in all those languages tidy.
    * [Lessons learned](About/Lessons.md)
      It has taken a lot of time to develop this app. Lots more than I expected from
      the start.
    * [News](About/News.md)
      Every now and then I resume what has happened during development. It is not
      regular and not comprehensive!
* **Functionality**
      For a vivid impression of the intended functions of this app, see these
      [slides](assets/Functions.pptx) which I made near the end of the project (2017-12-14).
    * [Business logic](Functionality/Business.md)
      The actual handling of contributions, assessments and reviews is the business
      logic of this app.
    * [Workflow](Functionality/Workflow.md)
      At the highest level of abstraction a workflow engine implements the business
      logic.
    * [Tables](Functionality/Tables.md)
      Several tables work together with the workflow engine.
    * [Templates](Functionality/Templates.md)
      Those tables receive custom formatting through a very dynamic templating system.
* **Legacy**
    * [Content](Legacy/Content.md)
      This app inherits 800 contributions that have been entered in 2015-2017 into a
      FileMaker database. We have migrated those to a MongoDB model.
* **Concepts**
    * [Model](Concepts/Model.md)
      The whole app is centered around data: contributions, assessments, reviews and
      more. We have to organize and specify that data.
    * [Architecture](Concepts/Architecture.md)
      This is a complex app. We need a lot of structure to get every bit of data there
      where it is needed. On time.
    * [Routing](Concepts/Routing.md)
      This is a *web* app. We need to divide labour between client and server, and
      define a routing scheme that steers the app by URLs.
* **Server**
    * [Server](Server/Server.md)
      The part of the app that guards the data sits at the server. From there it sends
      it to the web browsers (clients) of the users.
    * [Authentication](Server/Authentication.md)
      Users are authenticated at the server, and every bit of data that they
      subsequently receive, has passed a customs control.
* **Client**
    * [Components](Client/Components.md)
      The client (web browser) is where the app speaks to the user. The user interface
      is built up from dozens of components, that mediate between the user and the
      server.
    * [Dux](Client/Dux.md)
      The client collects the actions of the user and the data from the server into an
      internal state, from which it flows back to the components.
    * [Lib](Client/Lib.md)
      We have developed quite a bit of library functions to assist our components.
* **Technology**
    * [ES6](Technology/ES6.md)
      We have implemented the client application in ES6, i.e. modern Javascript. That
      is our glue language.
    * [React](Technology/React.md)
      Our components are written in React, a framework that defines a syntactic sugar
      right within ES6.
    * [Tech index](Technology/Tech.md)
      We have listed most of the technology that we have made use of.
* **Integration**
    * [API](Integration/API.md)
      The data of the tool is accessible through an API. In fact, this app itself uses
      that API, whenever the client needs data from the server.
* **Maintenance**
    * [Deploy](Maintenance/Deploy.md)
      Here are the bits and pieces you have to do in order to get a working system out
      of this.
    * [Tests](Maintenance/Tests.md)
      Testing becomes a life saver when your app is growing in complexity. When you
      add new behaviours you run the risk that existing behaviours break. The remedy
      is to write tests for all aspects of the behaviours, and run them rigorously
      after each change and refactoring. That way, you proactively discover your bugs
      before your users do.
* **Author**
      Dirk Roorda [DANS]({{dans}}) <mailto:dirk.roorda@dans.knaw.nl>
      * 2019-03-04
      * 2017-12-14
