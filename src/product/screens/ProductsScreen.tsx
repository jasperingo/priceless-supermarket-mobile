import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../../App';
import { AppDimensions, useAppStyles } from '../../hooks/styles';
import ProductComponent from '../components/ProductComponent';
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

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  useEffect(() => {
    if (!loaded && error === null) {
      fetchProducts();
    }
  }, [error, loaded, fetchProducts]);

  const productsFetch = () => fetchProducts(products[products.length - 1]?.id);

  return (
    <FlatList
      data={products}
      numColumns={2}
      refreshing={false}
      onRefresh={unfetchProducts}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <ProductComponent
          item={item}
          action={() =>
            navigation.navigate('Product', { id: item.id as number })
          }
        />
      )}
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
