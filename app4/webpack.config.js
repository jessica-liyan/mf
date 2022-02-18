const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  // 入口文件
  entry: "./src/index",
  // 开发服务配置
  devServer: {
    // 项目 A 端口为 3001，项目 B 端口为 3002
    port: 3004,
    hot: true,
    open: true, // 启动服务后自动在浏览器打开
  },
  output: {
    publicPath: 'http://localhost:3004/',
  },
  module: {
    // 使用 babel-loader 转义
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    // 处理 html
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      // 提供给其他服务加载的文件
      filename: "remoteEntry.js",
      // 唯一ID，用于标记当前服务
      name: "app4",
      // 需要暴露的模块，使用时通过 `${name}/${expose}` 引入
      remotes: {
        app3: 'app3@http://localhost:3003/remoteEntry.js'
      },
      exposes: {
        "./App": "./src/App",
      },
      // remote暴露的文件要优先加载，增加bootstrap.js，通过index.js异步加载bootstrap.js
      shared: [
        'react',
        'react-dom',
      ]
    })
  ],
};
