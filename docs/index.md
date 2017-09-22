---
title: Home
---

![logo](images/inkind_logo.png)

# [DARIAH contribution tool](https://dariah-beta.dans.knaw.nl)

This is the technical documentation for the
DARIAH contribution tool, an instrument to register and assess
community contributions to the [DARIAH](http://www.dariah.eu).

The contribution is an [SPA](https://en.wikipedia.org/wiki/Single-page_application)
(Single Page Application)
and hence the focus is on the client side, aka front-end of the app.

We have implemented the front-end with the help of
[React](https://facebook.github.io/react/) and [Redux](http://redux.js.org)
and followed the most recent and idiomatic practices to achieve our ends.

# Overview of this documentation

## [Workflow](Workflow)
This app is designed to handle a self-assessment and review workflow of
`contribution` descriptions.
This is a fairly sophisticated workflow. Read more by clicking on the heading of this section.

## The technology
Crash course in modern Javascript, [ES6](ES6) and [React+Redux](React).

## [API](API) and [Routing](Routing)
The data of the tool is accessible through an API.
The routing page tells more about how the tool reacts to urls.

## [Architecture](Architecture)
Read about division of labour, 
and how the dozens of React components are structured around a handful of slices of the *state*,
the single source of truth for the whole app when it lives in the browser.

## [Components](Components)
The user interface is realized by many React components.
In this section they are all documented, alphabetically.

But components hang together, work together, share data.
To see that picture, start with looking at the side bar, where the components have been grouped by 
... **duct** ... !

## [Dux](Dux)
There are ducts of information connecting the pieces of work that the individual components do.
I follow a [proposal by Erik Rasmussen](https://github.com/erikras/ducks-modular-redux)
to call a modular Redux package a duck, but with a twist: I call it a *duct*.
But in the plural I call them **dux**,
honouring the good work of Redux.

## [Server](server)
At the server side we store the data in a [MongoDB](https://docs.mongodb.com).
This data is served by a [Python-Bottle](http://bottlepy.org/docs/dev/) web framework.
The authentication of users is outsourced to the DARIAH infrastructure, see
[here](Dux#me). The authorization is defined by the [data model](Server#data-model) and
[permission model](Server#permission-model),
which govern all data access.

## [Tests](Tests)
Testing becomes a life saver when your app is growing in complexity.
When you add new behaviours you run the risk that existing behaviours break.
The remedy is to write tests for all aspects of the behaviours, and run them rigorously
after each change and refactoring.
That way, you proactively discover your bugs before your users do.

## [Initial Content](Content)
There are already 800 contributions in the system. 
They have been collected in a FileMaker database in the past.
We convert this content and use it for an initial filling of the contribution tool.
The legacy import is automated and repeatable, even into a database
that has been used in production for a while.
Click on the title of this section to read more about how difficult that is, and how we
partly solved it.

## [Deploy](Deploy)
Here are the bits and pieces you have to do in order to get a working system out of this.

## [Code base](Codebase)
To get an impression of the kind of work behind this app, we 
reveal how many lines of code have been written in which languages.

# Author

Dirk Roorda
[DANS](https://www.dans.knaw.nl)
[dirk.roorda@dans.knaw.nl](mailto:dirk.roorda@dans.knaw.nl)

2017-07-03
