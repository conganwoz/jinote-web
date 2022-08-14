const config = {};

if (process.env.NODE_ENV == 'development') {
  config.API_URL = 'http://127.0.0.1:8000/api';
} else {
  config.API_URL = '';
}

module.exports = config;
