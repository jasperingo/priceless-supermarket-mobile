import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { AppDimensions, useAppStyles } from '../../hooks/styles';
import CategoryItem from '../components/CategoryItem';

const categories = [1, 2, 3, 4, 5, 6];

const getListColumnStyle = (_: any, dimensions: AppDimensions) =>
  StyleSheet.create({
    wrapper: {
      margin: dimensions.xSmall,
      justifyContent: 'space-between',
    },
  });

const CategoriesScreen = () => {
  const listColumnStyle = useAppStyles(getListColumnStyle);

  return (
    <FlatList
      data={categories}
      numColumns={2}
      renderItem={() => <CategoryItem />}
      columnWrapperStyle={listColumnStyle.wrapper}
    />
  );
};

export default CategoriesScreen;
