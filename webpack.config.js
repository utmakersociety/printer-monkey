var webpack = require("webpack");
module.exports = {
 entry: {
   dashboard: './ts/dashboard.ts',
   model_upload: './ts/upload-print.ts'
  },
  devtool: 'inline-source-maps',
  output: {
   filename: 'public/js/[name].js',
   path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".tsx", ".ts", ".js"]
  },
  /*
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.js$/,
      minimize: true
    })
  ] 
  */
};

