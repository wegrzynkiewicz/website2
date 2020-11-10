const glob = require('glob-promise');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

async function getEntries() {
    const entries = {};
    const files = await glob('./**/*.entry.*');
    for (const file of files) {
        const fileName = path.basename(file);
        const entryName = fileName.split(/\./)[0];
        entries[entryName] = entries[entryName] || [];
        entries[entryName].push(file);
    }
    return entries;
}

async function generate(options) {
    return {
        entry: await getEntries(),
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash:6].[ext]',
                        publicPath: '/a',
                        outputPath: '../a',
                    },
                }
            ],
        },
        output: {
            path: path.resolve(__dirname, 'dist/b/'),
            publicPath: '/b/',
            filename: '[contenthash:6].js',
        },
        plugins: [
            new CleanWebpackPlugin(),
            new AssetsPlugin({
                filename: './build/assets.json',
                prettyPrint: true,
            }),
            new MiniCssExtractPlugin({
                filename: '[contenthash:6].css',
            }),
        ],
        resolve: {
            extensions: ['.js', '.scss'],
        }
    }
}

module.exports = async (options) => {
    return await Promise.all([
        generate(options),
    ])
};
