const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const { SourceMapDevToolPlugin } = require('webpack');
const { dependencies } = require('./package.json');

// add configuration in order to generate the source map
// see https://stackoverflow.com/questions/61767538/devtools-failed-to-load-sourcemap-for-webpack-node-modules-js-map-http-e

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 8082,
  },
  output: {
    publicPath: 'http://localhost:8082/',
    filename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      {
        test: /remoteEntry|vendors-node_modules_react_index_js|main|vendors-node_modules_apollo_client_index_js\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'gateway',
      filename: 'remoteEntry.js',
      remotes: {
        app1: 'app1',
      },
      exposes: {
        './DashboardService': '../components/DashboardService',
      },
      shared: {
        '@apollo/client': { singleton: true, requiredVersion: dependencies['@apollo/client'] },
        '@apollo/link-schema': {
          singleton: true,
          requiredVersion: dependencies['@apollo/link-schema'],
        },
        '@apollo/react-ssr': {
          singleton: true,
          requiredVersion: dependencies['@apollo/react-ssr'],
        },
        '@material-ui/core': {
          singleton: true,
          requiredVersion: dependencies['@material-ui/core'],
        },
        '@material-ui/icons/Assessment': {
          singleton: true,
          requiredVersion: dependencies['@material-ui/icons/Assessment'],
        },
        '@material-ui/icons/ChangeHistory': {
          singleton: true,
          requiredVersion: dependencies['@material-ui/icons/ChangeHistory'],
        },
        '@material-ui/icons': {
          singleton: true,
          requiredVersion: dependencies['@material-ui/icons'],
        },
        '@material-ui/lab': { singleton: true, requiredVersion: dependencies['@material-ui/lab'] },
        formik: { singleton: true, requiredVersion: dependencies.formik },
        'formik-material-ui': {
          singleton: true,
          requiredVersion: dependencies['formik-material-ui'],
        },
        'formik-material-ui-lab': {
          singleton: true,
          requiredVersion: dependencies['formik-material-ui-lab'],
        },
        lodash: { singleton: true, requiredVersion: dependencies.lodash },
        react: { singleton: true, requiredVersion: dependencies.react },
        'react-dom': { singleton: true, requiredVersion: dependencies['react-dom'] },
      },
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
};
