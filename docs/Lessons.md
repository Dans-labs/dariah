---
title: Lessons
---

Because it took so long to develop this tool, and because it has grown so big, I
started reflecting on the choices I've made, and the things I've learned. What
follows can be read as a self-assessment of the development process.

"Best" practices
================

The tool has been built using modern, top-notch, popular frameworks and tools,
such as React, MongoDb, Python, modern Javascript (ES6), and its documentation
is in Markdown on Github. But it is a complex beast, and it will be hard for
other developers to dive in. Developers that want to upgrade this tool, should
be seasoned React developers, or they should be willing and have time to enter a
steep learning curve.

This approach - alternative approaches
======================================

A quick glance at the [statistics](Codebase) of the code base makes clear the
amount of thought that has gone into the tool.

I have asked myself the question: why do we need so much programming for such a
mundane task? Is it really necessary to build something this big for it? The
answer: to my best knowledge, yes, but I'm open to be contradicted.

What could we have done differently?

More classical framework: Django
--------------------------------

We could have used Django, but then we would have missed the opportunity to
engage in real modern web application programming. The Javascript world is
brewing with dynamics and innovation, and we would have skipped all that.
Besides, also a Django application would contain a considerable amount of custom
programming.

Generic app/framework
---------------------

We could have used an app like Trello or Basecamp, or a content management
system that has not been designed to support a specific workflow like this. We
would have had several disadvantages:

*   an extra dependency on a Silicon-Valley service
*   the struggle to customize the service
*   the need to instruct the users to use the system according to the intended
    workflow.

This approach: from the ground up
---------------------------------

What we have now, is something that has been built from the ground up. We have
total control over all aspects of the app, its data, and the servers at which it
runs. We can connect it to other apps, define new microservices around it quite
easily.

So, the price has been high, much higher than I expected (and promised), but I
think we've got something to build on.

The learning curve (for what it is worth)
=========================================

When I started writing, I had the experience of developing
[SHEBANQ]({{site.shebanq}}). At first, the tools I used for SHEBANQ were a model
for developing this contrib tool. From the start it was clear that the contrib
tool needed more profound underpinnings. I started out to write those
underpinnings myself, programmed in pure, modern Javascript. That worked to a
certain extent, but I doubted whether it was strong enough to carry the weight
of the full app. After a while I started a big search, trying Google's Angular,
Facebook's React, and various solutions that combined these frameworks in
so-called full-stack setups, such as [Meteor]({{site.meteor}}) and
[MERN]({{site.mern}}).

Here is a selection of 10 lessons I learned during what followed.

Lesson 1: exit full-stack
-------------------------

Without any experience in React or Angular, it was simply too hard to get
started with any of the combined solutions. They were cutting edge, evolving in
a rapid sequence of versions, and examples on the internet almost never worked
because of being outdated already. Without having an understanding already of
the intention, I found it impossible to overcome the discrepancies between
theory and practice.

Lesson 2: Angular versus react
------------------------------

I had to choose between Angular and React, and I choose React because:

*   it had more limited goals,
*   combined better with the other parts of the app,
*   was more popular among developers,
*   and was a natural continuation of the work I had already done in my self-made
    framework.

Angular had just moved to version 2, the learning curve had steepened, and I
heard developers say that at first it worked like a charm, but that it was very
hard to move beyond tutorial level.

Lesson 3: Beyond vanilla React
------------------------------

React was not enough. After achieving a lot of functionality, I reached a stage
where I encountered bugs that I could not solve. My app became too big for
vanilla React, and I needed *Redux*, an add-on that provides an app-wide data
structure (central state).

Lesson 4: Grokking Redux
------------------------

To get started with Redux I needed a course. Without it, I could not get to
grips with it. I watched 30 online video's by the maker of it, Dan Abramov, also
developer at Facebook for React. After the videos I could not remember how I
could NOT understand it.

Lesson 5: Idiomatic Redux and code organization
-----------------------------------------------

After using Redux throughout the app, the code started to look much better, and
I got much better control over the workings of the app. On the internet, this is
called: "idiomatic Redux". It is a kind of Javascript that old fashioned web
programmers hardly recognise as Javascript! It is very important to follow up
all the best practices that are advised here, because the performance and
correctness of the app depend crucially on them all.

What also helped is a hint by Erik Ras, creator of
[redux-form]({{site.reduxFormBase}}), to organize your redux code in files: the
concept of [ducks]({{site.ducks}}).

Lesson 6: CRUD layer
--------------------

Some operations are so ubiquitous, that you have to program them once and for
all: create/update/delete/read of database items (CRUD), all subject to user
permissions. All things that are particular to specific tables and fields must
be specified as configuration, all actions must read the configs and carry out
generic code.

Lesson 7: Custom Workflow layer
-------------------------------

You cannot do all the business logic this way, without overloading your nice
generic system. So the app has two layers of abstraction:

*   level 1 for CRUD,
*   level 2 for additional workflow. It is level 2 that your users will interact
    with most.

Lesson 8: Hooks and config for workflow
---------------------------------------

instead of applying workflow functions in an add-hoc manner, you should add
hooks at key points of the CRUD code. Only at those hooks the workflow functions
are given a say in the matter. These workflow functions should again be
programmed in a generic way, with the particulars moved to an other level of
configuration.

Lesson 9: Build tools: Webpack
------------------------------

To be able to run the app and to ship it to the outside world, your build-system
should be top-of-the bill. I started with just a little script of my own to
massage the code into a web-app bundle. Then I moved to Gulp and used it for a
long time. I saw that the React people were using Webpack all the time, but I
could barely understand Webpack, let alone get it working. In the end, I decided
that I wanted Webpack no matter what, and got it working, including all the
niceties it had to offer.

The result:

*   for production I can ship very compact code, in such a way that the client web
    browsers load it very fast;
*   for development, I have a very easy and short feedback loop: when I save my
    code, it is automatically rebuilt, and in a fraction of a second the updated
    modules reload in the browser, and when there are errors, I get pointed to the
    exact line in the code where it went wrong.

Lesson 10: Trust React
----------------------

React is really well-designed, it does not let you down, you do not have to look
under the hood, and it gives very helpful debug messages. The contrib app is
growing and contains dozens of components, but the performance remains
excellent. Before I used idiomatic Redux, the performance was worrying at times.
