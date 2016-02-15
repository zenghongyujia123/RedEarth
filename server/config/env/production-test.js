'use strict';

module.exports = {
  appDb: 'mongodb://localhost/redearth-test',
  loggerLevel: 'debug',
  app: {
    title: 'zhuzhuqs - Development Environment'
  },
  port: process.env.PORT || 3002
};
