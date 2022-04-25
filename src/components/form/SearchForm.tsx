import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (Colors: AppColors, Dimensions: AppDimensions) =>
  StyleSheet.create({
    input: {
      height: 40,
      width: '100%',
      borderWidth: 1,
      borderColor: Colors.colorSecondary,
      paddingVertical: Dimensions.xxSmall,
      paddingHorizontal: Dimensions.small,
      borderRadius: Dimensions.xxSmall,
      backgroundColor: Colors.colorBackground,
    },
  });

const SearchForm = () => {
  const styles = useAppStyles(getStyles);
  return <TextInput style={styles.input} placeholder="Search products" />;
};

export default SearchForm;
