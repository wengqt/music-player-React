/**
 * Created by weng on 2017/3/30.
 */
var webpack = require('webpack')


module.exports = {
    entry: "./index.js",
    output: {
        filename: "./bundle.js",
        path: __dirname + "/dist",
        publicPath: "/dist"
    },
    devServer: {
        host: '0.0.0.0',
        hot: true,
        inline: true,
        historyApiFallback: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}
