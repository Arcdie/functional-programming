'use strict';

const fs = require('node:fs');

/* fp */
const pipe = (...fns) => (...x) => {
  // console.log('pipe', x);

  return fns.reduce((v, f) => {
    // console.log('v', v, 'f', f);
    return f(v);
  }, x);
}

const curry = (fn) => {
  return (...args) => {
    // console.log('...args', ...args);
    return fn.bind(null, ...args);
  }
};

const sum = ([a, b]) => {
  // console.log('a', a, 'b', b);
  return a + b;
}

const add = sum => {
  // console.log('sum', sum);
  return sum + 5;
}

const calc = pipe(
  curry(sum)(),
  add,
  // add,
);

// console.log(curry(sum)(1, 2));

// console.log('calc', calc());

// const r = calc(0);
const r = calc(1, 2);

console.log('r', r);

// console.log(curry(sum(1, 2)));
// console.log(main('./Abstractions/JavaScript/cities.csv'));
