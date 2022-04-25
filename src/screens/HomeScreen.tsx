import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchForm from '../components/form/SearchForm';
import { useTranslation } from 'react-i18next';
import {
  AppColors,
  AppDimensions,
  useAppColors,
  useAppStyles,
} from '../hooks/styles';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductsScreen from '../product';
import CategoriesScreen from '../category';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const getStyles = (Colors: AppColors, Dimensions: AppDimensions) =>
  StyleSheet.create({
    drawer: {
      backgroundColor: Colors.colorSurface,
    },

    drawerContent: {
      marginTop: 100,
    },

    header: {
      flexDirection: 'row',
      padding: Dimensions.xSmall,
      backgroundColor: Colors.colorSurface,
    },

    headerIcon: {
      color: Colors.colorSecondary,
      padding: Dimensions.xxSmall,
      fontSize: Dimensions.xxLarge,
      marginLeft: Dimensions.xSmall,
    },
  });

export const useHomeScreenOptions = () => {
  const styles = useAppStyles(getStyles);
  return (): NativeStackNavigationOptions => ({
    header: ({ navigation }) => (
      <View style={styles.header}>
        <SearchForm />
        <Ionicons name="cart" style={styles.headerIcon} />
        <Ionicons
          name="person"
          style={styles.headerIcon}
          onPress={() => navigation.navigate('Customer')}
        />
      </View>
    ),
  });
};

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  const colors = useAppColors();

  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.colorSurface,
        },
        tabBarActiveTintColor: colors.colorPrimary,
        tabBarInactiveTintColor: colors.colorGray,
        tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold' },
      }}>
      <Tab.Screen name={t('Products')} component={ProductsScreen} />
      <Tab.Screen name={t('Categories')} component={CategoriesScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
