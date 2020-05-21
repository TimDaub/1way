// @format

const selector = {
  css: "bind",
  plain: "bind",
  regexp: new RegExp("(.*)\{([^\)]+)\}(.*)")
};

class Store extends WeakMap {
  set(...args) {
    const [elem, v] = args;
    const [_, pre, match, suf] = elem.getAttribute("bind").match(selector.regexp);
    if (elem instanceof HTMLInputElement) {
      elem.value = `${pre}${v}${suf}`;
    } else {
      elem.innerHTML= `${pre}${v}${suf}`;
    }
    return super.set(...args);
  }
}
const store = new Store();

export const useState = (init, name) => {
  const fns = Array.from(document.querySelectorAll(`*[bind*='{${name}}']`)).map(
    funFactory(init)
  );
  const setter = newValue => fns.forEach(fn => fn(newValue));
  return [init, setter];
};

const funFactory = init => {
  return elem => {
    if (!store.get(elem)) {
      store.set(elem, init);
    }
    return v => store.set(elem, v);
  };
};
