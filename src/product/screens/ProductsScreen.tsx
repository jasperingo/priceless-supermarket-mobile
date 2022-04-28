import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import EmptyListComponent from '../../components/fetch/EmptyListComponent';
import LoadingComponent from '../../components/fetch/LoadingComponent';
import RetryComponent from '../../components/fetch/RetryComponent';
import ErrorCode from '../../errors/ErrorCode';
import { AppDimensions, useAppStyles } from '../../hooks/styles';
import ProductItem from '../components/ProductItem';
import useProductsFetch from '../hooks/productsFetchHook';
import useProducts from '../hooks/productsHook';

const getListColumnStyle = (_: any, dimensions: AppDimensions) =>
  StyleSheet.create({
    wrapper: {
      margin: dimensions.xSmall,
      justifyContent: 'space-between',
    },
  });

const ProductsScreen = () => {
  const styles = useAppStyles(getListColumnStyle);

  const { products, loading, loaded, ended, error } = useProducts();

  const [fetchProducts, unfetchProducts] = useProductsFetch();

  useEffect(() => {
    if (!loaded) {
      fetchProducts();
    }
  }, [loaded, fetchProducts]);

  return (
    <FlatList
      data={products}
      numColumns={2}
      refreshing={false}
      onRefresh={unfetchProducts}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => <ProductItem item={item} />}
      columnWrapperStyle={styles.wrapper}
      onEndReached={
        ended ? null : () => fetchProducts(products[products.length - 1].id)
      }
      ListFooterComponentStyle={styles.wrapper}
      ListFooterComponent={
        (loading && <LoadingComponent />) ||
        (error === ErrorCode.NO_NETWORK_CONNECTION && (
          <RetryComponent
            text="Not_network_connection"
            action={fetchProducts}
          />
        )) ||
        (error !== null && <RetryComponent action={fetchProducts} />) ||
        (loaded && products.length === 0 && (
          <EmptyListComponent text="_empty_products" />
        )) ||
        null
      }
    />
  );
};

export default ProductsScreen;
