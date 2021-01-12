const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require('./package.json');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8081,
  },
  output: {
    publicPath: 'http://localhost:8181/',
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
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      // remotes: {
      //   gw1: 'gw1@http://localhost:8082/remoteEntry.js',
      // },
      exposes: {
        './GreetingAppOne': '../components/GreetingAppOne',
      },
      shared: dependencies,
    }),
  ],
};
