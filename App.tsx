import React from 'react';
import './src/assets/strings/i18next.config';
import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/SplashScreen';
import { AppContext } from './src/context';
import HomeScreen, { useHomeScreenOptions } from './src/screens/HomeScreen';
import { AppColors, useAppColors } from './src/hooks/styles';
import { SignUpScreen } from './src/customer';

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
  Customer: undefined;
};

const Stack = createNativeStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const colors = useAppColors();

  const homeScreenOptions = useHomeScreenOptions();

  return (
    <AppContext.Provider value={null}>
      <SafeAreaProvider>
        <StatusBar
          backgroundColor={colors.colorSurface}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <NavigationContainer theme={AppTheme(colors)}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: colors.colorSurface },
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
            <Stack.Screen name="Customer" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppContext.Provider>
  );
};

export default App;
