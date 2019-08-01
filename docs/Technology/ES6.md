# ES6

We use
[ECMAScript 6, also known as ES6, also known as ES2015, also known as JavaScript]({{babel}}/learn-es2015/)
for the client side of the app.

The evolution of JavaScript to ES6 and beyond has transformed JavaScript from a
"horrible language" into a performant language with a beautiful syntax on one of
the most widely supported platforms: the browser. Instead of pushing JavaScript
out of sight, we fully embrace it as our principal programming formalism at the
client side.

??? details "Full stack?"
    Others (see for example
    [Meteor]({{meteor}})
    ) go even further and use it on
    the server as well, but we have not taken that step.

??? abstract "From ES6 to browser JS"
    The code is *transpiled* through Babel into a version of JavaScript that all
    major browsers understand. The compilation from source code to what the browser
    eventually gets is way more complicated. It is taken care of by the build tool
    of our choice:
    [Webpack]({{webpack}})

??? abstract "Code style"
    Our source code conforms to a number of style guides, which are checked by
    [eslint]({{eslint}})
    .
    There are many options and choices, ours are
    [here]({{clientBase}}/eslint.yaml)
    .
    Not all of these are relevant, because
    we also enforce style by means of
    [prettier]({{prettier}})
    .

We highlight a few, not all, concepts in ES6 that we make use of.

## Class notation

