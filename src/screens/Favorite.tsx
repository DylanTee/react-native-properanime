import ContainerLayout from '@components/Layout/ContainerLayout';
import AnimeCard, {TAnime} from '@components/Shared/AnimeCard';
import CustomText from '@components/Shared/CustomText';
import SizedBox from '@components/Shared/SizedBox';
import {AppNavigationScreen} from '@libs/react.navigation.lib';
import {sw} from '@libs/responsive.lib';
import {useAnimeStore} from '@libs/zustand.lib';
import {FlashList} from '@shopify/flash-list';
import {Colors} from '@styles/Colors';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

const Favorite: AppNavigationScreen<'Favorite'> = ({navigation, route}) => {
  const lovedAnimes = useAnimeStore(state => state.lovedAnimes);
  return (
    <>
      <ContainerLayout>
        <View style={{flex: 1, backgroundColor: Colors.black}}>
          <View
            style={{
              width: '100%',
              padding: sw(10),
              paddingTop: sw(15),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => navigation.goBack()}>
              <Image
                style={{width: sw(30), height: sw(30)}}
                source={require('@assets/left.png')}
              />
            </TouchableOpacity>
            <SizedBox width={sw(15)} />
            <CustomText
              label={`Favorite`}
              size="big"
              styles={{
                color: Colors.white,
              }}
            />
          </View>
          <FlashList
            showsVerticalScrollIndicator={false}
            estimatedItemSize={100}
            numColumns={2}
            data={lovedAnimes}
            renderItem={({item, index}: {item: TAnime; index: number}) => (
              <AnimeCard
                data={{
                  mal_id: item.mal_id,
                  year: item.year,
                  title: item.title,
                  rating: item.rating,
                  score: item.score,
                  image: item.image,
                  video: item.video,
                  background: item.background,
                }}
                styles={{
                  padding: '5%',
                  paddingRight: index % 2 ? '5%' : '2%',
                  paddingLeft: index % 2 ? '2%' : '5%',
                  flex: 1,
                }}
                onPress={() => navigation.navigate('Detail', {id: item.mal_id})}
              />
            )}
          />
        </View>
      </ContainerLayout>
    </>
  );
};
export default Favorite;
