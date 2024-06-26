module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
      [
          'module-resolver',
          {
              root: ['./src'],
              extensions: [
                  '.ios.ts',
                  '.android.ts',
                  '.ts',
                  '.ios.tsx',
                  '.android.tsx',
                  '.tsx',
                  '.jsx',
                  '.js',
                  '.json',
              ],
              alias: {
                  '@assets': './src/assets',
                  '@components': './src/components',
                  '@libs': './src/libs',
                  '@screens': './src/screens',
                  '@styles': './src/styles',
              },
          },
      ],
      'react-native-reanimated/plugin',
  ],
};
