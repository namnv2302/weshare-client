const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    plugins: [
        {
            plugin: {
                overrideWebpackConfig: ({
                    webpackConfig,
                    context: { env },
                }: {
                    webpackConfig: any;
                    context: { env: string };
                }) => {
                    webpackConfig.resolve.plugins = [
                        ...webpackConfig.resolve.plugins,
                        new TsconfigPathsPlugin({
                            configFile: './tsconfig.json',
                            extensions: ['.ts', '.tsx'],
                        }),
                    ];
                    return webpackConfig;
                },
            },
            options: {},
        },
    ],
};

export {};
