import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useMoneyFormat } from '../../hooks/formatters';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import { usePhotoUrl } from '../../photo';
import Product from '../models/Product';

const getStyle = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      width: '49%',
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

const ProductComponent = ({
  item,
  action,
}: {
  item: Product;
  action: () => void;
}) => {
  const styles = useAppStyles(getStyle);

  const moneyFormat = useMoneyFormat();

  const uri = usePhotoUrl(item.photo?.url as string);

  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={styles.container}>
      <Image style={styles.image} resizeMode="stretch" source={{ uri }} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{moneyFormat(item.price || 0)}</Text>
    </TouchableOpacity>
  );
};

export default ProductComponent;
