import React, {FC} from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
import {Colors} from '../styles/Colors';
import BrowseScreen from '@screens/BrowseScreen/BrowseScreen';
import DetailScreen from '@screens/DetailScreen/DetailScreen';
import FavoriteScreen from '@screens/FavoriteScreen/FavoriteScreen';
import SearchScreen from '@screens/SearchScreen/SearchScreen';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();
export type AppStackNavigationProp = StackNavigationProp<AppStackParamList>;

export type TAnimeStatus = 'airing'|'complete'|'upcoming'
export type AppStackParamList = {
  BrowseScreen: {
    status: TAnimeStatus;
  };
  CompleteScreen: {
    status: 'complete';
  };
  DetailScreen: {
    id: string;
  };
  FavoriteScreen?: undefined;
  UpcomingScreen: {
    status: 'upcoming';
  };
  SearchScreen?: undefined;
};

/**
 * Abstraction over the different navigation props
 */
export type AppNavigationScreenProps<
  TName extends keyof AppStackParamList = keyof AppStackParamList,
> = StackScreenProps<AppStackParamList, TName>;
/**
 * Abstraction over React.FC which only allows known routes
 */
export type AppNavigationScreen<TName extends keyof AppStackParamList> = FC<
  AppNavigationScreenProps<TName>
>;

export default function Router() {
  const AppStack = createStackNavigator<AppStackParamList>();
  const options = {
    headerShown: false,
    gestureEnabled: false,
    animationEnabled: true,
  };
  return (
    <NavigationContainer<AppStackParamList>
      ref={navigationRef}
      onStateChange={state => {
        // const currentScreenName = state?.routes[state.routes.length - 1].name as unknown as
        //     | keyof AppStackParamList
        //     | undefined;
        // if (
        //     currentScreenName &&
        //     (currentScreenName == 'SubscriptionScreen' ||
        //         currentScreenName == 'ShareUserScreen' ||
        //         currentScreenName == 'TransactionAccountSwitchScreen')
        // ) {
        //     refreshGetUserInfo();
        // }
      }}>
      <AppStack.Navigator
        initialRouteName="BrowseScreen"
        screenOptions={{cardStyle: {backgroundColor: Colors.white}}}>
        <AppStack.Screen
          name="BrowseScreen"
          initialParams={{status: 'airing'}}
          component={BrowseScreen}
          options={options}
        />
        <AppStack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={options}
        />
        <AppStack.Screen
          name="FavoriteScreen"
          component={FavoriteScreen}
          options={options}
        />
               <AppStack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={options}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
