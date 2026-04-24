const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

module.exports = {
  entry: "./src/main.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new webpack.DefinePlugin({
      "import.meta.env.VITE_BASE_URL": JSON.stringify(process.env.VITE_BASE_URL || ""),
      "import.meta.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL || ""),
      "import.meta.env.VITE_GOOGLE_MAPS_API_KEY": JSON.stringify(
        process.env.VITE_GOOGLE_MAPS_API_KEY || ""
      ),
    }),
  ],
  devServer: {
    port: 5173,
    open: true,
    historyApiFallback: true,
    hot: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
};
