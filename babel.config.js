'use strict';

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  overrides: [
    {
      exclude: /\/node_modules\//,
      presets: [
        ['module:react-native-builder-bob/babel-preset'],
        [
          require.resolve('react-strict-dom/babel-preset'),
          {
            dev: false,
            debug: false,
            // Compile static styles once at library-build time. The native
            // runtime (react-native condition) resolves them via styleq;
            // no consumer-side babel/metro config required.
            platform: 'web',
          },
        ],
      ],
    },
    {
      include: /\/node_modules\//,
      presets: ['module:@react-native/babel-preset'],
    },
  ],
};
