import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingVertical: dimens.xLarge,
      paddingHorizontal: dimens.small,
      backgroundColor: colors.colorSurface,
    },

    text: {
      fontWeight: 'bold',
      color: colors.colorOnSurface,
    },

    icon: {
      fontSize: 40,
      color: colors.colorError,
    },
  });

const ErrorComponent = ({ text }: { text: string }) => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  return (
    <View style={styles.container}>
      <Ionicons name="warning-outline" style={styles.icon} />
      <Text style={styles.text}>{t(text)}</Text>
    </View>
  );
};

export default ErrorComponent;
