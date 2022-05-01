import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMoneyFormat } from '../../hooks/formatters';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyle = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: dimens.xSmall,
      marginBottom: dimens.small,
      borderRadius: dimens.xxSmall,
      backgroundColor: colors.colorSurface,
    },

    image: {
      width: 70,
      height: '100%',
      resizeMode: 'stretch',
      marginRight: dimens.small,
      borderRadius: dimens.xxSmall,
    },

    number: {
      fontSize: dimens.medium,
      color: colors.colorOnSurface,
      marginBottom: dimens.xxSmall,
    },

    amount: {
      fontSize: dimens.large,
      color: colors.colorSecondary,
      marginBottom: dimens.xxSmall,
    },

    items: {
      alignSelf: 'flex-start',
      padding: dimens.xxSmall,
      borderRadius: dimens.xSmall,
      color: colors.colorOnPrimary,
      marginBottom: dimens.xxSmall,
      backgroundColor: colors.colorPrimary,
    },

    date: {
      color: colors.colorGray,
    },
  });

const OrderItemComponent = () => {
  const styles = useAppStyles(getStyle);

  const moneyFormat = useMoneyFormat();

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Image
        style={styles.image}
        source={require('../../assets/images/logo.jpg')}
      />
      <View>
        <Text style={styles.number}>OrderItemComponent</Text>
        <Text style={styles.amount}>{moneyFormat(39)}</Text>
        <Text style={styles.items}>3 items</Text>
        <Text style={styles.date}>20:30pm 12th June 2022</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItemComponent;
