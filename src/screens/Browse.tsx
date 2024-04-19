import ContainerLayout from '@components/Layout/ContainerLayout';
import CustomButton from '@components/Shared/CustomButton';
import CustomText from '@components/Shared/CustomText';
import SizedBox from '@components/Shared/SizedBox';
import axiosClient from '@libs/axios.lib';
import {AppNavigationScreen} from '@libs/react.navigation.lib';
import {sh, sw} from '@libs/responsive.lib';
import {handleWatchTrailer} from '@libs/utils';
import {FlashList} from '@shopify/flash-list';
import {Colors} from '@styles/Colors';
import {useInfiniteQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Animated, {useSharedValue} from 'react-native-reanimated';
import AnimeCard, {TAnime} from '@components/Shared/AnimeCard';
import {debounce} from 'lodash';
import Skeleton from '@components/Shared/Skeleton';
import LoveButton from '@components/Shared/LoveButton';

const Tab = createBottomTabNavigator();
export type TAnimeStatus = 'airing' | 'complete' | 'upcoming';
const Browse: AppNavigationScreen<'Browse'> = ({navigation, route}) => {
  const scrollY = useSharedValue(0);
  const [status, setStatus] = useState<TAnimeStatus>('airing');
  const limit = 20;
  const getAnimeSearchQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['animeStatusSearch', status],
    queryFn: async ({pageParam = 1}) => {
      const {data} = await axiosClient.get(
        `/v4/anime?status=${status}&limit=${limit}&page=${pageParam}`,
      );
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const hasNextPage = lastPage.pagination.has_next_page;
      return hasNextPage ? allPages.length + 1 : undefined;
    },
  });

  const animeListing: any[] =
    getAnimeSearchQuery.data?.pages.flatMap(page => {
      return page.data;
    }) ?? [];

  const anime: TAnime | null =
    animeListing.length > 0
      ? {
          mal_id: animeListing[0].mal_id,
          title: animeListing[0].title,
          year: animeListing[0].year,
          rating: animeListing[0].rating,
          score: animeListing[0].score,
          image: animeListing[0].images.jpg.large_image_url,
          background: animeListing[0].background,
          video: animeListing[0].trailer.embed_url,
        }
      : null;
  const imageHeight = sh(210);
  const handleDetail = (id: string) => {
    navigation.navigate('Detail', {id});
  };
  const isLoading = getAnimeSearchQuery.isFetching;
  const debouncedOnEndReached = debounce(() => {
    if (!isLoading && getAnimeSearchQuery.hasNextPage) {
      getAnimeSearchQuery.fetchNextPage();
    }
  }, 1000);

  const getContent = (routeName: TAnimeStatus) => {
    return (
      <ContainerLayout>
        <View style={{flex: 1, backgroundColor: Colors.black}}>
          <View
            style={{
              width: '100%',
              flex: 1,
              position: 'absolute',
              zIndex: 1,
              padding: sw(10),
              paddingTop: sw(15),
              flexDirection: 'row',
            }}>
            {animeListing.length > 0 && (
              <Animated.View
                style={{
                  position: 'absolute',
                  zIndex: -1,
                  backgroundColor: Colors.black,
                  width: Dimensions.get('screen').width,
                  height: sh(45),
                  opacity: scrollY,
                }}
              />
            )}
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => navigation.toggleDrawer()}>
              <Image
                style={{width: sw(25), height: sw(25)}}
                source={require('@assets/menu.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 'auto', alignItems: 'center'}}
              onPress={() => navigation.navigate('Search')}>
              <Image
                style={{width: sw(25), height: sw(25)}}
                source={require('@assets/search.png')}
              />
            </TouchableOpacity>
          </View>
          <FlashList
            showsVerticalScrollIndicator={false}
            estimatedItemSize={100}
            numColumns={2}
            data={animeListing.slice(1)}
            onScroll={e => {
              if (anime && animeListing.length > 0) {
                scrollY.value = e.nativeEvent.contentOffset.y / imageHeight;
              }
            }}
            ListHeaderComponent={() => (
              <>
                {anime ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => handleDetail(anime.mal_id)}>
                    <Image
                      src={anime.image}
                      style={{
                        width: '100%',
                        height: sh(210),
                      }}
                      resizeMode="cover"
                    />
                    <SizedBox height={sh(10)} />
                    <View
                      style={{
                        marginHorizontal: sw(10),
                      }}>
                      <CustomText
                        numberOfLines={3}
                        label={anime.background}
                        size="medium"
                        styles={{
                          color: Colors.white,
                        }}
                      />
                      <SizedBox height={sh(10)} />
                      <View style={{flexDirection: 'row'}}>
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
                            onPress={() => handleWatchTrailer(anime.video)}
                          />
                        </View>
                        <SizedBox width={sw(10)} />
                        <LoveButton data={anime} />
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <>
                    {isLoading && (
                      <Skeleton
                        loaderStyle={{
                          width: '100%',
                          height: sh(210),
                          backgroundColor: Colors.lightGray,
                        }}
                      />
                    )}
                  </>
                )}
                <SizedBox height={sh(30)} />
                {animeListing.length > 0 && (
                  <CustomText
                    numberOfLines={1}
                    label={'TOP PICKS FOR YOU'}
                    size="big"
                    styles={{
                      color: Colors.white,
                      marginHorizontal: sw(10),
                    }}
                  />
                )}
              </>
            )}
            ListFooterComponent={() => (
              <>
                {isLoading && (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      padding: sw(10),
                    }}>
                    {Array.from(Array(6), (_a, i) => (
                      <Skeleton
                        key={i}
                        loaderStyle={{
                          width: '48%',
                          height: sh(210),
                          margin: '1%',
                          backgroundColor: Colors.lightGray,
                        }}
                      />
                    ))}
                  </View>
                )}
                <SizedBox height={sh(50)} />
              </>
            )}
            renderItem={({item, index}: {item: any; index: number}) => (
              <AnimeCard
                data={{
                  mal_id: item.mal_id,
                  year: item.year,
                  title: item.title,
                  rating: item.rating,
                  score: item.score,
                  image: item.images.jpg.large_image_url,
                  video: item.trailer.embed_url,
                  background: item.background,
                }}
                styles={{
                  padding: '5%',
                  paddingRight: index % 2 ? '5%' : '2%',
                  paddingLeft: index % 2 ? '2%' : '5%',
                  flex: 1,
                }}
                onPress={() => handleDetail(item.mal_id)}
              />
            )}
            onEndReached={debouncedOnEndReached}
            onEndReachedThreshold={0.8}
          />
        </View>
      </ContainerLayout>
    );
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            height: 0,
          },
          tabBarStyle: {
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarActiveBackgroundColor: '#23242A',
          tabBarInactiveTintColor: Colors.white,
          tabBarInactiveBackgroundColor: '#23242A',
        }}>
        {/* <Tab.Screen
          name="Airing"
          options={{
            tabBarIcon: () => (
            

                  <Image
                    style={{width: sw(25), height: sw(25)}}
                    source={require(`@assets/active-signal.png`)}
                  />
               

            ),
          }}
          component={() => <>{getContent()}</>}
        /> */}
        <Tab.Screen
          name="Airing"
          options={{
            tabBarIcon: () => (
              <>
                {status == 'airing' ? (
                  <Image
                    style={{width: sw(25), height: sw(25)}}
                    source={require('@assets/active-signal.png')}
                  />
                ) : (
                  <Image
                    style={{width: sw(25), height: sw(25)}}
                    source={require('@assets/unactive-signal.png')}
                  />
                )}
              </>
            ),
          }}
          listeners={{
            tabPress: e => {
              setStatus('airing');
            },
          }}>
          {props => {
            return getContent(props.route.name.toLowerCase() as any);
          }}
        </Tab.Screen>
        <Tab.Screen
          name="Complete"
          options={{
            tabBarIcon: () => (
              <>
                {status == 'complete' ? (
                  <Image
                    style={{width: sw(25), height: sw(25)}}
                    source={require('@assets/active-checked-checkbox.png')}
                  />
                ) : (
                  <Image
                    style={{width: sw(25), height: sw(25)}}
                    source={require('@assets/unactive-checked-checkbox.png')}
                  />
                )}
              </>
            ),
          }}
          listeners={{
            tabPress: e => {
              setStatus('complete');
            },
          }}>
          {props => {
            return getContent(props.route.name.toLowerCase() as any);
          }}
        </Tab.Screen>
        <Tab.Screen
          name="UpComing"
          options={{
            tabBarIcon: () => (
              <>
                {status == 'upcoming' ? (
                  <Image
                    style={{width: sw(25), height: sw(25)}}
                    source={require('@assets/active-event-accepted-tentatively.png')}
                  />
                ) : (
                  <Image
                    style={{width: sw(25), height: sw(25)}}
                    source={require('@assets/unactive-event-accepted-tentatively.png')}
                  />
                )}
              </>
            ),
          }}
          listeners={{
            tabPress: e => {
              setStatus('upcoming');
            },
          }}>
          {props => {
            return getContent(props.route.name.toLowerCase() as any);
          }}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};
export default Browse;
