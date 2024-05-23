module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          'assets': './src/assets',
          'components': './src/components',
          'screens': './src/screens',
          'store': './src/store',
          'utils': './src/utils'
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
