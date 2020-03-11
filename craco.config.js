const path = require('path');
const CracoLessPlugin = require("craco-less");
// eslint-disable-next-line no-undef
process.env.GENERATE_SOURCEMAP = "false";

module.exports = {
    webpack: {
        alias: {
            // eslint-disable-next-line no-undef
            '@': path.resolve(__dirname, 'src')
        },
        configure: {
            module: {
                rules: [
                    {
                        test: /\.less$/,
                        use: [
                            'style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        localIdentName: '[path]_[name]_[local]_[hash:base64:5]'
                                    },
                                    importLoaders: 1
                                }
                            },
                            'less-loader'
                        ]
                    }
                ]
            }
        }
    },
    babel: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [
            [
                "@babel/plugin-proposal-decorators",
                {
                    "legacy": true,
                }
            ],
            [
                "@babel/plugin-proposal-class-properties",
                {
                    "loose": true
                }
            ]
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    modifyVars: {
                        "@primary-color": "#1DA57A",
                        "@link-color": "#1DA57A",
                        "@border-radius-base": "1px"
                    },
                    javascriptEnabled: true
                }
            }
        }
    ]
};
