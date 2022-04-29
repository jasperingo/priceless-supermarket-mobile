import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import { useCategories } from '../../category';
import CategoriesModalComponent from '../../category/components/CategoriesModalComponent';
import SearchFormComponent from '../../components/form/SearchFormComponent';
import HeaderButtonComponent from '../../components/header/HeaderButtonComponent';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import ProductItem from '../components/ProductItem';
import ProductListFooterComponent from '../components/ProductListFooterComponent';
import useProductsSearchFetch from '../hooks/productsSearchFetchHook';
import useProductsSearch from '../hooks/productsSearchHook';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    header: {
      flexGrow: 0.75,
    },

    wrapper: {
      margin: dimens.xSmall,
      justifyContent: 'space-between',
    },

    category: {
      margin: dimens.xSmall,
      padding: dimens.small,
      borderRadius: dimens.xxSmall,
      color: colors.colorOnSurface,
      backgroundColor: colors.colorSurface,
    },
  });

const ProductSearchScreen = () => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  const {
    params: { q, categoryId },
  } = useRoute<RouteProp<RootStackParamList, 'Search'>>();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Search'>>();

  const [filter, setFilter] = useState(false);

  const { categories } = useCategories();

  const {
    products,
    loading,
    loaded,
    ended,
    error,
    q: qUery,
    categoryId: categoryID,
  } = useProductsSearch();

  const [fetchProducts, unfetchProducts] = useProductsSearchFetch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.header}>
          <SearchFormComponent
            text={q as string}
            action={query => {
              navigation.setParams({ q: query, categoryId });
            }}
          />
        </View>
      ),
      headerRight: () => (
        <HeaderButtonComponent icon="funnel" action={() => setFilter(true)} />
      ),
    });
  }, [styles, navigation, q, categoryId, unfetchProducts]);

  useEffect(() => {
    if (!loaded) {
      fetchProducts(q, categoryId);
    } else if (categoryID !== categoryId || q !== qUery) {
      unfetchProducts();
    }
  }, [
    q,
    categoryId,
    loaded,
    categoryID,
    qUery,
    fetchProducts,
    unfetchProducts,
  ]);

  const productsFetch = () =>
    fetchProducts(q, categoryId, products[products.length - 1].id);

  return (
    <View>
      {categoryId && (
        <Text style={styles.category}>
          {t('Category')}:{' '}
          {categories.find(c => c.id === categoryId)?.name ?? categoryId}
        </Text>
      )}
      <CategoriesModalComponent
        visible={filter}
        action={catId => {
          setFilter(false);
          navigation.setParams({ q, categoryId: catId });
        }}
        close={() => setFilter(false)}
      />
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
    </View>
  );
};

export default ProductSearchScreen;