??? abstract "Classes are not the main paradigm here"
    See
    [Class notation]({{babel}}/learn-es2015/#ecmascript-2015-features-classes)
    .

    In our code, we do not do that much with classes and object-oriented
    programming.

    Wherever possible, we prefer writing functions that can be used
    irrespective of classes.

    In the React/Redux world, function composition is the
    preferred way of building up complex functionality out of simpler functionality.

    Still, there are cases where object orientation definitely has advantages.

??? abstract "Syntax"
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

    This is nice, terse, clean syntax.

    ??? note "`this`" 
        There is difference between `method1` and `method2`.

        `method1` is an ordinary method, and the `this` in the body points to
        the caller.

        So if you want to send `method1` around as a callback, you have to
        manually bind the `this`:

        ```JavaScript
        callback = this.method1.bind(this)
        ```

        ??? caution "binding deprecated in React"
            In several react contexts, it is undesirable to do this binding, because behind
            the screens it creates a new object.

            In a React component, it is much more
            efficient to pass a statically defined callback around.

            `method2` comes to the rescue.
            It is a *class property*, and the `this` is now *lexical*.

            So, whoever calls it, `this` is the `this` of class `Foo`.
            So you can just say:

            ```JavaScript
            callback = this.method2
            ```

        ??? caution "This syntax is ES7"
            Note that this syntax of
            [class properties]({{es7cp}})
            is in ES7, beyond ES6.

            Yet we can use it without issue because of
            [Babel]({{babel}}/docs/plugins/transform-class-properties/)
            .

## Arrow functions

??? abstract "arrow notation"
    See
    [Arrow Functions]({{babel}}/learn-es2015/#ecmascript-2015-features-arrows-and-lexical-this)
    .

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

??? details "even shorter"
    If there is only 1 argument, it is even shorter:

    ```JavaScript
    const myFunc = x => x + 1
    ```

??? details "functions returning functions"
    If you have functions that return functions, everything goes smoother now:

    ```JavaScript
    const handleEvent = id => event => dispatch({ id, value: event.target.value })
    ```

??? note "`this`"
    For arrow functions the `this` is lexical.

## Object notations

Objects are central to JavaScript. ES6 contains new syntax, that makes working
with objects very pleasant indeed.

??? note "to get a taste"
    In our app we have activated linters that
    insist on using that syntax to the maximum amount possible.

    It will dramatically
    change the general outlook of a piece of JavaScript code.
    Just to have a taste, look at this bit of
    [source code]({{appBase}}/components/ListFilter.jsx)
    .

??? abstract "Destructuring"
    See
    [destructuring]({{babel}}/learn-es2015/#ecmascript-2015-features-destructuring)
    .

    An *object* contains key-value pairs like this:

    ```JavaScript
    const props = { foo: 1, bar: { x: 2, y: 3 } }
    ```

    If we want to extract the `foo` and `y` part, we could say:

    ```JavaScript
    const foo = props.foo
    const y = props.bar.y
    ```

    But there is a more elegant way, using *destructuring*:

    ```JavaScript
    const { foo: foo, bar: { y: y } } = props
    ```

    This does in one statement exactly the same as in the previous statement.

??? abstract "Shorthand"
    See
    [shorthand]({{javascript}}/Operators/Object_initializer)
    .

    On top of destructuring, there is another trick: *shorthand*.

    If you have a pattern like
    ```
    name: name
    ```

    inside an object, you may also say

    ```
    { name }
    ```

    And if you are in a scope where `name` is bound to a value *v*, you may define
    an object like this:

    ```JavaScript
    const props = { name }
    ```

    which is equivalent to

    ```JavaScript
    const props = { name: v }
    ```

    Returning to our *foo bar* example:

    ```JavaScript
    const { foo: foo, bar: { y: y } } = props
    ```

    we can write it even more compactly:

    ```JavaScript
    const { foo, bar: { y } } = props
    ```

??? abstract "Rest spread"
    See
    [rest spread]({{babel}}/learn-es2015/#ecmascript-2015-features-destructuring)
    .

    ??? abstract "Plain usage"
        If `props` has a lot of keys, and we are interested in doing something with its
        keys `foo` and `bar`, and want to pass the remaining keys on, we can do so using
        *object rest spread*, as follows:

        ```JavaScript
        const { foo, bar, ...rest } = props
        doSomething(foo, bar)
        passOn(rest)
        ```

    ??? abstract "In function definitions"
        ```JavaScript
        const process = ({ foo, bar, ...rest }) => {
            doSomething(foo, bar)
            passOn(rest)
        }
        ```

    ??? abstract "Missing keys"
        If you use object destructuring and the key you destructure is not present in
        the object, you get undefined. But you can also specify defaults:

        ```JavaScript
        const { foo, bar: { y } = { y:3, z:4 }, ...rest } = props
        doSomething(foo, bar)
        passOn(rest)
        ```

        ```JavaScript
        const process = ({ foo=3, bar={ x:0, y: 0 }, ...rest }) => {
            doSomething(foo, bar)
            passOn(rest)
        }
        ```

    ??? note "Use case: shallow copying"
        Object rest spread is also handy to make a shallow copy of an object with some
        keys changed.

        Suppose we have a `state` object, with many keys.

        Suppose one of them is `filter`, pointing to an object like this:

        ```javascript
        { 35: false, 36: false, 37: false }
        ```

        ??? example "Level 1"
            We want a new state, as a shallow copy of the old state,
            with the `filter` updated to 

            ```javascript
            { 36: true }
            ```

            This is how you do that:

            ```JavaScript
            const newState = { ...state, filter: { 36: true } }
            ```

            Then

            *   `newState` is a new object.
            *   All its members except `filter`
                are the same objects as in `state`.
            *   `filter` in `newState` is a completely new object.

        ??? example "Level 2"
            Suppose that you do not want to replace the filter object with the one given
            above, but only its key 36, leaving all other keys intact.

            You can use *object
            spread* twice to achieve this:

            ```JavaScript
            const newState = {
                ...state,
                filter: {
                    ...state.filter,
                    36: true,
                }
            }
            ```

            Then

            *   `newState` is a new object.
            *   All its members except `filter`
                are the same objects as in `state`.
            *   `filter` in `newState` is a new object.
            *   All keys in the new `filter` except 36
                are the same objects as in the `filter` in `state`.


        ??? note "Merging in reducers"
            This kind of code is often needed in *reducers*, functions that compute a new
            state from an old state in such a way that everything that is changed, is copied
            shallowly to a new object, and every thing that is the same, remains the same
            object.

            However, if what has changed is really deeply nested, there are better methods
            to achieve is, e.g.
            [lodash merge]({{lodash}}#merge)
            or
            [Immutability-Helper]({{immutability}})
            .

            See also our
            [test suite for reducers](../Maintenance/Tests.md#tablesreducer)
            .

## Promises

??? abstract "Asynchrone"
    See
    [Promise]({{javascript}}/Global_Objects/Promise)
    .

    *Promise* is an ES6 data structure to contain the result of asynchronous
    functions.

    It has as state that is either *pending*, *failed* or *resolved*.

    Once the state is *failed* or *resolved*, it will not change any more.

    If the state is *resolved*, the return value is available.

    ??? example "Typical usage"
        The typical way to use a promise is

        ```javascript
        const retrievedData = {}

        const getData = url => fetch(url)

        // assuming that fetch returns a Promise, we can then say

        getData('/api/blob/23').
        then(
          blob => {retrievedData.url = blob},
          error => console.error(error),
        )
        ```

    ??? example "Our usage"
        See
        [server.js]({{appBase}}/dux/server.js)
        .

        This is virtually the only occurrence in our code where we use Promise syntax.
