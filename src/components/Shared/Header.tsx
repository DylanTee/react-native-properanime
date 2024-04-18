import {sw} from '@libs/responsive.lib';
import {Colors} from '@styles/Colors';
import React, {useEffect} from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import Animated from 'react-native-reanimated';
import SizedBox from './SizedBox';
import CustomText from './CustomText';

interface IHeaderProps {
  onBack(): void;
  title?: string;
}

export default function Header(props: IHeaderProps) {
  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        padding: sw(10),
        paddingTop: sw(15),
      }}>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => props.onBack()}>
        <Image
          style={{width: sw(30), height: sw(30)}}
          source={require('@assets/left.png')}
        />
        <SizedBox width={sw(10)} />
        <CustomText
          numberOfLines={1}
          label={props.title ?? ''}
          size="big"
          styles={{
            color: Colors.white,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
