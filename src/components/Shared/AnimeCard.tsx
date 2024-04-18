import {sh, sw} from '@libs/responsive.lib';
import React = require('react');
import {Image, TouchableOpacity, View, ViewStyle} from 'react-native';
import SizedBox from './SizedBox';
import CustomText from './CustomText';
import {Colors} from '@styles/Colors';
import {useAnimeStore} from '@libs/zustand.lib';

export type TAnime = {
  mal_id: string;
  title: string;
  rating: string;
  score: string;
  image: string;
  year: string;
};

interface AnimeCardProps {
  data: TAnime;
  onPress(): void;
  styles: ViewStyle;
}

export default function AnimeCard(props: AnimeCardProps) {
  const lovedAnimes = useAnimeStore(state => state.lovedAnimes);
  const love = useAnimeStore(state => state.love);
  const unlove = useAnimeStore(state => state.unlove);
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
          }}
          onPress={() => {
            if (lovedAnimes.find(z => z.mal_id == data.mal_id)) {
              unlove(data.mal_id);
            } else {
              love([
                ...lovedAnimes,
                {
                  mal_id: data.mal_id,
                  title: data.title,
                  rating: data.rating,
                  score: data.score,
                  image: data.image,
                  year: data.year,
                },
              ]);
            }
          }}>
          {lovedAnimes.find(z => z.mal_id == data.mal_id) ? (
            <Image
              style={{width: sw(25), height: sw(25)}}
              source={require('@assets/active_love.png')}
            />
          ) : (
            <Image
              style={{width: sw(25), height: sw(25)}}
              source={require('@assets/unactive_love.png')}
            />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
