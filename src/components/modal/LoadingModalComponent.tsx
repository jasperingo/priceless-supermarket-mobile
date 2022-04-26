import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import {
  AppColors,
  AppDimensions,
  useAppStyles,
  useAppColors,
} from '../../hooks/styles';
import ModalComponent from './ModalComponent';

const getStyles = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    loader: {
      padding: dimensions.medium,
      borderRadius: dimensions.xxSmall,
      backgroundColor: colors.colorSurface,
    },
  });

const LoadingModalComponent = ({ visible }: { visible: boolean }) => {
  const colors = useAppColors();

  const styles = useAppStyles(getStyles);

  return (
    <ModalComponent visible={visible}>
      <ActivityIndicator
        size="large"
        style={styles.loader}
        color={colors.colorPrimary}
      />
    </ModalComponent>
  );
};

export default LoadingModalComponent;
