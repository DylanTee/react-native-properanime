import React, {FC} from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {Colors} from '../styles/Colors';
import Browse from '@screens/Browse';
import Detail from '@screens/Detail';
import Favorite from '@screens/Favorite';
import Search from '@screens/Search';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';

export const navigationRef = createNavigationContainerRef<AppDrawerParamList>();
export type AppDrawerNavigationProp = DrawerNavigationProp<AppDrawerParamList>;

export type AppDrawerParamList = {
  Browse?: undefined;
  Detail: {
    id: string;
  };
  Favorite?: undefined;
  Search?: undefined;
};

/**
 * Abstraction over the different navigation props
 */
export type AppNavigationScreenProps<
  TName extends keyof AppDrawerParamList = keyof AppDrawerParamList,
> = DrawerScreenProps<AppDrawerParamList, TName>;
/**
 * Abstraction over React.FC which only allows known routes
 */
export type AppNavigationScreen<TName extends keyof AppDrawerParamList> = FC<
  AppNavigationScreenProps<TName>
>;

export default function Router() {
  const Drawer = createDrawerNavigator<AppDrawerParamList>();
  return (
    <NavigationContainer<AppDrawerParamList> ref={navigationRef}>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: Colors.black,
          },
          drawerLabelStyle: {
            color: Colors.white,
          },
        }}
        backBehavior="history"
        initialRouteName="Browse">
        <Drawer.Screen
          name="Browse"
          component={Browse}
          options={{
            headerShown: false,
            drawerItemStyle: {display: 'none'},
          }}
        />
        <Drawer.Screen
          name="Detail"
          component={Detail}
          options={{
            headerShown: false,
            drawerItemStyle: {display: 'none'},
          }}
        />
        <Drawer.Screen name="Favorite" options={{}} component={Favorite} />
        <Drawer.Screen
          name="Search"
          options={{
            headerShown: false,
            drawerItemStyle: {display: 'none'},
          }}
          component={Search}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
