import {sw} from '@libs/responsive.lib';
import {useAnimeStore} from '@libs/zustand.lib';
import {Colors} from '@styles/Colors';
import React from 'react';
import {ToastAndroid, TouchableOpacity, Image} from 'react-native';
import {TAnime} from './AnimeCard';

interface LoveButtonProps {
  data: TAnime;
}

export default function LoveButton(props: LoveButtonProps) {
  const {data} = props;
  const lovedAnimes = useAnimeStore(state => state.lovedAnimes);
  const love = useAnimeStore(state => state.love);
  const unlove = useAnimeStore(state => state.unlove);
  return (
    <TouchableOpacity
      style={{
        padding:sw(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: sw(5),
        borderColor: Colors.primary,
      }}
      onPress={() => {
        if (lovedAnimes.find(anime => anime.mal_id == data.mal_id)) {
          unlove(props.data.mal_id);
          ToastAndroid.show('Removed to Favorite', ToastAndroid.SHORT);
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
              background: data.background,
              video: data.video,
            },
          ]);
          ToastAndroid.show('Added to Favorite', ToastAndroid.SHORT);
        }
      }}>
      {lovedAnimes.find(anime => anime.mal_id == data.mal_id) ? (
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
  );
}
