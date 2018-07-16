var node_env = process.env.NODE_ENV || 'development';
var config = {
  production: {
    api: 'https://mobile.hotread.com/',
    port: 4001,
    assets:''
  },
  development: {
    api: 'https://txwap.hotread.com',
    port: 4001,
    assets:''
  },
  test: {
    api: 'https://txwap.hotread.com',
    port: 4001,
    assets:''
  }
};

exports = module.exports = config[node_env];
exports.env = node_env;
