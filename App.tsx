import React from 'react';
import './src/assets/strings/i18next.config';
import 'react-native-gesture-handler';
import {
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/SplashScreen';
import { AppContext, useAppContextValues } from './src/context';
import HomeScreen, { HomeTabParamList } from './src/screens/HomeScreen';
import { AppColors, useAppColors } from './src/hooks/styles';
import {
  AccountScreen,
  ProfileScreen,
  SignInScreen,
  SignUpScreen,
} from './src/customer';
import { useTranslation } from 'react-i18next';
import { ProductScreen } from './src/product';
import ProductSearchScreen from './src/product/screens/ProductSearchScreen';
import { CartScreen } from './src/order';

const AppTheme = (Colors: AppColors) => ({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.colorPrimary,
    card: Colors.colorPrimary,
    background: Colors.colorBackground,
    text: Colors.colorOnSurface,
  },
});

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Account: undefined;
  Profile: undefined;
  Cart: undefined;
  Product: { id: number };
  Search: { q: string | null; categoryId: number | null };
  Home: NavigatorScreenParams<HomeTabParamList>;
};

const Stack = createNativeStackNavigator();

const App = () => {
  const { t } = useTranslation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = useAppColors();

  const contextValue = useAppContextValues();

  return (
    <AppContext.Provider value={contextValue}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={colors.colorSurface}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer theme={AppTheme(colors)}>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: colors.colorPrimary,
              headerStyle: { backgroundColor: colors.colorSurface },
            }}>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ title: t('Sign_in') }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: t('Sign_up') }}
            />
            <Stack.Screen
              name="Account"
              component={AccountScreen}
              options={{ title: t('Account') }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: t('Profile') }}
            />
            <Stack.Screen
              name="Product"
              component={ProductScreen}
              options={{ title: t('Product') }}
            />
            <Stack.Screen name="Search" component={ProductSearchScreen} />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: t('Cart') }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppContext.Provider>
  );
};

export default App;
