const path = require('path');

var configWebsim = {
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

var configScratch = {
  entry : {
    editor: path.join(__dirname, "../Scratch/js/editor.js")
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
        exclude: "/node_modules/"
      }
    ]
  },
  mode: 'development'
}

var configJavaScript = {
  entry : {
    editor: path.join(__dirname, "../JavaScript/js/editor.js")
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
        exclude: "/node_modules/"
      }
    ]
  },
  mode: 'development'
}

var scratchOutput = Object.assign({}, configWebsim, {
  name: "ScratchAPP",
  output: {
    path: path.join(__dirname, "../Scratch/build/"),
    filename: "[name].bundle.js"
  }
});

var jsOutput = Object.assign({}, configWebsim, {
  name: "JavaScriptAPP",
  output: {
    path: path.join(__dirname, "../JavaScript/build/"),
    filename: "[name].bundle.js"
  }
});

var scratchEditor = Object.assign({}, configScratch, {
  name: "ScratchEditor",
  output: {
    path: path.join(__dirname, "../Scratch/build"),
    filename: "[name].bundle.js"
  }
});

var jsEditor = Object.assign({}, configJavaScript, {
  name: "JavaScriptEditor",
  output: {
    path: path.join(__dirname, "../Scratch/build"),
    filename: "[name].bundle.js"
  }
});


module.exports = [scratchOutput, jsOutput, scratchEditor, jsEditor];
