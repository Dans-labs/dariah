---
title: Home
---

![logo](images/inkind_logo.png)

# DARIAH contribution tool

This is the technical documentation for the DARIAH contribution tool.

The contribution is an [SPA](https://en.wikipedia.org/wiki/Single-page_application)
(Single Page Application)
and hence the focus is on the client side, aka front-end of the app.

We have implemented the front-end with the help of
[React](https://facebook.github.io/react/) and [Redux](http://redux.js.org)
and followed the most recent and idiomatic practices to achieve our ends.

# Overview of this documentation

## The technology
Crash course in modern Javascript, [ES6](ES6) and [React+Redux](React).

## Routing
How server and client react to the urls that are being passed around: [Routing](Routing).

## Division of labour
How the dozens of React components are structured around a handful of slices of the *state*,
the single source of truth for the whole app when it lives in the browser.
It is all a matter of [Architecture](Architecture).

## Components
The user interface is realized by many React components.
In the [Components](Components) document they are all documented, alphabetically.

But components hang together, work together, share data.
To see that picture, start with looking at the side bar, where the components have been grouped by 
... **duck** ... !

## Dux
These are the pillars of connected pieces of labour, that support the individual components.
I follow a [proposal by Erik Rasmussen](https://github.com/erikras/ducks-modular-redux)
to call a modular Redux package a duck, and in the plural I call them **dux**,
honouring the good work of Redux.

## Backend
At the server side we store the data in a [MongoDB](https://docs.mongodb.com).
This data is server through a [Python-Bottle](http://bottlepy.org/docs/dev/) web framework.
The authentication of users is outsourced to the DARIAH infrastructure, see
[here](Dux#me). The authorization is defined by the [data model](Server#data-model) and
[permission model](Server#permissions),
which govern all data access.

## Tests

[Testing](Tests)
becomes a life saviour when your app is growing in complexity.
When you add new behaviours you run the risk that existing behaviours break.
The remedy is to write tests for all aspects of the behaviours, and run them rigorously
after each change and refactoring.
That way, you proactively discover your bugs before your users get a chance to
encounter them.

## Deployment
Here are the bits and pieces you have to do in order to get a working system out of this.

## Code base

To get an impression of the kind of work behind this app, see 
[Codebase](Codebase) where it is revealed how many lines of code have been written in which languages.

# Author

Dirk Roorda
[DANS](https://www.dans.knaw.nl)
[dirk.roorda@dans.knaw.nl](mailto:dirk.roorda@dans.knaw.nl)

2017-06-29





