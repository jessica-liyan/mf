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
      name: 'app1',
      library: { type: 'commonjs-module' },
      filename: 'remoteEntry.js',
      remotes: {
        app2: path.resolve(__dirname, '../app2/public/server/remoteEntry.js'),
        app3: path.resolve(__dirname, '../app3/dist/remoteEntry.js')
      },
      //shared: ["react", "react-dom"],
    }),
  ],
};

module.exports = [serverConfig];
