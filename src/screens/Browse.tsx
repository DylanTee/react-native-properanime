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
import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Animated, {useSharedValue} from 'react-native-reanimated';
import AnimeCard from '@components/Shared/AnimeCard';
import {useAnimeStore} from '@libs/zustand.lib';

const Tab = createBottomTabNavigator();
export type TAnimeStatus = 'airing' | 'complete' | 'upcoming';
const Browse: AppNavigationScreen<'Browse'> = ({navigation, route}) => {
  const lovedAnimes = useAnimeStore(state => state.lovedAnimes);
  const love = useAnimeStore(state => state.love);
  const unlove = useAnimeStore(state => state.unlove);
  const scrollY = useSharedValue(0);
  const [status, setStatus] = useState<TAnimeStatus>('airing');
  const getAnimeSearchQuery = useQuery({
    queryKey: ['animeSearch', status],
    queryFn: async () => {
      const {data} = await axiosClient.get(`/v4/anime?status=${status}`);
      return data;
    },
  });
  const anime = getAnimeSearchQuery.data?.data[0] ?? null;
  const animeListing = getAnimeSearchQuery.data?.data ?? [];
  const imageHeight = sh(210);
  const handleDetail = (id: string) => {
    navigation.navigate('Detail', {id});
  };
  const isLoading = getAnimeSearchQuery.isFetching;

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
          {isLoading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={'large'} color={Colors.primary} />
            </View>
          ) : (
            <FlashList
              estimatedItemSize={100}
              numColumns={2}
              data={animeListing}
              onScroll={e => {
                if (anime && animeListing.length > 0) {
                  scrollY.value = e.nativeEvent.contentOffset.y / imageHeight;
                }
              }}
              ListHeaderComponent={() => (
                <>
                  {anime && (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => handleDetail(anime.mal_id)}>
                      <Image
                        src={anime.images.jpg.large_image_url}
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
                              onPress={() =>
                                handleWatchTrailer(anime.trailer.embed_url)
                              }
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
                              if (
                                lovedAnimes.find(
                                  data => data.mal_id == anime.mal_id,
                                )
                              ) {
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
                            {lovedAnimes.find(
                              data => data.mal_id == anime.mal_id,
                            ) ? (
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
                      </View>
                    </TouchableOpacity>
                  )}
                  <SizedBox height={sh(30)} />
                  <CustomText
                    numberOfLines={1}
                    label={'TOP PICKS FOR YOU'}
                    size="big"
                    styles={{
                      color: Colors.white,
                      marginHorizontal: sw(10),
                    }}
                  />
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
            />
          )}
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
