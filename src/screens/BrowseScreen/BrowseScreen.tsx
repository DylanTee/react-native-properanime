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
import React from 'react';
import {Image, Linking, TouchableOpacity, View} from 'react-native';

const BrowseScreen: AppNavigationScreen<'BrowseScreen'> = ({
  navigation,
  route,
}) => {
  const getAnimeSearchQuery = useQuery({
    queryKey: ['animeSearch', route.params.status],
    queryFn: async () => {
      const {data} = await axiosClient.get(
        `/v4/anime?status=${route.params.status}`,
      );
      return data;
    },
  });
  const anime = getAnimeSearchQuery.data?.data[0] ?? null;
  const animeListing = getAnimeSearchQuery.data?.data ?? [];

  const handleDetail = (id: string) => {
    navigation.navigate('DetailScreen', {id});
  };

  return (
    <>
      <ContainerLayout>
        {/* <CustomText label={animeListing.length} size="small" /> */}
        <View style={{flex: 1, backgroundColor: Colors.black}}>
          <FlashList
            numColumns={2}
            data={animeListing}
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
                          }}>
                          <Image
                            style={{width: sw(25), height: sw(25)}}
                            source={require('@assets/unactive_love.png')}
                          />
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
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  padding: '5%',
                  paddingRight: index % 2 ? '5%' : '2%',
                  paddingLeft: index % 2 ? '2%' : '5%',
                  flex: 1,
                }}
                onPress={() => handleDetail(item.mal_id)}>
                <Image
                  src={item.images.jpg.large_image_url}
                  style={{
                    width: '100%',
                    height: sh(210),
                  }}
                  resizeMode="cover"
                />
                <SizedBox height={sh(3)} />
                <CustomText
                  numberOfLines={1}
                  label={item.title}
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
                      label={`Score: ${item.score} | ${item.year}`}
                      size="small"
                      styles={{
                        color: Colors.lightGray,
                      }}
                    />
                    <CustomText
                      label={`${item.rating}`}
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
            )}
          />
        </View>
      </ContainerLayout>
    </>
  );
};
export default BrowseScreen;
