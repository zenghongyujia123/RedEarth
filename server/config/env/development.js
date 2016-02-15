'use strict';

module.exports = {
  appDb: 'mongodb://localhost/redearth-dev',
  loggerLevel: 'debug',
  app: {
    title: 'zhuzhuqs - Development Environment'
  },
  port: process.env.PORT || 3002
};
