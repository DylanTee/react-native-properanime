import ContainerLayout from '@components/Layout/ContainerLayout';
import SizedBox from '@components/Shared/SizedBox';
import {AppNavigationScreen} from '@libs/react.navigation.lib';
import {sfont, sh, sw} from '@libs/responsive.lib';
import {Colors} from '@styles/Colors';
import React, {useEffect, useRef, useState} from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import useDebounce from '@libs/useDebounce';
import {useInfiniteQuery} from '@tanstack/react-query';
import axiosClient from '@libs/axios.lib';
import {FlashList} from '@shopify/flash-list';
import AnimeCard from '@components/Shared/AnimeCard';
import CustomText from '@components/Shared/CustomText';
import {debounce} from 'lodash';
import Skeleton from '@components/Shared/Skeleton';

const Search: AppNavigationScreen<'Search'> = ({navigation, route}) => {
  const searchTextRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce(searchText, 500);
  const isTransitioning = searchText !== debouncedSearchText;
  const limit = 20;
  const getAnimeSearchQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['searchAnime', debouncedSearchText],
    queryFn: async ({pageParam = 1}) => {
      const {data} = await axiosClient.get(
        `/v4/anime?q=${debouncedSearchText}&limit=${limit}&page=${pageParam}`,
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
  const isLoading = getAnimeSearchQuery.isFetching || isTransitioning;
  const debouncedOnEndReached = debounce(() => {
    if (!isLoading && getAnimeSearchQuery.hasNextPage) {
      getAnimeSearchQuery.fetchNextPage();
    }
  }, 1000);

  useEffect(() => {
    searchTextRef.current?.focus();
  }, []);

  useEffect(() => {
    getAnimeSearchQuery.refetch();
  }, [debouncedSearchText]);

  return (
    <>
      <ContainerLayout>
        <View
          style={{
            padding: sw(15),
            backgroundColor: Colors.lightBlack,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigation.goBack()}>
            <Image
              style={{width: sw(25), height: sw(25)}}
              source={require('@assets/left.png')}
            />
          </TouchableOpacity>
          <SizedBox width={sw(10)} />
          <TextInput
            ref={searchTextRef}
            placeholder="Search"
            placeholderTextColor={Colors.lightGray}
            style={{
              paddingVertical: 0,
              fontSize: sfont(14),
              color: '#CCCCCC',
              flex: 1,
            }}
            value={searchText}
            onChangeText={text => setSearchText(text)}
            autoComplete={'off'}
            autoCorrect={false}
          />
          <SizedBox width={sw(10)} />
          {searchText.trim().length > 0 && (
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={() => setSearchText('')}>
              <Image
                style={{width: sw(20), height: sw(20)}}
                source={require('@assets/close.png')}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={{flex: 1, backgroundColor: Colors.black}}>
          {debouncedSearchText.length > 0 && (
            <FlashList
              showsVerticalScrollIndicator={false}
              estimatedItemSize={100}
              numColumns={2}
              data={animeListing}
              ListHeaderComponent={() => (
                <View style={{padding: sw(10), paddingBottom: 0}}>
                  {animeListing.length > 0 && (
                    <CustomText
                      numberOfLines={3}
                      label={'Top Results'}
                      size="medium"
                      styles={{
                        color: Colors.white,
                      }}
                    />
                  )}
                </View>
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
                    background: item.background,
                    video: item.trailer.embed_url,
                  }}
                  styles={{
                    padding: '5%',
                    paddingRight: index % 2 ? '5%' : '2%',
                    paddingLeft: index % 2 ? '2%' : '5%',
                    flex: 1,
                  }}
                  onPress={() => {
                    navigation.navigate('Detail', {id: item.mal_id});
                  }}
                />
              )}
              onEndReached={debouncedOnEndReached}
              onEndReachedThreshold={0.8}
            />
          )}
        </View>
      </ContainerLayout>
    </>
  );
};
export default Search;
