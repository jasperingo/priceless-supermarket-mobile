import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalComponent from '../../components/modal/ModalComponent';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import useCategoriesFetch from '../hooks/categoriesFetchHook';
import useCategories from '../hooks/categoriesHook';
import CategoryListFooterComponent from './CategoryListFooterComponent';

const getStyle = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      margin: dimens.xSmall,
      borderRadius: dimens.xxSmall,
      backgroundColor: colors.colorSurface,
    },

    item: {
      minWidth: '80%',
      borderBottomWidth: 1,
      padding: dimens.small,
      borderBottomColor: colors.colorBackground,
    },

    itemText: {
      fontSize: dimens.medium,
      color: colors.colorOnSurface,
    },

    close: {
      padding: dimens.xSmall,
      alignSelf: 'flex-end',
    },

    closeIcon: {
      fontSize: dimens.large,
      color: colors.colorOnSurface,
    },
  });

const CategoriesModalComponent = ({
  visible,
  action,
  close,
}: {
  visible: boolean;
  action: (id: number) => void;
  close: () => void;
}) => {
  const styles = useAppStyles(getStyle);

  const { categories, loaded } = useCategories();

  const [fetchCategory] = useCategoriesFetch();

  useEffect(() => {
    if (!loaded) {
      fetchCategory();
    }
  }, [loaded, fetchCategory]);

  return (
    <ModalComponent visible={visible}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.item}
            onPress={() => action(item.id as number)}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.container}
        ListHeaderComponent={
          <TouchableOpacity
            onPress={close}
            style={styles.close}
            activeOpacity={0.8}>
            <Ionicons name="close" style={styles.closeIcon} />
          </TouchableOpacity>
        }
        ListFooterComponentStyle={styles.container}
        ListFooterComponent={<CategoryListFooterComponent />}
      />
    </ModalComponent>
  );
};

export default CategoriesModalComponent;
