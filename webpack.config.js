const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'build'),
    hot: true,
    open: true, // Automatically open the browser
    port: 8080, // You can specify a port
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match .js and .jsx files
        exclude: /node_modules/, // Exclude the node_modules folder
        use: {
          loader: 'babel-loader', // Use babel-loader for transpiling
          options: {
            presets: [
              '@babel/preset-env', // Preset for ES6+ syntax
              '@babel/preset-react', // Preset for React
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i, // Match .scss and .sass files
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles Sass to CSS
        ],
      },
      {
        test: /\.css$/, // Match .css files
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'build/index.html'), // Point to your existing HTML file
      inject: false, // Do not inject scripts automatically
    }),
  ],
};
