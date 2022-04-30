import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../../App';
import { AppDimensions, useAppStyles } from '../../hooks/styles';
import CategoryItem from '../components/CategoryItem';
import CategoryListFooterComponent from '../components/CategoryListFooterComponent';
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

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const { categories, loaded, error } = useCategories();

  const [fetchCategory, unfetchCategory] = useCategoriesFetch();

  useEffect(() => {
    if (!loaded && error === null) {
      fetchCategory();
    }
  }, [error, loaded, fetchCategory]);

  return (
    <FlatList
      numColumns={2}
      data={categories}
      refreshing={false}
      onRefresh={unfetchCategory}
      renderItem={({ item }) => (
        <CategoryItem
          item={item}
          action={() =>
            navigation.navigate('Search', {
              q: null,
              categoryId: item.id as number,
            })
          }
        />
      )}
      columnWrapperStyle={styles.wrapper}
      ListFooterComponentStyle={styles.wrapper}
      ListFooterComponent={<CategoryListFooterComponent />}
    />
  );
};

export default CategoriesScreen;
