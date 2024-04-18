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
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
dayjs.extend(duration);

const App: FC = () => {
  return (
    <ReactQueryClientProvider>
      <NavigationStack />
    </ReactQueryClientProvider>
  );
};
export default App;
