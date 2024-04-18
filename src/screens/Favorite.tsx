import ContainerLayout from '@components/Layout/ContainerLayout';
import CustomText from '@components/Shared/CustomText';
import {AppNavigationScreen} from '@libs/react.navigation.lib';
import React from 'react';

const Favorite: AppNavigationScreen<'Favorite'> = ({navigation, route}) => {
  return (
    <>
      <ContainerLayout>
        <CustomText label="Favorite" size="small" />
      </ContainerLayout>
    </>
  );
};
export default Favorite;