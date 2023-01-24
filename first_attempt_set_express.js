// Перша спроба, використовую свої функції

'use strict';

const axios = require('axios');
const express = require('express');

const config = require('./config');
// const { map, pipe, curry } = require('./helper');

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const curry = (fn) => (...args) => fn.bind(null, ...args);

const map = curry((fn, arr) => arr.map(fn));

const initExpress = () => express();

const getPortAndHostFromConfig = c => ({
  host: c.app.host,
  port: c.app.port,
});

const listRoutes = [{
  type: 'GET',
  route: '/tickets',
}];

// const setRoutes = curry((listRoutes, expressInstance) => map(setRoute));

// const setRoute = route => {
//   console.log('route', route);
// };

const setRoute = curry((listRoutes, expressInstance) => {
  console.log(listRoutes);
  // str.split(splitOn))
});

// const setRoutes = map(setRoute);

const setRoutes = curry((listRoutes, expressInstance) => {
  return map(setRoute, listRoutes);
});

const kickServer = pipe(
  initExpress,
  setRoutes(listRoutes),
);

kickServer();
