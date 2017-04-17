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

The evolution of Javascript to ES6 and beyond has transformed Javascript from a "horrible language" into a performant
language with a beautiful syntax on one of the most widely supported platforms: the browser.
Instead of pushing Javascript out of sight, we fully embrace it as our principal programming formalism at the client side.

Others (see for example [Meteor](https://www.meteor.com))
go even further and use it on the server as well, but we have not (yet) taken that step.

We highlight a few, not all, concepts in ES6 that we make use of.

# [Class notation](ihttps://babeljs.io/learn-es2015/#ecmascript-2015-features-classes)
In our code, we do not do that much with classes and object-oriented programming.
Wherever possible, we prefer writing functions that can be used irrespective of classes.
In the React/Redux world, function composition is the preferred way of building up complex functionality
out of simpler functionality.
Still, there are cases where object orientation definitely has advantages.

The new syntax for classes is like this:

```javascript
class Foo extends Bar {
    constructor() {
        super()
    }
    method1(x, y, z) {
        this.prop = x
    }
    method2 = (e, f, g) => {
        this.event = e
    }
}
```

This is nice, terse, clean syntax.
Note the difference between `method1` and `method2`.
`method1` is an ordinary method, and the `this` in the body points to the caller.
So if you want to send `method1` around as a callback, you have to manually bind the `this`:

```javascript
callback = this.method1.bind(this)
```

In several react contexts, it is undesirable to do this binding, because behind the screens it creates a new object.
In a react component, it is much more efficient to pass a statically defined callback around.
`method2` comes to the rescue. It is a *class property*, and the `this` is now *lexical*.
So, whoever calls it, `this` is the `this` of class `Foo`. So you can just say:

```javascript
callback = this.method2
```

Note that this syntax of [class properties](http://borgs.cybrilla.com/tils/es7-class-properties/) is in ES7, beyond ES6.
Yet we can use it without issue because of [Babel](https://babeljs.io/docs/plugins/transform-class-properties/).

# [Arrow Functions](https://babeljs.io/learn-es2015/#ecmascript-2015-features-arrows-and-lexical-this)
There is now a very handy notation to write functions: **arrow** notation. Instead of

```javascript
function myFunc(x, y) {
    return x + y
}
```

you can write:

```javascript
const myFunc = (x,y) => x + y
```

If there is only 1 argument, it is even shorter:

```javascript
const myFunc = x => x + 1
```

If you have functions that return functions, everything goes smoother now:

```javascript
const handleEvent = id => event => dispatch({ id, value: event.target.value }) 
```

There is more to this, notably, for arrow functions the `this` is lexical.

# Object Notations [shorthand](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operators/Object_initializer), [destructuring](https://babeljs.io/learn-es2015/#ecmascript-2015-features-destructuring), [rest spread](https://babeljs.io/learn-es2015/#ecmascript-2015-features-destructuring)
Objects are central to javascript. ES6 contains new syntax, that makes working with objects
very pleasant indeed. In our app we have activated linters that insist on using that syntax to the maximum
amount possible. 
It will dramatically change the general outlook of a piece of javascript code.
Just to have a taste, look at this bit of
[source code]({{site.appBase}}/object/FilterCompute.jsx).

An *object* contains key-value pairs like this:

```javascript
const props = { foo: 1, bar: { x: 2, y: 3 } }
```

If we want to extract the `foo` and `y` part, we could say:

```javascript
const foo = props.foo
const y = props.bar.y
```

But there is a more elegant way, using *destructuring*:

```javascript
const { foo: foo, bar: { y: y } } = props
```

This does in one statement exactly the same as in the previous statement.

On top of it, there is another trick: *shorthand*.
If you have a pattern like ` name: name ` inside an object, you may also say `{ name }`.

And if you are in a scope where `name` is bound to a value *v*, you may define an object like this:

```javascript
const props = { name }
```

So we can write our *foo bar* example even more compactly:

```javascript
const { foo, bar: { y } } = props
```

If `props` has a lot of keys, and we are interested in doing something with its keys `foo` and `bar`,
and want to pass the remaining keys on, we can do so using *object rest spread*, as follows:

```javascript
const { foo, bar, ...rest } = props
doSomething(foo, bar)
passOn(rest)
```

These things also may occurs in function definitions:

```javascript
const process = ({ foo, bar, ...rest }) => {
    doSomething(foo, bar)
    passOn(rest)
}
```

If you use object destructuring and the key you destructure is not present in the object, you get undefined.
But you can also specify defaults:

```javascript
const process = ({ foo=3, bar={ x:0, y: 0 }, ...rest }) => {
    doSomething(foo, bar)
    passOn(rest)
}
```
Object rest spread is also handy to make a shallow copy of an object with some keys changed.
Suppose we have a `state` object, with many keys, but we only want to update the key called `filter`
and give it value `{ 35: true }`, where 35 is stored in local constant `id`.
This is how you do that:

```javascript
const newState = { ...state, filter: { [id]: true } }
```

Suppose that you do not want to replace the filter object with the one given above, but only its key 35, leaving
all other keys intact. You can use *object spread* twice to achieve this:

```javascript
const newState = {
    ...state,
    filter: {
        ...state.filter,
        [id]: 35,
    }
}
```

This kind of code is often needed in *reducers*, functions that compute a new state from an old state in such a way
that everything that is changed, is copied shallowly to a new object, and every thing that is the same, remains
the same object.

However, if what has changed is really deeply nested, there are better methods to achieve is, e.g. 
[lodash merge](https://lodash.com/docs/#merge)
This hint is given [here](http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html).

# [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
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
