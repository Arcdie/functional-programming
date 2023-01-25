/*
const setRoutes = R.curry((listRoutes, app) =>
  R.map(route =>
    R.equals(R.prop('type')(route), 'GET')
      ? app.get(route.route, route.handler)
      : app.post(route.route, route.handler)
));

R.ifElse(
  R.equals(R.prop('type')(route), 'GET'),
  expressInstance.get(route.route, route.handler),
  expressInstance.post(route.route, route.handler),
)(route);

const setRoute = (route, expressInstance) =>
  R.equals(R.prop('type')(route), 'GET')
    ? expressInstance.get(route.route, route.handler)
    : expressInstance.post(route.route, route.handler);

const setRoutes = R.curry((listRoutes, expressInstance) =>
  R.map(r => setRoute(r, expressInstance))(listRoutes)
);
*/
