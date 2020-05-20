// @format

const selector = {
  css: "bind",
  plain: "bind"
};
class Store extends WeakMap {
  set(...args) {
    const [elem, v] = args;
    if (elem instanceof HTMLInputElement) {
      elem.value = v;
    } else {
      elem.innerHTML = v;
    }
    return super.set(...args);
  }
}
const store = new Store();

export const useState = (init, name) => {
  const fns = Array.from(document.querySelectorAll(`*[bind='{${name}}']`)).map(
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
