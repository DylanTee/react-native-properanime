import React, {ReactNode} from 'react';
import {SafeAreaView, StatusBar, View, useWindowDimensions} from 'react-native';
import {DeviceInfoLib} from '@libs/device.info.lib';
import {Colors} from '@styles/Colors';
import {Global} from '@styles/Global';

interface LayoutProps {
  children: ReactNode;
}

export default function ContainerLayout({children}: LayoutProps) {
  const windowDimensions = useWindowDimensions();
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={Colors.black} />
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
