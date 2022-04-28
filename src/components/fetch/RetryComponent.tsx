import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: dimens.small,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.colorSurface,
    },

    text: {
      marginRight: dimens.xSmall,
      color: colors.colorOnSurface,
    },

    button: {
      padding: dimens.xSmall,
      borderRadius: dimens.xxSmall,
      backgroundColor: colors.colorPrimary,
    },

    buttonText: {
      color: colors.colorOnPrimary,
    },
  });

const RetryComponent = ({
  text = '_unknown_error',
  buttonText = 'Retry',
  action,
}: {
  text?: string;
  buttonText?: string;
  action: () => void;
}) => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t(text)}</Text>
      <TouchableOpacity
        onPress={action}
        activeOpacity={0.8}
        style={styles.button}>
        <Text style={styles.buttonText}>{t(buttonText)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RetryComponent;
