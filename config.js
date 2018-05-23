var node_env = process.env.NODE_ENV || 'development';
var config = {
  production: {
    host: 'qdm16201944.my3w.com',
    user: 'qdm16201944',
    password: 'woshianhr',
    database: 'qdm16201944_db',
    insecureAuth: true
  },
  development: {
    host: 'qdm16201944.my3w.com',
    user: 'qdm16201944',
    password: 'woshianhr',
    database: 'qdm16201944_db',
    insecureAuth: true
  },
  test: {
    host: 'qdm16201944.my3w.com',
    user: 'qdm16201944',
    password: 'woshianhr',
    database: 'qdm16201944_db',
    insecureAuth: true
  }
};

exports = module.exports = config[node_env];
exports.env = node_env;