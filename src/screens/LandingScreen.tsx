import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useAppColors } from '../hooks/styles';
import ProductsScreen from '../product';
import CategoriesScreen from '../category';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

const LandingScreen = () => {
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

export default LandingScreen;
