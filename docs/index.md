---
title: Home
---

![logo](images/inkind_logo.png)

# [DARIAH contribution tool]({{site.liveBase}})

This is the documentation for the DARIAH contribution tool, an instrument to
register and assess community contributions to the [DARIAH]({{site.dariah}}).

The documentation contains a functional part, the _workflow_ of assessment and
reviewing, and a technical part: architecture, technology, software design.

# Overview of this documentation

## Two layers

There are two layers in this app: a lower level layer that sees the world as
collections of records with fields, which it can read, insert, update, and
delete. This layer has a user interface which can expose all lists and items of
this world.

There is also a higher level layer, in which we can express things as:

* if an assessment is submitted for review, lock the assessment and the
	contribution;
* if the criteria entries for an assessment are not complete, do not allow to
	submit it for review.

This higher level layer is called the [workflow engine](Workflow) and here we
see the [business logic](Business) of the tool being expressed.

On the user interface, the business items are shown as heavy buttons and big
squares with messages.

## The technology

The contribution is an [SPA]({{site.spa}}) (Single Page Application) and hence
the focus is on the client side, aka front-end of the app.

We have implemented the front-end with the help of [React]({{site.reactDocs}})
and [Redux]({{site.redux}}) and followed the most recent and idiomatic practices
to achieve our ends.

Here is a crash course in modern [JavaScript, ES6](ES6) and
[React+Redux](React).

For an overview of all technology we have made use of, see the
[alphabetical tech references](Tech)

## [API](API) and [Routing](Routing)

The data of the tool is accessible through an API. The routing page tells more
about how the tool reacts to URLs.

## [Architecture](Architecture)

Read about division of labour, and how the dozens of React components are
structured around a handful of slices of the _state_, the single source of truth
for the whole app when it lives in the browser.

## [Components](Components)

The user interface is realized by many React components. In this section they
are all documented, alphabetically.

But components hang together, work together, share data. To see that picture,
start with looking at the side bar, where the components have been grouped by
... **duct** ... !

## [Dux](Dux)

There are ducts of information connecting the pieces of work that the individual
components do. I follow a [proposal by Erik Rasmussen]({{site.ducks}}) to call a
modular Redux package a duck, but with a twist: I call it a _duct_. But in the
plural I call them **dux**, honouring the good work of Redux.

## [Server](Server)

At the server side we store the data in a [MongoDB]({{site.mongodb}}). This data
is served by a [Python-Bottle]({{site.bottle}}) web framework. The
authentication of users is outsourced to the DARIAH infrastructure, see
[here](Dux#me). The authorization is defined by the [data model](Model) which
governs all data access.

## [Tests](Tests)

Testing becomes a life saver when your app is growing in complexity. When you
add new behaviours you run the risk that existing behaviours break. The remedy
is to write tests for all aspects of the behaviours, and run them rigorously
after each change and refactoring. That way, you proactively discover your bugs
before your users do.

## [Initial Content](Content)

There are already 800 contributions in the system. They have been collected in a
FileMaker database in the past. We convert this content and use it for an
initial filling of the contribution tool. The legacy import is automated and
repeatable, even into a database that has been used in production for a while.
Click on the title of this section to read more about how difficult that is, and
how we partly solved it.

## [Deploy](Deploy)

Here are the bits and pieces you have to do in order to get a working system out
of this.

## [Code base](Codebase)

To get an impression of the kind of work behind this app, we reveal how many
lines of code have been written in which languages.

## [Lessons learned](Lessons)

It has taken a lot of time to develop this app. Lots more than I expected from
the start. For an account, read the [lessons](Lessons).

# Author

Dirk Roorda [DANS]({{site.dans}})
[dirk.roorda@dans.knaw.nl](mailto:dirk.roorda@dans.knaw.nl)

2017-12-04
