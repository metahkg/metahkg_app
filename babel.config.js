module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            "babel-preset-expo",
            ["@babel/preset-flow", {allowDeclareFields: true}],
        ],
        plugins: [
            [
                "module-resolver",
                {
                    extensions: [".tsx", ".ts", ".js", ".json"],
                },
            ],
            "react-native-reanimated/plugin",
            ["module:react-native-dotenv", {
                "moduleName": "@env",
                "path": ".env",
                "blacklist": null,
                "whitelist": null,
                "safe": false,
                "allowUndefined": true
            }]
        ],
    };
};
