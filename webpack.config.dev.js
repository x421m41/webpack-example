const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src/index.js'
  ],
  devServer: {
    contentBase: './static',
    compress: true,
    port: 3000
  },
  plugins: [
    new CleanWebpackPlugin(['static']),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './public/index.html'
    }),
    new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.(js|html)$/,
			threshold: 10240,
			minRatio: 0.8
		})
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/bundle.js',
    pathinfo: true,
    publicPath: '/',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              ["env", {
                "targets": {
                  "browsers": "ie >= 11"
                }
              }],
              "react"
            ],
            "plugins": [
              "transform-class-properties"
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
