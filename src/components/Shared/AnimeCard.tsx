import {sh, sw} from '@libs/responsive.lib';
import React = require('react');
import {Image, TouchableOpacity, View, ViewStyle} from 'react-native';
import SizedBox from './SizedBox';
import CustomText from './CustomText';
import {Colors} from '@styles/Colors';

interface AnimeCardProps {
  data: {
    title: string;
    rating: string;
    score: string;
    image: string;
    year: string;
  };
  onPress(): void;
  styles: ViewStyle;
}

export default function AnimeCard(props: AnimeCardProps) {
  const {data, styles} = props;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles}
      onPress={() => props.onPress()}>
      <Image
        src={data.image}
        style={{
          width: '100%',
          height: sh(210),
        }}
        resizeMode="cover"
      />
      <SizedBox height={sh(3)} />
      <CustomText
        numberOfLines={1}
        label={data.title}
        size="medium"
        styles={{
          color: Colors.white,
        }}
      />
      <SizedBox height={sh(3)} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <View style={{flex: 5}}>
          <CustomText
            label={`Score: ${data.score} | ${data.year}`}
            size="small"
            styles={{
              color: Colors.lightGray,
            }}
          />
          <CustomText
            label={`${data.rating}`}
            size="small"
            styles={{
              color: Colors.lightGray,
            }}
          />
        </View>
        <SizedBox width={sw(10)} />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderRadius: sw(5),
            borderColor: Colors.primary,
            width: sw(35),
            height: sw(35),
          }}>
          <Image
            style={{width: sw(25), height: sw(25)}}
            source={require('@assets/unactive_love.png')}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
