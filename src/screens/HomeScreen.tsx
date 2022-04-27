import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchFormComponent from '../components/form/SearchFormComponent';
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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCustomer } from '../customer';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

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
      borderWidth: 1,
      borderColor: Colors.colorSecondary,
      borderRadius: Dimensions.xxSmall,
      color: Colors.colorSecondary,
      padding: Dimensions.xxSmall,
      fontSize: Dimensions.xxLarge,
      marginLeft: Dimensions.xSmall,
    },
  });

const Tab = createMaterialTopTabNavigator();

export type HomeTabParamList = {
  Products: undefined;
  Categories: undefined;
};

const HomeScreen = () => {
  const colors = useAppColors();

  const styles = useAppStyles(getStyles);

  const { t } = useTranslation();

  const { customer } = useCustomer();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={styles.header}>
          <SearchFormComponent />
          <Ionicons name="cart" style={styles.headerIcon} />
          <Ionicons
            name="person"
            style={styles.headerIcon}
            onPress={() =>
              navigation.navigate(customer === null ? 'SignIn' : 'Account')
            }
          />
        </View>
      ),
    });
  }, [styles, customer, navigation]);

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
