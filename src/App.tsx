/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {FC} from 'react';
import NavigationStack from '@libs/react.navigation.lib';
import {ReactQueryClientProvider} from '@libs/react-query-client-provider';

import {LogBox} from 'react-native';
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App: FC = () => {
  return (
    <ReactQueryClientProvider>
      <NavigationStack />
    </ReactQueryClientProvider>
  );
};
export default App;
