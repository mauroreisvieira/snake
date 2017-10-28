var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry : {
        auth: './src/js/Auth.tsx',
        game: './src/js/Game.tsx',
        setting: './src/js/Setting.tsx',
        friend: './src/js/Friend.tsx',
        rating: './src/js/Rating.tsx'
    },

    output: {
        path: __dirname + "/dist/js",
        filename: '[name].js'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" }, // creates style nodes from JS strings
                    { loader: "css-loader" },  // translates CSS into CommonJS
                    { loader: "sass-loader" } // compiles Sass to CSS
                ],
            },
        ],
        loaders: [
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: "[name].[contenthash].css",
            allChunks: true
        }),
    ],
};
