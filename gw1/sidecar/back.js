const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require('./package.json');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
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
      name: 'app2',
      filename: 'remoteEntry.js',
      remotes: {
        app1: 'app1',
      },
      exposes: {
        './GreetingAppTwo': '../components/GreetingAppTwo',
        './Metrics': '../components/Metrics',
      },
      shared: [
        {
          ...dependencies,
          react: { singleton: true, requiredVersion: dependencies.react },
          'react-dom': { singleton: true, requiredVersion: dependencies['react-dom'] },
          'graphql/generated/queryHandler': '../graphql/generated/queryHandler',
          '../utils': '../utils',
        },
      ],
    }),
  ],
};
