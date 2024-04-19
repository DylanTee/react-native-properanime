import {sh, sw} from '@libs/responsive.lib';
import React from 'react';
import {Image, TouchableOpacity, View, ViewStyle} from 'react-native';
import SizedBox from './SizedBox';
import CustomText from './CustomText';
import {Colors} from '@styles/Colors';
import LoveButton from './LoveButton';

export type TAnime = {
  mal_id: string;
  title: string;
  background: string;
  rating: string;
  score: string;
  image: string;
  year: string;
  video: string;
};

interface AnimeCardProps {
  data: TAnime;
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
        <LoveButton data={data} />
      </View>
    </TouchableOpacity>
  );
}
