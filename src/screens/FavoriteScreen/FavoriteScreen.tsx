import ContainerLayout from '@components/Layout/ContainerLayout';
import CustomText from '@components/Shared/CustomText';
import {AppNavigationScreen} from '@libs/react.navigation.lib';
import React from 'react';

const FavoriteScreen: AppNavigationScreen<'FavoriteScreen'> = ({navigation, route}) => {
  return (
    <>
      <ContainerLayout>
        <CustomText label="FavoriteScreen" size="small" />
      </ContainerLayout>
    </>
  );
};
export default FavoriteScreen;