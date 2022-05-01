import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useMoneyFormat } from '../../hooks/formatters';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import { usePhotoUrl } from '../../photo';
import OrderItem from '../models/OrderItem';

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
      fontSize: dimens.medium,
      color: colors.colorSecondary,
      marginBottom: dimens.xxSmall,
    },

    quantity: {
      color: colors.colorOnSurface,
      marginBottom: dimens.xxSmall,
    },

    status: {
      alignSelf: 'flex-start',
      color: colors.colorOnPrimary,
      borderRadius: dimens.xxSmall,
      paddingVertical: dimens.xxSmall,
      paddingHorizontal: dimens.xSmall,
      backgroundColor: colors.colorGray,
    },
  });

const OrderItemComponent = ({ item }: { item: OrderItem }) => {
  const styles = useAppStyles(getStyle);

  const moneyFormat = useMoneyFormat();

  const uri = usePhotoUrl(item?.product?.photo?.url as string);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri }} />
      <View>
        <Text style={styles.number}>{item.product?.name}</Text>
        <Text style={styles.amount}>{moneyFormat(item.amount as number)}</Text>
        <Text style={styles.quantity}>QTY: {item.quantity}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </View>
  );
};

export default OrderItemComponent;
