'use strict';

module.exports = {
  appDb: 'mongodb://localhost/agcloud-dev',
  loggerLevel: 'debug',
  app: {
    title: 'zhuzhuqs - Development Environment'
  },
  port: process.env.PORT || 3001
};

