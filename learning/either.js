// Either Data Structure - Core

const TAG = Symbol.for('either-tag'),
      VALUE = Symbol.for('either-value')

const err = e => { throw new Error(e) }

//data
const me = {
  name: 'Ross',
  faveGroups: [
    { name: 'Plini', genre: 'Prog. Metal' },
    { name: 'Aesop Rock', genre: 'Hip Hop/Rap' },
    { name: 'Hiatus Kaiyote', genre: 'LoFi/Alt' },
    { name: 'Cake', genre: 'Alt/Americana' }
  ]
}

function Left(x) {
  this[TAG]   = 'Left'
  this[VALUE] = x;

  this.map = function(f) { return this };
  this.unwrap = function() { return this[VALUE] };
  this.chain = function(f) { return this };
}

function Right(x) {
  this[TAG]   = 'Right'
  this[VALUE] = x;

  this.map = function(f) { return Either.of(f(this[VALUE])) };
  this.unwrap = function() { return this[VALUE] };
  this.chain = function(f) { return this.map(f).unwrap() };

}

const Either = {
  of:      x => new Right(x),
  left:    x => new Left(x),
  isLeft:  x => x[TAG] && x[TAG] === 'Left',
  isRight: x => x[TAG] && x[TAG] === 'Right',

  either: (lfn, rfn, x) => Either.isLeft(x) ? lfn(x[VALUE]) : Either.isRight(x)
    ? rfn(x[VALUE]) : err('expected instance of Either')
}

// Either Data Structure - Usage

// ops
const intercalate = ch => str =>
  str.split('').join(ch)
const toUpper = str => str.toUpperCase()
const comp2 = (a, b) => x => a(b(x))

// Construction
const ofMe = Either.of(me)

// Chainable Error Handling
const eitherFaveGroups = x => x.faveGroups ? Either.of(x.faveGroups) : Either.left('faveGroups not present')

// left keeps its value when chained or mapped
const eitherName = x => x.name ? Either.of(x.name) : Either.left('name not present')

const byName = (name, xs) => xs.find(x => x.name === name)

const eitherBand = name => xs => {
  // console.log('name', name);
  // console.log('xs', xs);

  const maybeBand = byName(name, xs);

  return maybeBand ? Either.of(maybeBand) : Either.left('no band with name ' + name);
}

// Complex error handling on extraction

const uppercalatedBandName =
  ofMe.chain(eitherFaveGroups)
      .chain(eitherBand('Cake'))
      .chain(eitherName)
      .map(comp2(intercalate('/'), toUpper))

  // console.log('uppercalatedBandName', uppercalatedBandName);

const lefted =
  ofMe.chain(eitherFaveGroups)
      .chain(eitherBand('Enya'))
      .chain(eitherName)
      .map(comp2(intercalate('/'), toUpper));

Either.either(
  console.warn, console.log, uppercalatedBandName
) //=> C/A/K/E

Either.either(
  console.warn, console.log, lefted
) //=> Warn('no band with name Enya')
