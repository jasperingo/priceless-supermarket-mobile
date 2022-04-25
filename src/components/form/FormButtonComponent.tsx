import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      borderWidth: 1.5,
      padding: dimensions.small,
      marginBottom: dimensions.medium,
      borderRadius: dimensions.xxSmall,
      borderColor: colors.colorPrimary,
      backgroundColor: colors.colorPrimary,
    },

    text: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.colorOnPrimary,
    },
  });

const FormButtonComponent = () => {
  const styles = useAppStyles(getStyles);

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <Text style={styles.text}>Sign up</Text>
    </TouchableOpacity>
  );
};

export default FormButtonComponent;
