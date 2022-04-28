import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useMoneyFormat } from '../../hooks/formatters';
import { useTranslation } from 'react-i18next';
import ProductSpecificationComponent from '../components/ProductSpecificationComponent';
import QuantityPickerComponent from '../components/QuantityPickerComponent';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    image: {
      height: 300,
      width: '100%',
      resizeMode: 'stretch',
    },

    dataContainer: {
      margin: dimens.xSmall,
      padding: dimens.xSmall,
      borderRadius: dimens.xSmall,
      backgroundColor: colors.colorSurface,
    },

    heading: {
      fontWeight: 'bold',
      fontSize: dimens.medium,
      color: colors.colorSecondary,
      marginBottom: dimens.xSmall,
    },

    name: {
      fontWeight: 'bold',
      fontSize: dimens.large,
      color: colors.colorOnSurface,
      marginBottom: dimens.xSmall,
    },

    price: {
      fontSize: dimens.xLarge,
      color: colors.colorSecondary,
      marginBottom: dimens.xSmall,
    },

    addToCartButton: {
      alignItems: 'center',
      padding: dimens.medium,
      borderRadius: dimens.xxSmall,
      backgroundColor: colors.colorPrimary,
    },

    addToCartButtonText: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: colors.colorOnPrimary,
    },

    description: {
      color: colors.colorOnSurface,
    },
  });

const ProductScreen = () => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  const moneyFormat = useMoneyFormat();

  const {
    params: { id },
  } = useRoute<RouteProp<RootStackParamList, 'Product'>>();

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={require('../../assets/images/logo-pro.png')}
      />
      <View style={styles.dataContainer}>
        <Text style={styles.name}>Product {id}</Text>
        <Text style={styles.price}>{moneyFormat(10)}</Text>
        <QuantityPickerComponent />
        <TouchableOpacity style={styles.addToCartButton} activeOpacity={0.8}>
          <Text style={styles.addToCartButtonText}>{t('Add_to_cart')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.heading}>{t('Product_description')}</Text>
        <Text style={styles.description}>
          Tama's Pride rice is a premium quality Nigerian grown parboiled rice
          with natural nutrients and healthy value. Put some variety in your
          meals and infuse rice when planning dishes for the week. You can cook
          your rice in so many ways and that's what makes them so popular with
          kids and adults. Rice is a favourite Nigerian staple and is eaten
          several times a week by most people. Mama's Pride rice is specifically
          processed and packaged with high quality grains. It is stone free,
          fast and easy to cook with a end result that is firm and non-sticky.
          Now you can treat your family to a sumptuous meal at a very affordable
          cost.
        </Text>
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.heading}>{t('Product_specifications')}</Text>
        <ProductSpecificationComponent title="Category" body="Snacks" />
        <ProductSpecificationComponent title="Weight" body="1.23 (kg)" />
        <ProductSpecificationComponent title="Width" body="20 (cm)" />
        <ProductSpecificationComponent title="Height" body="30 (cm)" />
      </View>
    </ScrollView>
  );
};

export default ProductScreen;
