import React from 'react';
import { useTranslation } from 'react-i18next';
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

type Props = {
  text: string;
  action: () => void;
};

const FormButtonComponent = ({ text, action }: Props) => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={action}>
      <Text style={styles.text}>{t(text)}</Text>
    </TouchableOpacity>
  );
};

export default FormButtonComponent;
