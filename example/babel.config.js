const path = require('path');
const { getConfig } = require('react-native-builder-bob/babel-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');

module.exports = function (api) {
  api.cache(true);

  return getConfig(
    {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          // Required because the example resolves react-native-astryx to
          // its SOURCE (see metro.config.js conditions). The StyleX
          // compiler must run over the library source here, exactly as
          // it does in the library's own build (root babel.config.js).
          '@stylexjs/babel-plugin',
          {
            dev: false,
            runtimeInjection: false,
            importSources: [{ from: 'react-strict-dom', as: 'css' }],
            styleResolution: 'property-specificity',
          },
        ],
      ],
    },
    { root, pkg }
  );
};
