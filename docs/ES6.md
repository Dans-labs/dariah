---
title: ES6
---

# General

We use
[EcmaScript 6, also known as ES6, also known as ES2015, also known as Javascript](https://babeljs.io/learn-es2015/)
for the client side of the app.

The code is *transpiled* through Babel into a version of Javascript that all major browsers understand.
The compilation from source code to what the browser eventually gets is way more complicated.
It is taken care of by the build tool of our choice: 
[webpack](https://webpack.js.org)

Our source code conforms to a number of style guides, which are enforced by
[eslint](http://eslint.org).
There are many options and choices, ours are
[here]({{site.repBase}}/client/eslint.yaml).

We highlight a few concepts in ES6 that we make use of.

# Promise

*Promise* is an ES6 datastructure to contain the result of an asynchronous function.
It has as state that is either *pending*, *failed* or *resolved*.
Once the state is *failed* or *resolved*, it will not change anymore.
If the state is *resolved*, the return value is available, and will not change anymore.

The typical way to use a promise is

```
  const dataStore = {}
  const getData = url => fetch(url)
  // assuming that fetch returns a Promise, we can then say
  getData('/api/blob/23').
  then(
    blob => {dataStore.url = blob},
    error => console.error(error),
  )
```

**Example**: [server.js]({{site.libBase}}/server.js)

This is virtually the only occurrence in our code where we use Promise syntax.

[External documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)