// @format

class Selector {
  /*
    `selectors` interface
  
      - query: the xpath-style string to find a specific DOM node.
      - plain: the name of the attribute in plain text.
      - regexp: A regular expression to match and validate the value of the
          attribute.
      - exclusive: A boolean expressing the exlusitivity of a tag in relation to
        any other tag.
      - exec: A function that transforms the matched element in-place.
  */
  constructor(query, plain, regexp, exclusive, fun) {
    this.query = query;
    this.plain = plain;
    this.regexp = regexp;
    this.exclusive = exclusive;
    this._fun = fun;
    this.storage = {};
  }

  exec(elem, value) {
    this._fun(this, elem, value);
  }
}

const selectors = [
  new Selector(
    name => `*[bind*='{${name}}']`,
    "bind",
    new RegExp("(.*){([^)]+)}(.*)"),
    true,
    (context, elem, value) => {
      // TODO: Find out if we can change `elem` in-place
      const [_, pre, match, suf] = elem
        .getAttribute(context.plain)
        .match(context.regexp);
      if (elem instanceof HTMLInputElement) {
        elem.value = `${pre}${value}${suf}`;
      } else {
        elem.innerHTML = `${pre}${value}${suf}`;
      }
    }
  ),
  new Selector(
    name => `*[integrate*='{${name}}']`,
    "integrate",
    // NOTE: We're required to use a dynamic regexp here.
    new RegExp(),
    true,
    (context, elem, value) => {
      if (!context.storage.originalText) {
        context.storage.originalText = elem.textContent;
      }
      const name = elem.getAttribute("integrate");
      const regexp = new RegExp(name, "g");
      elem.textContent = context.storage.originalText.replace(regexp, value);
    }
  )
];

class Store extends WeakMap {
  set(...args) {
    const [elem, value] = args;
    const selector = selectors.find(s => elem.hasAttribute(s.plain));
    selector.exec(elem, value);

    return super.set(...args);
  }
}
const store = new Store();

export const useState = (initialValue, name) => {
  const fns = selectors
    .map(({ query }) => {
      // NOTE: We needed to make `query` lazily evaluatable. Hence we've wrapped
      // it inside a function.
      return Array.from(document.querySelectorAll(query(name))).map(
        funFactory(initialValue)
      );
    })
    .flat();
  const setter = newValue => fns.forEach(fn => fn(newValue));
  return [initialValue, setter];
};

const funFactory = initialValue => {
  return elem => {
    if (!store.get(elem)) {
      store.set(elem, initialValue);
    }
    return v => store.set(elem, v);
  };
};
