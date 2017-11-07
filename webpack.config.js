// webpack.config.js
module.exports = {
  entry: './index.js',
  output: {
    filename: './js/simonGame.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};