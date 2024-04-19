import ContainerLayout from '@components/Layout/ContainerLayout';
import CustomButton from '@components/Shared/CustomButton';
import CustomText from '@components/Shared/CustomText';
import SizedBox from '@components/Shared/SizedBox';
import axiosClient from '@libs/axios.lib';
import {AppNavigationScreen} from '@libs/react.navigation.lib';
import {sh, sw} from '@libs/responsive.lib';
import {handleWatchTrailer} from '@libs/utils';
import {useAnimeStore} from '@libs/zustand.lib';
import {Colors} from '@styles/Colors';
import {useQuery} from '@tanstack/react-query';
import React, {useRef} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';

const Detail: AppNavigationScreen<'Detail'> = ({navigation, route}) => {
  const scrollY = useSharedValue(1);
  const getAnimeDetailQuery = useQuery({
    queryKey: ['animeDetail', route.params.id],
    queryFn: async () => {
      const {data} = await axiosClient.get(`/v4/anime/${route.params.id}`);
      return data;
    },
  });
  const scrollViewRef = useRef<ScrollView>(null);
  const anime = getAnimeDetailQuery.data?.data ?? undefined;
  const imageHeight = Dimensions.get('screen').height * 0.65;
  const isLoading = getAnimeDetailQuery.isFetching;
  const lovedAnimes = useAnimeStore(state => state.lovedAnimes);
  const love = useAnimeStore(state => state.love);
  const unlove = useAnimeStore(state => state.unlove);

  return (
    <>
      <ContainerLayout>
        <View style={{flex: 1, backgroundColor: Colors.black}}>
          {isLoading && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={'large'} color={Colors.primary} />
            </View>
          )}
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
              onPress={() => navigation.goBack()}>
              <Image
                style={{width: sw(30), height: sw(30)}}
                source={require('@assets/left.png')}
              />
            </TouchableOpacity>
          </View>
          {anime && (
            <>
              <Animated.Image
                src={anime.images.jpg.large_image_url}
                style={[
                  {
                    width: '100%',
                    height: imageHeight,
                    position: 'absolute',
                    zIndex: -1,
                    opacity: scrollY,
                  },
                ]}
                resizeMode="cover"
              />
              <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={e => {
                  scrollY.value =
                    1 - e.nativeEvent.contentOffset.y / imageHeight;
                }}
                ref={scrollViewRef}
                style={{backgroundColor: 'transparent', flex: 1}}>
                <SizedBox height={imageHeight} />
                <View
                  style={{
                    flex: 1,
                    backgroundColor: Colors.black,
                    padding: sw(10),
                  }}>
                  <CustomText
                    label={anime.title}
                    size="big"
                    styles={{
                      color: Colors.white,
                    }}
                  />
                  <SizedBox height={sh(10)} />
                  <CustomText
                    label={anime.background}
                    size="medium"
                    styles={{
                      color: Colors.white,
                      lineHeight: sh(20),
                    }}
                  />
                  <SizedBox height={sh(25)} />
                  <CustomText
                    label={'Score'}
                    size="medium"
                    styles={{
                      color: Colors.white,
                      lineHeight: sh(20),
                    }}
                  />
                  <CustomText
                    label={anime.score}
                    size="big"
                    styles={{
                      color: Colors.lightGray,
                    }}
                  />
                  <SizedBox height={sh(25)} />
                  <CustomText
                    label={'Year'}
                    size="medium"
                    styles={{
                      color: Colors.white,
                      lineHeight: sh(20),
                    }}
                  />
                  <CustomText
                    label={anime.year}
                    size="big"
                    styles={{
                      color: Colors.lightGray,
                    }}
                  />
                  <SizedBox height={sh(25)} />
                  <CustomText
                    label={'Rating'}
                    size="medium"
                    styles={{
                      color: Colors.white,
                      lineHeight: sh(20),
                    }}
                  />
                  <CustomText
                    label={anime.rating}
                    size="big"
                    styles={{
                      color: Colors.lightGray,
                    }}
                  />
                  <SizedBox height={imageHeight} />
                </View>
              </ScrollView>
              <View style={{flexDirection: 'row', padding: sw(10)}}>
                <View style={{flex: 8}}>
                  <CustomButton
                    icon={
                      <Image
                        style={{width: sw(20), height: sw(20)}}
                        source={require('@assets/play.png')}
                      />
                    }
                    type={'primary'}
                    size={'medium'}
                    title="START WATCHING TRAILER"
                    onPress={() => handleWatchTrailer(anime.trailer.embed_url)}
                  />
                </View>
                <SizedBox width={sw(10)} />

                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderRadius: sw(5),
                    borderColor: Colors.primary,
                  }}
                  onPress={() => {
                    if (lovedAnimes.find(data => data.mal_id == anime.mal_id)) {
                      unlove(anime.mal_id);
                    } else {
                      love([
                        ...lovedAnimes,
                        {
                          mal_id: anime.mal_id,
                          title: anime.title,
                          rating: anime.rating,
                          score: anime.score,
                          image: anime.images.jpg.large_image_url,
                          year: anime.year,
                        },
                      ]);
                    }
                  }}>
                  {lovedAnimes.find(data => data.mal_id == anime.mal_id) ? (
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
            </>
          )}
        </View>
      </ContainerLayout>
    </>
  );
};
export default Detail;
