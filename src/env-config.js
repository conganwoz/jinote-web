const config = {};

if (process.env.NODE_ENV == 'development') {
  config.API_URL = 'http://192.168.1.233:8000/api';
  config.WS_URL = 'ws://192.168.1.233:8000';
} else {
  config.API_URL = 'https://murmuring-citadel-47808.herokuapp.com/api';
  config.WS_URL = '';
}

module.exports = config;
