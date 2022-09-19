const Dotenv = require('dotenv-webpack')
const dotenv = require('dotenv')
const webpack = require('webpack')

module.exports = () => {
  const env = dotenv.config().parsed;
  const envKeys = (Object.keys(env)||[]).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  
  return {
    entry: [
      './client/index.js'
    ],
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react'
            ]
          }
        }, {
          test: /\.png/,
          use: {
            loader: 'url-loader'
          },
        }, {
          test: /\.svg/,
          use: {
            loader: '@svgr/webpack'
          },
        },
      ]
    },
    plugins: [
      new Dotenv()
    ],
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ]
  }
}
