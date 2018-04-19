/* eslint no-use-before-define:0 , no-unused-vars: 0 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const srcPath = path.join(__dirname, './src');
const distPath = path.join(__dirname, './dist');
const libPath = path.join(__dirname, './libs');

const cssLoaderConfig = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                plugins: () => [
                    autoprefixer({
                        browsers: ['last 3 version']
                    })
                ]
            }
        },
        'less-loader'
    ]
});

function webpackConfig(env) {
    const isMock = env.mock;
    const plugins = [
        new webpack.DefinePlugin({
            __MOCK__: isMock,
            'process.env': {
                NODE_ENV: isMock ? JSON.stringify('development') : JSON.stringify('production')
            }
        }),
        new CopyWebpackPlugin(
            [
                {
                    from: path.resolve(libPath),
                    to: path.join(distPath, 'assets/libs/'),
                    toType: 'dir'
                }
            ],
            {
                ignore: ['.DS_Store', '*.DS_Store', '**/locale/*']
            }
        ),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new AddAssetHtmlPlugin([
            {
                filepath: path.resolve(libPath, 'moment/moment.*.js'),
                outputPath: '/assets/libs/moment',
                publicPath: '/assets/libs/moment',
                includeSourcemap: false
            },
            {
                filepath: path.resolve(libPath, 'css/antd.*.css'),
                outputPath: '/assets/libs/css',
                publicPath: '/assets/libs/css',
                includeSourcemap: false,
                typeOfAsset: 'css'
            }
        ]),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            moment: 'moment'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            noParse: /node_modules/,
            options: {
                postcss: () => [
                    autoprefixer({
                        browsers: ['last 3 version']
                    })
                ]
            }
        }),
        new ExtractTextPlugin({
            filename: isMock ? '[name].css' : 'assets/vendor/[name].[chunkhash:5].css',
            allChunks: true
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
    ];
    const entry = {
        vendor: [
            './src/polyfills.js',
            './src/vendor.js'
            // 'redux',
            // 'react-redux',
            // 'redux-thunk'
        ],
        app: ['./src/styles/index.less', './src/index.jsx']
    };
    // 开发环境
    if (isMock) {
        const hotPlugins = [new webpack.NamedModulesPlugin()];
        entry.app.unshift('react-hot-loader/patch');
        plugins.push(...hotPlugins);
    } else {
        const productionPlugins = [
            new CleanWebpackPlugin([distPath]),
            new webpack.NoEmitOnErrorsPlugin(),
            new UglifyJSPlugin({
                cache: '.uglifycache',
                sourceMap: true,
                uglifyOptions: {
                    comments: false,
                    ecma: 5,
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: {
                        drop_console: true,
                        warnings: false,
                        conditionals: true,
                        unused: true,
                        comparisons: true,
                        sequences: true,
                        dead_code: true,
                        evaluate: true,
                        if_return: true,
                        join_vars: true
                    }
                }
            }),
            new CompressionPlugin({
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ];
        plugins.push(...productionPlugins);
    }
    return {
        entry,
        mode: isMock ? 'development' : 'production',
        output: {
            path: distPath,
            filename: isMock ? '[name].js' : 'assets/vendor/[name].[chunkhash:5].js',
            chunkFilename: isMock ? '[name].chunk.js' : 'assets/js/[name].[chunkhash:5].chunk.js',
            publicPath: '/'
        },
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            contentBase: distPath,
            publicPath: '/',
            historyApiFallback: true,
            port: 8181,
            disableHostCheck: true,
            https: false,
            stats: 'errors-only',
            clientLogLevel: 'error'
        },
        resolve: {
            symlinks: false,
            extensions: ['.js', '.jsx', '.less'],
            modules: ['node_modules', srcPath],
            alias: {
                react: isMock ? 'react' : nodeModulesPath('/react/umd/react.production.min.js'),
                'react-dom': isMock ? 'react-dom' : nodeModulesPath('/react-dom/umd/react-dom.production.min.js'),
                'react-router-dom': isMock
                    ? 'react-router-dom'
                    : nodeModulesPath('/react-router-dom/umd/react-router-dom.min.js'),
                redux: nodeModulesPath('/redux/dist/redux.min.js'),
                'react-redux': nodeModulesPath('/react-redux/dist/react-redux.min.js'),
                'redux-thunk': nodeModulesPath('/redux-thunk/dist/redux-thunk.min.js'),
                components: path.join(__dirname, 'src/components'),
                containers: path.join(__dirname, 'src/containers'),
                layouts: path.join(__dirname, 'src/layouts'),
                common: path.join(__dirname, 'src/common'),
                actions: path.join(__dirname, 'src/actions'),
                config: path.join(__dirname, 'src/config'),
                reducers: path.join(__dirname, 'src/reducers'),
                routes: path.join(__dirname, 'src/routes'),
                store: path.join(__dirname, 'src/store'),
                utils: path.join(__dirname, 'src/utils'),
                libs: path.join(__dirname, 'src/libs'),
                styles: path.join(__dirname, 'src/styles')
            }
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: ['eslint-loader', 'source-map-loader'],
                    enforce: 'pre',
                    exclude: /(node_modules|src\/libs|libs)/
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|src\/libs|libs)/,
                    include: srcPath,
                    use: [
                        {
                            loader: 'cache-loader',
                            options: {
                                cacheDirectory: path.resolve('.jscache')
                            }
                        },
                        {
                            loader: 'babel-loader',
                            options: {
                                extends: path.join(__dirname, '.babelrc')
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    include: srcPath,
                    use: isMock
                        ? [
                              'style-loader',
                              'css-loader',
                              {
                                  loader: 'less-loader',
                                  options: {
                                      javascriptEnabled: true
                                  }
                              }
                          ]
                        : cssLoaderConfig,
                    exclude: /(node_modules)/
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    include: srcPath,
                    exclude: /(fonts)/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                limit: 8124,
                                name: 'assets/images/[name].[hash:5].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        resolveLoader: {
            moduleExtensions: ['-loader']
        },
        externals: {
            moment: true
        },
        plugins,
        cache: true,
        watch: false,
        devtool: isMock ? 'source-map' : 'source-map'
    };
}

function nodeModulesPath(filePath) {
    return path.join(__dirname, 'node_modules', filePath);
}

module.exports = webpackConfig;
