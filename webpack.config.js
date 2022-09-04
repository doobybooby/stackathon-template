const Dotenv = require('dotenv-webpack')

module.exports = (env) => {
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
        },
      ]
    },
    plugins: [
      new Dotenv()
    ]
  }
}
