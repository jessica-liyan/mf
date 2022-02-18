var path = require('path');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

var serverConfig = {
  entry: ['@babel/polyfill', path.resolve(__dirname, 'server/index')],
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'public/server'),
    filename: 'index.js',
    publicPath: '/',
  },
  externals: ['enhanced-resolve'],
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|GeneralJS|Global)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/index',
      },
      //shared: ["react", "react-dom"],
    }),
  ],
};

module.exports = [serverConfig];
