const R = require('ramda');

const sum = (a, b) => {
  // console.log('a', a, 'b', b);
  return a + b;
}

const add = sum => {
  // console.log('sum', sum);
  return sum + 5;
}

/*
// 1
const calc = R.pipe(
  sum,
  R.tap(x => console.log('x', x)),
  add,
  R.tap(x => console.log('x', x)),
);

console.log(calc(1, 2));
// */

/*
// 2
const pipeWhileNotNil = R.pipeWith((f, res) => R.isNil(res) ? res : f(res));

const f = pipeWhileNotNil([
  Math.pow,
  R.tap(x => console.log('x', x)),
  R.negate,
  R.tap(x => console.log('x', x)),
  R.inc,
  R.tap(x => console.log('x', x)),
]);

f(3, 4);
// */

// /*
// 3
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];

const get = R.curry((property, object) => {
  console.log(property, object);

  return object[property];
});

const map = R.curry((fn, values) => {
  // console.log(fn, values);
  console.log('values', values);
  return values.map(fn);
});

const getR = get('id');
console.log('getR', getR(objects[0]));

console.log('getR', getR);

const getIds = map(getR);

// const result = objects.map(get('id'));
// const result = getIds(objects);

// console.log(result);
// */
