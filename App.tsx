import React from 'react';
import './src/assets/strings/i18next.config';
import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/SplashScreen';
import { AppContext, useAppContextValues } from './src/context';
import HomeScreen, { useHomeScreenOptions } from './src/screens/HomeScreen';
import { AppColors, useAppColors } from './src/hooks/styles';
import { SignInScreen, SignUpScreen } from './src/customer';
import { useTranslation } from 'react-i18next';

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
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator();

const App = () => {
  const { t } = useTranslation();

  const isDarkMode = useColorScheme() === 'dark';

  const colors = useAppColors();

  const homeScreenOptions = useHomeScreenOptions();

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
              headerStyle: { backgroundColor: colors.colorSurface },
              headerTintColor: colors.colorPrimary,
            }}>
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={homeScreenOptions}
            />
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
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppContext.Provider>
  );
};

export default App;
