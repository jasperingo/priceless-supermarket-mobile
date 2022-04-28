import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import EmptyListComponent from '../../components/fetch/EmptyListComponent';
import LoadingComponent from '../../components/fetch/LoadingComponent';
import RetryComponent from '../../components/fetch/RetryComponent';
import ErrorCode from '../../errors/ErrorCode';
import { AppDimensions, useAppStyles } from '../../hooks/styles';
import CategoryItem from '../components/CategoryItem';
import useCategoriesFetch from '../hooks/categoriesFetchHook';
import useCategories from '../hooks/categoriesHook';

const getListColumnStyle = (_: any, dimensions: AppDimensions) =>
  StyleSheet.create({
    wrapper: {
      margin: dimensions.xSmall,
      justifyContent: 'space-between',
    },
  });

const CategoriesScreen = () => {
  const styles = useAppStyles(getListColumnStyle);

  const { categories, loaded, loading, error } = useCategories();

  const [fetchCategory, unfetchCategory] = useCategoriesFetch();

  useEffect(() => {
    if (!loaded) {
      fetchCategory();
    }
  }, [loaded, fetchCategory]);

  return (
    <FlatList
      numColumns={2}
      data={categories}
      refreshing={false}
      onRefresh={unfetchCategory}
      renderItem={({ item }) => <CategoryItem item={item} />}
      columnWrapperStyle={styles.wrapper}
      ListFooterComponentStyle={styles.wrapper}
      ListFooterComponent={
        (loading && <LoadingComponent />) ||
        (error === ErrorCode.NO_NETWORK_CONNECTION && (
          <RetryComponent
            text="Not_network_connection"
            action={fetchCategory}
          />
        )) ||
        (error !== null && <RetryComponent action={fetchCategory} />) ||
        (loaded && categories.length === 0 && (
          <EmptyListComponent text="_empty_categories" />
        )) ||
        null
      }
    />
  );
};

export default CategoriesScreen;
