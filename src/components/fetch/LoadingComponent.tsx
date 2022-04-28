import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {
  AppColors,
  AppDimensions,
  useAppColors,
  useAppStyles,
} from '../../hooks/styles';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      padding: dimens.xSmall,
      borderRadius: dimens.xxSmall,
      backgroundColor: colors.colorSurface,
    },
  });

const LoadingComponent = () => {
  const colors = useAppColors();

  const styles = useAppStyles(getStyles);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.colorPrimary} />
    </View>
  );
};

export default LoadingComponent;
