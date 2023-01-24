// Почав розбирати ramda

const R = require('ramda');
const axios = require('axios');
const express = require('express');

const config = require('./config');

const initExpress = () => express();

const getPortAndHostFromConfig = c => ({
  host: c.app.host,
  port: c.app.port,
});

const listRoutes = [{
  type: 'GET',
  route: '/tickets',
}];

const setRoute = R.curry((expressInstance, route) => {
  R.ifElse(
    R.prop('type', 'GET'),
    expressInstance.get(route.route),     // Тут до мене доходить, що контроллер треба прив'язати
    expressInstance.post(route.route),
  );
});

const setRoutes = R.curry((listRoutes, expressInstance) => {
  R.map(setRoute(expressInstance), listRoutes);
});

const kickServer = R.pipe(
  initExpress,
  setRoutes(listRoutes),
);

kickServer();
