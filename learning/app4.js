'use strict';

const fs = require('node:fs');
const path = './Abstractions/JavaScript/cities.csv';

/* fp */
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const curry = (fn) => (...args) => fn.bind(null, ...args);

const map = curry((fn, arr) => arr.map(fn));
const split = curry((splitOn, str) => str.split(splitOn));
const filter = curry((filterFn, arr) => arr.filter(filterFn));

/* utility */
const skipFirst = (arr) => arr.slice(1);
const hasValue = (val) => !!val;

const parseTableLines = map(split(','));

const toLines = pipe(
  split('\n'),
  skipFirst,
  filter(hasValue)
);

const readFile = (file) => fs.readFileSync(file, 'utf8');

const getDataset = pipe(
  readFile,
  toLines,
  parseTableLines
);

const main = pipe(
  getDataset,
);

console.log(main(path));
