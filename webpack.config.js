const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // for exports fo objact of webpack config
  entry: "./index.js", // entry point for app for start create bundle
  output: {
    path: path.join(__dirname, "/dist"), // path for output bundle folder to store
    filename: "bundle.js", // bundle file
    publicPath: "/",
    assetModuleFilename: "assets/img/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "defaults",
                  debug: true,
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    hot: true,
    port: 8192,
    open: true,
    historyApiFallback: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      "/api": "http://localhost:8000",
      changeOrigin: true,
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "index.html",
      favicon: "./src/asserts/images/logo.ico",
    }),
    new MiniCssExtractPlugin(),
  ],
};
