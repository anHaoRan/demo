var node_env = process.env.NODE_ENV || 'development';
var config = {
  production: {
    api: 'https://mobile.hotread.com/',
    port: 4001,
    assets:'',
    configType:'production'
  },
  development: {
    api: 'https://txwap.hotread.com',
    port: 4001,
    assets:'',
    configType:'development'
  }
};

exports = module.exports = config[node_env];
exports.env = node_env;
