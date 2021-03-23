/**
 * @Author lester
 * @Date 2020-07-17
 */

const { override, addLessLoader, addWebpackAlias, addBundleVisualizer, fixBabelImports } = require('customize-cra');
const path = require("path");
const paths = require('react-scripts/config/paths');
paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');

const addCustomise = () => config => {
  if (process.env.NODE_ENV === 'production' && process.env.analyze !== 1 ) {
    config.devtool = false;
  }
  config.output.path = path.join(__dirname, 'dist');
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  loaders[0].options.limit = 100;
  loaders[loaders.length - 2].test = /\.less$/;
  // loaders[loaders.length - 2].exclude =[/node_modules/];
  loaders[loaders.length - 2].use[1] = {
    ...loaders[loaders.length - 2].use[1],
    options: {
      importLoaders: 2,
      modules: {
        localIdentName: '[path]_[name]_[local]_[hash:base64:5]'
      },
    }
  };
  return config;
};

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      localIdentName: '[local]--[hash:base64:5]',
      modifyVars: {
        "@primary-color": "#1890ff",
      }
    },

  }),
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, 'src')
  }),
  process.env.analyze === 1 && addBundleVisualizer({}, 1),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: 'css',
  }),
  /*...addBabelPresets([
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
      corejs: 3
    }
  ]),*/
  addCustomise()
);
