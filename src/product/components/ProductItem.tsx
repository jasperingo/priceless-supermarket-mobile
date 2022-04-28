import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../../App';
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

const ProductItem = ({ item }: { item: Product }) => {
  const styles = useAppStyles(getStyle);

  const moneyFormat = useMoneyFormat();

  const uri = usePhotoUrl(item.photo?.url as string);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => navigation.navigate('Product', { id: item.id as number })}>
      <Image style={styles.image} resizeMode="stretch" source={{ uri }} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{moneyFormat(item.price || 0)}</Text>
    </TouchableOpacity>
  );
};

export default ProductItem;
