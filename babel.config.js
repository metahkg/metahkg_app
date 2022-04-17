module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      ["@babel/preset-flow", { allowDeclareFields: true }],
    ],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json"],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
