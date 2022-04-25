import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useMoneyFormat } from '../../hooks/formatters';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyle = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      flexGrow: 0.49,
      borderRadius: dimensions.xxSmall,
      backgroundColor: colors.colorSurface,
    },

    image: {
      width: '100%',
      height: 200,
      borderTopLeftRadius: dimensions.xxSmall,
      borderTopRightRadius: dimensions.xxSmall,
    },

    name: {
      fontWeight: 'bold',
      color: colors.colorOnSurface,
      paddingTop: dimensions.small,
      paddingHorizontal: dimensions.xSmall,
    },

    price: {
      fontSize: dimensions.large,
      color: colors.colorSecondary,
      paddingBottom: dimensions.small,
      paddingHorizontal: dimensions.xSmall,
    },
  });

const ProductItem = () => {
  const styles = useAppStyles(getStyle);

  const moneyFormat = useMoneyFormat();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="stretch"
        source={require('../../assets/images/logo.jpg')}
      />
      <Text style={styles.name}>Fried fish and nzu</Text>
      <Text style={styles.price}>{moneyFormat(4898.0)}</Text>
    </View>
  );
};

export default ProductItem;
