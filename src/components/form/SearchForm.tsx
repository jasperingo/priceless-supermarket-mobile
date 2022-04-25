import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (Colors: AppColors, Dimensions: AppDimensions) =>
  StyleSheet.create({
    input: {
      height: 40,
      flexGrow: 1,
      borderWidth: 1,
      borderColor: Colors.colorSecondary,
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
