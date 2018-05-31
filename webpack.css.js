const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const stylePath = path.join(__dirname, './src/styles');
const cssLibPath = path.join(__dirname, './libs/css');
const excludeFiles = [
    'calendar', 'carousel', 'cascader', 'affix', 'anchor', 'back-top',
    'locale-provider', 'mention', 'slider', 'transfer', 'tree-select'
];
function webpackConfig() {
    const redirectFile = path.join(__dirname, 'src/styles/empty.less');
    const excludeFilesMap = {};
    excludeFiles.forEach(file => {
        excludeFilesMap[`../${[file]}/style/index.less`] = redirectFile;
    });
    return {
        entry: path.join(stylePath, 'antd.less'),
        output: {
            path: cssLibPath,
            filename: 'antd.[chunkhash:5].css'
        },
        resolve: {
            alias: excludeFilesMap
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => [
                                        autoprefixer({
                                            browsers: ['Firefox >= 55', 'Chrome >= 55', 'Safari >= 10']
                                        })
                                    ]
                                }
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    javascriptEnabled: true,
                                    modifyVars: {
                                        '@icon-url': '\'../../../../../src/styles/fonts/iconfont\''
                                    }
                                }
                            }
                        ]
                    })
                },
                {
                    test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: { limit: 8192, name: 'fonts/[name].[ext]?[hash:5]' }
                        }
                    ]
                }
            ]
        },
        resolveLoader: {
            moduleExtensions: ['-loader']
        },
        plugins: [
            new CleanWebpackPlugin([cssLibPath]),
            new ExtractTextPlugin('antd.[chunkhash:5].css'),
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.css$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ],
        cache: true
    };
}

module.exports = webpackConfig;