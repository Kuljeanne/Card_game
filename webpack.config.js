const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = (env, options) => {
    const isProd = options.mode === 'production'
    const config = {
        devtool: isProd ? false : 'source-map',
        watch: true,
        entry: ['./src/index.ts', './styles/style.scss'],
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
        },
        devServer: {
            compress: true,
            port: 9000,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
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
