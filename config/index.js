module.exports = {
  app: {
    host: 'localhost',
    websocketPort: 3000,
    port: process.env.APP_PORT,
    environment: process.env.NODE_ENV,
  },
};
