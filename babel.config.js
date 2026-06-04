module.exports = function babelConfig(api) {
  api.cache(true);

  return {
    // Keep the Babel preset aligned with the installed Expo SDK.
    presets: [require.resolve('expo/node_modules/babel-preset-expo')],
  };
};
