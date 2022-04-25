import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

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
      borderTopLeftRadius: dimensions.xxSmall,
      borderTopRightRadius: dimensions.xxSmall,
    },

    name: {
      fontWeight: 'bold',
      color: colors.colorSecondary,
    },
  });

const CategoryItem = () => {
  const styles = useAppStyles(getStyle);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/ba-removebg-preview.png')}
      />
      <Text style={styles.name}>Category</Text>
    </View>
  );
};

export default CategoryItem;
