import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      borderWidth: 1.2,
      padding: dimensions.xxSmall,
      marginBottom: dimensions.medium,
      borderRadius: dimensions.xxSmall,
      borderColor: colors.colorSecondary,
      backgroundColor: colors.colorSurface,
    },

    label: {
      color: colors.colorOnSurface,
    },

    input: {
      padding: dimensions.xxSmall,
      color: colors.colorOnSurface,
    },
  });

const InputComponent = ({ label }: { label: string }) => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t(label)}</Text>
      <TextInput style={styles.input} />
    </View>
  );
};

export default InputComponent;
