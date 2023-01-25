'use strict';

const R = require('ramda');
const axios = require('axios');
const express = require('express');

const config = require('./config');
const {getTickets} = require('./api');

const getPortAndHostFromConfig = c => ({
  host: c.app.host,
  port: c.app.port,
});

const getTicketsHandler = async (req, res) => {
  const { performanceId } = req.query;
  res.json(await getTickets(performanceId));
};

const listRoutes = [{
  type: 'GET',
  route: '/tickets',
  handler: getTicketsHandler,
}];

const initExpress = () => express();
const listen = R.curry(({ port, host }, app) => app.listen(port, host));

const setRoutes = R.curry((listRoutes, app) => {
  R.map(route =>
    R.equals(R.prop('type')(route), 'GET')
      ? app.get(route.route, route.handler)
      : app.post(route.route, route.handler)
  )(listRoutes);

  return app;
});

const runServer = R.pipe(
  initExpress,
  setRoutes(listRoutes),
  listen(getPortAndHostFromConfig(config)),
);

runServer();
