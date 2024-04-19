import ContainerLayout from '@components/Layout/ContainerLayout';
import AnimeCard, {TAnime} from '@components/Shared/AnimeCard';
import CustomButton from '@components/Shared/CustomButton';
import CustomText from '@components/Shared/CustomText';
import SizedBox from '@components/Shared/SizedBox';
import {AppNavigationScreen} from '@libs/react.navigation.lib';
import {sh, sw} from '@libs/responsive.lib';
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
              label={`My Favorite`}
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
            ListHeaderComponent={
              <>
                {lovedAnimes.length == 0 && (
                  <>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: sh(150),
                      }}>
                      <Image
                        style={{width: sw(80), height: sw(80)}}
                        source={require('@assets/active_love.png')}
                      />
                      <SizedBox height={sh(20)} />
                      <CustomText
                        label={`Your Favourite list needs some love.`}
                        size="big"
                        styles={{
                          color: Colors.white,
                        }}
                      />
                      <SizedBox height={sh(20)} />
                      <CustomText
                        label={`Let's fill it up with awesome anime.`}
                        size="medium"
                        styles={{
                          color: Colors.lightGray,
                        }}
                      />
                      <SizedBox height={sh(30)} />
                      <CustomButton
                        type={'primary'}
                        size={'medium'}
                        title="BROWSE ALL"
                        onPress={() => navigation.navigate('Browse')}
                      />
                    </View>
                  </>
                )}
              </>
            }
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
