const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = (env, options) => {
    const isProd = options.mode === 'production'
    const config = {
        devtool: isProd ? false : 'source-map',
        entry: ['./src/index.js', './styles/style.scss'],
        output: {
            filename: 'main.js',
            path: path.join(__dirname, 'dist'),
            clean: true,
        },
        devServer: {
            compress: true,
            port: 9000,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { targets: 'defaults' }],
                            ],
                        },
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: 'asset/resource',
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html',
            }),
            new MiniCssExtractPlugin(),
            new CopyPlugin({
                patterns: [{ from: 'src/img', to: 'img' }],
            }),
        ],
    }
    return config
}
