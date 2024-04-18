import ContainerLayout from '@components/Layout/ContainerLayout';
import CustomText from '@components/Shared/CustomText';
import {AppNavigationScreen} from '@libs/react.navigation.lib';
import React from 'react';

const Search: AppNavigationScreen<'Search'> = ({navigation, route}) => {
  return (
    <>
      <ContainerLayout>
        <CustomText label="Search" size="small" />
      </ContainerLayout>
    </>
  );
};
export default Search;