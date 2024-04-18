import ContainerLayout from '@components/Layout/ContainerLayout';
import CustomText from '@components/Shared/CustomText';
import {AppNavigationScreen} from '@libs/react.navigation.lib';
import React from 'react';

const SearchScreen: AppNavigationScreen<'SearchScreen'> = ({navigation, route}) => {
  return (
    <>
      <ContainerLayout>
        <CustomText label="SearchScreen" size="small" />
      </ContainerLayout>
    </>
  );
};
export default SearchScreen;