import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMoneyFormat } from '../../hooks/formatters';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import useCartItemsTotal from '../hooks/cartItemsTotalHook';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      padding: dimens.xSmall,
      marginBottom: dimens.small,
      borderRadius: dimens.xSmall,
      backgroundColor: colors.colorSurface,
    },

    button: {
      alignItems: 'center',
      padding: dimens.small,
      borderRadius: dimens.xSmall,
      backgroundColor: colors.colorPrimary,
    },

    buttonText: {
      fontWeight: 'bold',
      color: colors.colorOnPrimary,
    },

    total: {
      fontSize: dimens.xLarge,
      marginBottom: dimens.small,
      color: colors.colorSecondary,
    },
  });

const CartCheckOutComponent = () => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  const moneyFormat = useMoneyFormat();

  const total = useCartItemsTotal();

  return (
    <View style={styles.container}>
      <Text style={styles.total}>{moneyFormat(total)}</Text>
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.buttonText}>{t('Check_out')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartCheckOutComponent;
