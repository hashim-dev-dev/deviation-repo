// const { css } = require("jquery");

// module.exports = {
//     //entry: "./src/components/App.js",
//     // watch: true,
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 exclude: /node_modules/,
//                 //loader: 'babel-loader'
//                 use: [
//                     {loader: 'babel-loader'}
//                     //{loader: 'sass-loader'}
//                     //{loader: 'style-loader'}
//                 ]
//                 // },
//                 // query: {
//                 //     presets: ['react', 'es2015', 'react-hmre'],
//                 //     plugins: ['transform-class-properties']
//                 // }
//                 // options: {
//                 //     presets: ['env', 'react', 'es2015'],
//                 //     plugins: ['transform-class-properties']
//                 // }
//             },
//             {
//                 test: /\.css$/,
//                 //exclude: /node_modules/,
//                 include: "/leadmanager/frontend/src/assets/css",
//                 use: [
//                     {loader: 'css-loader'},
//                     {loader: 'style-loader'}
//                 ]
//             }
//             // {
//             //     test: /\.scss$/,
//             //     exclude: /node_modules/,
//             //     include: "/leadmanager/frontend/src/assets/sass",
//             //     use: [
//             //         {loader: 'sass-loader'},
//             //         {loader: 'style-loader'}
//             //     ]
//             // }
//     //         {
//     //             test: /\.css$/,
//     //             include: "/leadmanger/frontend/src/assets/css", 
//     //             use: ['style-loader', 'css-loader']
//     //         },
//     //         {
//     //             test: /\.(scss)$/,
//     //             include: "/leadmanager/frontend/src/assets/sass",
//     // use: [{
//     //   loader: 'style-loader', // inject CSS to page
//     // }, {
//     //   loader: 'css-loader', // translates CSS into CommonJS modules
//     // }, {
//     //   loader: 'postcss-loader', // Run post css actions
//     //   options: {
//     //     plugins: function () { // post css plugins, can be exported to postcss.config.js
//     //       return [
//     //         require('precss'),
//     //         require('autoprefixer'),
//     //         require('babel-plugin-transform-import-css')
//     //       ];
//     //     }
//     //   }
//     // }, {
//     //   loader: 'sass-loader' // compiles Sass to CSS
//     // }]
//     //         }
//         ]
//     }
// }


//const ExtractTextPlugin = require('extract-text-webpack-plugin');

// module.exports = {
//     module: {
//         rules: [
//             {
//                 test: /\.(js|jsx)$/,
//                 use: {
//                     loader: 'babel-loader'
//                 },
//                 exclude: /node_modules/
//                 //include: path.join(__dirname, 'src')
//             },
//             {
//                 test: /\.scss$/,
//                 loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
//             }
//         ]
//     },
    
//     plugins: [
//         new ExtractTextPlugin('bundle.css'),
//     ]

// }

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    output: {
        publicPath: ''
    },
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
        {
        test: /\.(js|jsx)$/,
        use: {
        loader: 'babel-loader'
        },
        exclude: /node_modules/
    },
                        
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader']
          
    },
    {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 100000,
                name: '[name].[ext]'
            }
        }
    },
    {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }
    }
    ],
  },
  devServer: {
      writeToDisk: true
  }
};

