const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const curry = (fn) => (...args) => fn.bind(null, ...args);

const map = curry((fn, arr) => arr.map(fn));

module.exports = {
  pipe,
  curry,

  map,
};
