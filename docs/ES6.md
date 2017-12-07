---
title: ES6
---

# General

We use
[ECMAScript 6, also known as ES6, also known as ES2015, also known as JavaScript]({{site.babel}}/learn-es2015/)
for the client side of the app.

The code is _transpiled_ through Babel into a version of JavaScript that all
major browsers understand. The compilation from source code to what the browser
eventually gets is way more complicated. It is taken care of by the build tool
of our choice: [Webpack]({{site.webpack}})

Our source code conforms to a number of style guides, which are checked by
[eslint]({{site.eslint}}). There are many options and choices, ours are
[here]({{site.clientBase}}/eslint.yaml).
Not all of these are relevant, because we also enforce style by means of
[prettier]({{site.prettier}}).

The evolution of JavaScript to ES6 and beyond has transformed JavaScript from a
"horrible language" into a performant language with a beautiful syntax on one of
the most widely supported platforms: the browser. Instead of pushing JavaScript
out of sight, we fully embrace it as our principal programming formalism at the
client side.

Others (see for example [Meteor]({{site.meteor}})) go even further and use it on
the server as well, but we have not (yet) taken that step.

We highlight a few, not all, concepts in ES6 that we make use of.

# [Class notation]({{site.babel}}/learn-es2015/#ecmascript-2015-features-classes)

In our code, we do not do that much with classes and object-oriented
programming. Wherever possible, we prefer writing functions that can be used
irrespective of classes. In the React/Redux world, function composition is the
preferred way of building up complex functionality out of simpler functionality.
Still, there are cases where object orientation definitely has advantages.

The new syntax for classes is like this:

```JavaScript
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

This is nice, terse, clean syntax. Note the difference between `method1` and
`method2`. `method1` is an ordinary method, and the `this` in the body points to
the caller. So if you want to send `method1` around as a callback, you have to
manually bind the `this`:

```JavaScript
callback = this.method1.bind(this)
```

In several react contexts, it is undesirable to do this binding, because behind
the screens it creates a new object. In a react component, it is much more
efficient to pass a statically defined callback around. `method2` comes to the
rescue. It is a _class property_, and the `this` is now _lexical_. So, whoever
calls it, `this` is the `this` of class `Foo`. So you can just say:

```JavaScript
callback = this.method2
```

Note that this syntax of [class properties]({{site.es7cp}}) is in ES7, beyond
ES6. Yet we can use it without issue because of
[Babel]({{site.babel}}/docs/plugins/transform-class-properties/).

# [Arrow Functions]({{site.babel}}/learn-es2015/#ecmascript-2015-features-arrows-and-lexical-this)

There is now a very handy notation to write functions: **arrow** notation.
Instead of

```JavaScript
function myFunc(x, y) {
    return x + y
}
```

you can write:

```JavaScript
const myFunc = (x,y) => x + y
```

If there is only 1 argument, it is even shorter:

```JavaScript
const myFunc = x => x + 1
```

If you have functions that return functions, everything goes smoother now:

```JavaScript
const handleEvent = id => event => dispatch({ id, value: event.target.value })
```

There is more to this, notably, for arrow functions the `this` is lexical.

# Object Notations

[shorthand]({{site.javascript}}/Operators/Object_initializer),
[destructuring]({{site.babel}}/learn-es2015/#ecmascript-2015-features-destructuring),
[rest spread]({{site.babel}}/learn-es2015/#ecmascript-2015-features-destructuring).

Objects are central to JavaScript. ES6 contains new syntax, that makes working
with objects very pleasant indeed. In our app we have activated linters that
insist on using that syntax to the maximum amount possible. It will dramatically
change the general outlook of a piece of JavaScript code. Just to have a taste,
look at this bit of [source code]({{site.appBase}}/components/ListFilter.jsx).

An _object_ contains key-value pairs like this:

```JavaScript
const props = { foo: 1, bar: { x: 2, y: 3 } }
```

If we want to extract the `foo` and `y` part, we could say:

```JavaScript
const foo = props.foo
const y = props.bar.y
```

But there is a more elegant way, using _destructuring_:

```JavaScript
const { foo: foo, bar: { y: y } } = props
```

This does in one statement exactly the same as in the previous statement.

On top of it, there is another trick: _shorthand_. If you have a pattern like
`name: name` inside an object, you may also say `{ name }`.

And if you are in a scope where `name` is bound to a value _v_, you may define
an object like this:

```JavaScript
const props = { name }
```

So we can write our _foo bar_ example even more compactly:

```JavaScript
const { foo, bar: { y } } = props
```

If `props` has a lot of keys, and we are interested in doing something with its
keys `foo` and `bar`, and want to pass the remaining keys on, we can do so using
_object rest spread_, as follows:

```JavaScript
const { foo, bar, ...rest } = props
doSomething(foo, bar)
passOn(rest)
```

These things also may occurs in function definitions:

```JavaScript
const process = ({ foo, bar, ...rest }) => {
    doSomething(foo, bar)
    passOn(rest)
}
```

If you use object destructuring and the key you destructure is not present in
the object, you get undefined. But you can also specify defaults:

```JavaScript
const process = ({ foo=3, bar={ x:0, y: 0 }, ...rest }) => {
    doSomething(foo, bar)
    passOn(rest)
}
```

Object rest spread is also handy to make a shallow copy of an object with some
keys changed. Suppose we have a `state` object, with many keys, but we only want
to update the key called `filter` and give it value `{ 35: true }`, where 35 is
stored in local constant `id`. This is how you do that:

```JavaScript
const newState = { ...state, filter: { [id]: true } }
```

Suppose that you do not want to replace the filter object with the one given
above, but only its key 35, leaving all other keys intact. You can use _object
spread_ twice to achieve this:

```JavaScript
const newState = {
    ...state,
    filter: {
        ...state.filter,
        [id]: 35,
    }
}
```

This kind of code is often needed in _reducers_, functions that compute a new
state from an old state in such a way that everything that is changed, is copied
shallowly to a new object, and every thing that is the same, remains the same
object.

However, if what has changed is really deeply nested, there are better methods
to achieve is, e.g. [lodash merge]({{site.lodash}}/#merge).

# [Promise]({{site.javascript}}/Global_Objects/Promise)

_Promise_ is an ES6 data structure to contain the result of an asynchronous
function. It has as state that is either _pending_, _failed_ or _resolved_. Once
the state is _failed_ or _resolved_, it will not change any more. If the state
is _resolved_, the return value is available, and will not change any more.

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

[External documentation]({{site.javascript}}/Global_Objects/Promise)
