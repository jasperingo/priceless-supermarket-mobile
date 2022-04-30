import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { AppDimensions, useAppStyles } from '../../hooks/styles';
import ProductItem from '../components/ProductItem';
import ProductListFooterComponent from '../components/ProductListFooterComponent';
import useProductsFetch from '../hooks/productsFetchHook';
import useProducts from '../hooks/productsHook';

const getStyle = (_: any, dimensions: AppDimensions) =>
  StyleSheet.create({
    wrapper: {
      margin: dimensions.xSmall,
      justifyContent: 'space-between',
    },
  });

const ProductsScreen = () => {
  const styles = useAppStyles(getStyle);

  const { products, loading, loaded, ended, error } = useProducts();

  const [fetchProducts, unfetchProducts] = useProductsFetch();

  useEffect(() => {
    if (!loaded) {
      fetchProducts();
    }
  }, [loaded, fetchProducts]);

  const productsFetch = () => fetchProducts(products[products.length - 1].id);

  return (
    <FlatList
      data={products}
      numColumns={2}
      refreshing={false}
      onRefresh={unfetchProducts}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => <ProductItem item={item} />}
      columnWrapperStyle={styles.wrapper}
      onEndReached={ended ? null : productsFetch}
      ListFooterComponentStyle={styles.wrapper}
      ListFooterComponent={
        <ProductListFooterComponent
          loading={loading}
          error={error}
          loaded={loaded}
          products={products}
          productsFetch={productsFetch}
        />
      }
    />
  );
};

export default ProductsScreen;
