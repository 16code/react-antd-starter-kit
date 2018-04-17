/* eslint no-use-before-define:0 , no-unused-vars: 0 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CompressionPlugin = require('compression-webpack-plugin');
const srcPath = path.join(__dirname, './src');
const distPath = path.join(__dirname, './dist');
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
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
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
            'react', 
            'react-dom', 
            'react-router-dom', 
            // 'redux', 
            // 'react-redux', 
            // 'redux-thunk'
        ],
        app: ['./src/index.jsx']
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
            // watchOptions: {
            //     aggregateTimeout: 300,
            //     poll: 1000
            // }
        },
        resolve: {
            symlinks: false,
            extensions: ['.js', '.jsx', '.less'],
            modules: ['node_modules', srcPath],
            alias: {
                react: isMock ? 'react' : nodeModulesPath('/react/umd/react.production.min.js'),
                'react-dom': isMock ? 'react-dom' : nodeModulesPath('/react-dom/umd/react-dom.production.min.js'),
                'react-router-dom': isMock
                    ? nodeModulesPath('/react-router-dom/index.js')
                    : nodeModulesPath('/react-router-dom/umd/react-router-dom.min.js'),
                redux: nodeModulesPath('/redux/dist/redux.min.js'),
                'react-redux': nodeModulesPath('/react-redux/dist/react-redux.min.js'),
                'redux-thunk': nodeModulesPath('/redux-thunk/dist/redux-thunk.min.js'),
                components: path.join(__dirname, 'src/components'),
                actions: path.join(__dirname, 'src/actions'),
                config: path.join(__dirname, 'src/config'),
                reducers: path.join(__dirname, 'src/reducers'),
                pages: path.join(__dirname, 'src/pages'),
                store: path.join(__dirname, 'src/store'),
                utils: path.join(__dirname, 'src/utils'),
                libs: path.join(__dirname, 'src/libs'),
                UI: path.join(__dirname, 'src/UI.js')
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
                    use: isMock ? ['style-loader', 'css-loader', 'less-loader'] : cssLoaderConfig,
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

function apiBuilder(env) {
    const apiMap = {
        CLIENT_ID: 'cc95370ca37c409eb399ba7ad210ddd7',
        API_GATEWAY: '//172.16.2.47:2015',
        API_ACCOUNT: '//172.16.2.69:5006'
    };
    switch (true) {
        case env.test:
            apiMap.CLIENT_ID = 'cc95370ca37c409eb399ba7ad210ddd7';
            apiMap.API_GATEWAY = '//staging.feelbus.cn:5010';
            apiMap.API_ACCOUNT = '//staging.feelbus.cn:5006';
            break;
        case env.preview:
            apiMap.CLIENT_ID = '55d584fa0d074d71bebcaeea613013c3';
            apiMap.API_GATEWAY = '//preview.feelbus.cn:5010';
            apiMap.API_ACCOUNT = '//preview.feelbus.cn:5006';
            break;
        case env.prod:
            apiMap.CLIENT_ID = '55d584fa0d074d71bebcaeea613013c3';
            apiMap.API_GATEWAY = '//igw.feiniubus.com';
            apiMap.API_ACCOUNT = '//passport.feiniubus.com';
            break;
    }
    Object.keys(apiMap).forEach(k => (apiMap[k] = JSON.stringify(apiMap[k])));
    return apiMap;
}
module.exports = webpackConfig;
