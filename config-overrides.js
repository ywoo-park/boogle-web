const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#1DA57A"
      ,"@radio-button-color": "#1DA57A",
      "@radio-button-bg": "#1DA57A"
    },
    javascriptEnabled: true,
  })(config, env);

  return config;
};