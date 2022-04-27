import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { AppDimensions, useAppStyles } from '../../hooks/styles';
import ProductItem from '../components/ProductItem';

const products = [1, 2, 3, 4, 5, 6];

const getListColumnStyle = (_: any, dimensions: AppDimensions) =>
  StyleSheet.create({
    wrapper: {
      margin: dimensions.xSmall,
      justifyContent: 'space-between',
    },
  });

const ProductsScreen = () => {
  const listColumnStyle = useAppStyles(getListColumnStyle);

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item, index) => String(index)}
      renderItem={() => <ProductItem />}
      columnWrapperStyle={listColumnStyle.wrapper}
    />
  );
};

export default ProductsScreen;
