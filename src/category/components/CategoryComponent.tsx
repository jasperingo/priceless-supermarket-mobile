import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import { usePhotoUrl } from '../../photo';
import Category from '../models/Category';

const getStyle = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      flexGrow: 0.45,
      flexDirection: 'row',
      alignItems: 'center',
      padding: dimensions.small,
      borderRadius: dimensions.xxSmall,
      backgroundColor: colors.colorSurface,
    },

    image: {
      width: 40,
      height: 40,
      marginRight: dimensions.small,
      borderRadius: dimensions.xxSmall,
    },

    name: {
      fontWeight: 'bold',
      color: colors.colorSecondary,
    },
  });

const CategoryComponent = ({
  item,
  action,
}: {
  item: Category;
  action: () => void;
}) => {
  const styles = useAppStyles(getStyle);

  const uri = usePhotoUrl(item.photo?.url as string);

  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={styles.container}>
      <Image style={styles.image} source={{ uri }} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryComponent;
