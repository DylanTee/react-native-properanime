import ContainerLayout from '@components/Layout/ContainerLayout';
import SizedBox from '@components/Shared/SizedBox';
import {AppNavigationScreen} from '@libs/react.navigation.lib';
import {sfont, sw} from '@libs/responsive.lib';
import {Colors} from '@styles/Colors';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useDebounce from '@libs/useDebounce';
import {useQuery} from '@tanstack/react-query';
import axiosClient from '@libs/axios.lib';
import {FlashList} from '@shopify/flash-list';
import AnimeCard from '@components/Shared/AnimeCard';

const Search: AppNavigationScreen<'Search'> = ({navigation, route}) => {
  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce(searchText, 2000);
  const isTransitioning = searchText !== debouncedSearchText;
  const getAnimeSearchQuery = useQuery({
    queryKey: ['animeDetail', debouncedSearchText],
    queryFn: async () => {
      const {data} = await axiosClient.get(
        `/v4/anime?q=${debouncedSearchText}`,
      );
      return data;
    },
    enabled: !isTransitioning && searchText.length > 0,
  });
  const anime = getAnimeSearchQuery.data?.data[0] ?? null;
  const animeListing = getAnimeSearchQuery.data?.data ?? [];

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
          {getAnimeSearchQuery.isLoading ?? (
            <ActivityIndicator size={'large'} color={Colors.primary} />
          )}
          <FlashList
            estimatedItemSize={100}
            numColumns={2}
            data={animeListing}
            renderItem={({item, index}: {item: any; index: number}) => (
              <AnimeCard
                data={{
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
                onPress={() => {
                  navigation.navigate('Detail', {id: item.mal_id});
                }}
              />
            )}
          />
        </View>
      </ContainerLayout>
    </>
  );
};
export default Search;
