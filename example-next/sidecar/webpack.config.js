const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require('./package.json');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
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
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'example_next',
      filename: 'remoteEntry.js',
      remotes: {
        app1: 'app1',
      },
      exposes: {
        './Button': '../components/Button',
      },
      shared: dependencies,
    }),
  ],
};
