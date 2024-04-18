import React, {ReactNode} from 'react';
import {SafeAreaView, StatusBar, View, useWindowDimensions} from 'react-native';
import {DeviceInfoLib} from '@libs/device.info.lib';
import {Colors} from '@styles/Colors';
import {Global} from '@styles/Global';
import {navigationRef} from '@libs/react.navigation.lib';

interface LayoutProps {
  children: ReactNode;
}

export default function ContainerLayout({children}: LayoutProps) {
  const windowDimensions = useWindowDimensions();
  const isSearchScreen =
    navigationRef.getCurrentRoute()?.name == 'Search' ?? false;
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={isSearchScreen ? Colors.lightBlack : Colors.black}
      />
      {DeviceInfoLib.isTablet ? (
        <View
          style={[
            {
              flex: DeviceInfoLib.isTablet ? 0 : 1,
              width: 360,
              height: 700,
              marginTop: windowDimensions.height / 6,
              backgroundColor: Colors.white,
              alignSelf: 'center',
            },
            Global.shadowLine,
          ]}>
          {children}
        </View>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
}
