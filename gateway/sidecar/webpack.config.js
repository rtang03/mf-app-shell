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
        test: /\.js$/,
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
        './Gateway': '../components/Gateway',
      },
      shared: dependencies,
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],
};
