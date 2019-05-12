const path = require('path');

var config = {
  entry : {
    websim: './websim.js'
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    inline: true
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: "/node_modules/",
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  mode: 'development'
}

var scratchOutput = Object.assign({}, config, {
  name: "ScratchAPP",
  output: {
    path: path.join(__dirname, "../Scratch/build/"),
    filename: "[name].bundle.js"
  }
});

var jsOutput = Object.assign({}, config, {
  name: "JavaScriptAPP",
  output: {
    path: path.join(__dirname, "../JavaScript/build/"),
    filename: "[name].bundle.js"
  }
});

module.exports = [scratchOutput, jsOutput];
