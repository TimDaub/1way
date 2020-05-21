# 1way

> A 1way flux-esk state library. Like react-hooks but without the react. 

## Installation

```bash
$ npm install --save 1way
```

## Documentation

`1way` is a really simple library at this point. It was inspired by the way
angular and react are binding JavaScript variables within HTML.

### Why?

Back in the days, angular got really popular for a feature called
"two-way-binding" (I believe Backbone introduced it first). It allowed a web
developer to bind a dom element directly to a variable defined in JavaScript.

Immediately, everybody got exited and used two-way-binding extensively. Until
they noticed that in large applications it's not that great.

Along came react and innovated on the binding part by introducing the Flux
architecture, which among other things, suggested a one way data flow.

Now, it seems two way data flows are getting back in fashion.

```svelte
<script>
  let name = 'world';
</script>

<h1>Hello {name}!</h1>
<input type="text" bind:value={name} />
```
(Run this code [here](https://svelte.dev/).)

But additionally, we're now inventing
[languages](https://gist.github.com/Rich-Harris/0f910048478c2a6505d1c32185b61934),
not frameworks. It's great for moving standards forward. But since no winner
seems to have emerged yet, it may be more effective simply sticking to HTML5.
Which is, after all, pretty neat too now!

### Using `1way` in your app

Check out [index.html](index.html) for an example of how to
use `1way`.

### Demo

Checkout a demo [here](https://timdaub.github.io/1way/).

## Changelog

### 0.0.1

- Initial release

## Resources:

- [Regex and greediness](http://www.regular-expressions.info/repeat.html)
- [Match stuff between parentheses](https://stackoverflow.com/a/6208415)
- [Angular: Binding
  syntax](https://angular.io/guide/template-syntax#binding-syntax-an-overview)
- [Flux](https://facebook.github.io/flux/)
- [What is Svelte](https://gist.github.com/Rich-Harris/0f910048478c2a6505d1c32185b61934)
- [MDN: A background on modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
