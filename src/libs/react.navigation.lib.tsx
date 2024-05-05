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
  DrawerItemList,
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';
import {Image, Linking, TouchableOpacity, View} from 'react-native';
import {sh, sw} from './responsive.lib';
import SizedBox from '@components/Shared/SizedBox';
import CustomText from '@components/Shared/CustomText';

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
        drawerContent={props => (
          <View>
            <Image
              style={{
                width: sw(50),
                height: sw(50),
                borderRadius: sw(5),
                margin: sw(15),
              }}
              source={require('@assets/logo.png')}
            />
            <DrawerItemList {...props} />
            <SizedBox height={sh(20)} />
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => {
                Linking.openURL('https://pr0per.vercel.app/privacy-policy');
              }}>
              <CustomText
                numberOfLines={1}
                label={'Privacy Policy'}
                size="small"
                styles={{
                  color: Colors.lightGray,
                }}
              />
            </TouchableOpacity>
            <SizedBox height={sh(20)} />
            <View style={{alignItems: 'center'}}>
              <CustomText
                numberOfLines={1}
                label={'Version 1.0.0'}
                size="medium"
                styles={{
                  color: Colors.lightGray,
                }}
              />
            </View>
          </View>
        )}
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
        <Drawer.Screen
          name="Favorite"
          options={{headerShown: false}}
          component={Favorite}
        />
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
