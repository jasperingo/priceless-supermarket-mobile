import React from 'react';
import { StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchForm from '../components/form/SearchForm';
import { useTranslation } from 'react-i18next';
import LandingScreen from './LandingScreen';
import {
  AppColors,
  AppDimensions,
  useAppColors,
  useAppDimensions,
  useAppStyles,
} from '../hooks/styles';
import { SignUpScreen, SignInScreen } from '../customer';

const getStyles = (Colors: AppColors, Dimensions: AppDimensions) =>
  StyleSheet.create({
    drawer: {
      backgroundColor: Colors.colorSurface,
    },

    drawerContent: {
      marginTop: 100,
    },

    headerLeft: {
      color: Colors.colorSecondary,
      padding: Dimensions.xxSmall,
      fontSize: Dimensions.xxLarge,
      marginLeft: Dimensions.small,
    },

    headerRight: {
      color: Colors.colorSecondary,
      padding: Dimensions.xxSmall,
      fontSize: Dimensions.xxLarge,
      marginRight: Dimensions.small,
    },
  });

export type HomeDrawerNavParamList = {
  Landing: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const styles = useAppStyles(getStyles);

  return (
    <DrawerContentScrollView
      {...props}
      style={styles.drawer}
      contentContainerStyle={styles.drawerContent}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const HomeScreen = () => {
  const { t } = useTranslation();

  const colors = useAppColors();

  const dimensions = useAppDimensions();

  const styles = useAppStyles(getStyles);

  return (
    <Drawer.Navigator
      initialRouteName="HomeTab"
      useLegacyImplementation
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.colorSurface,
        },
        headerTintColor: colors.colorSecondary,
        drawerActiveTintColor: colors.colorSecondary,
        drawerActiveBackgroundColor: colors.colorPrimary,
        drawerInactiveTintColor: colors.colorSecondary,
        drawerInactiveBackgroundColor: colors.colorBackground,
        drawerItemStyle: {
          marginBottom: dimensions.large,
        },
      }}>
      <Drawer.Screen
        name="Landing"
        component={LandingScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="person"
              style={styles.headerLeft}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <Ionicons name="cart" style={styles.headerRight} />
          ),
          headerTitleContainerStyle: { width: '100%' },
          headerTitle: () => <SearchForm />,
          title: t('Home'),
        })}
      />
      <Drawer.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: t('Sign_up') }}
      />
      <Drawer.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: t('Sign_in') }}
      />
    </Drawer.Navigator>
  );
};

export default HomeScreen;
