import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useMoneyFormat } from '../../hooks/formatters';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import { usePhotoUrl } from '../../photo';
import useOrderItemStatusColor from '../hooks/orderItemStatusColorHook';
import OrderItem, { OrderItemStatus } from '../models/OrderItem';

const getStyle = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: dimens.xSmall,
      marginBottom: dimens.small,
      borderRadius: dimens.xxSmall,
      backgroundColor: colors.colorSurface,
    },

    body: {
      flexGrow: 1,
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

    updateButton: {
      padding: dimens.xSmall,
      marginTop: dimens.xSmall,
      borderRadius: dimens.xxSmall,
      backgroundColor: colors.colorPrimary,
    },

    updateButtonRed: {
      padding: dimens.xSmall,
      marginTop: dimens.xSmall,
      borderRadius: dimens.xxSmall,
      backgroundColor: colors.colorError,
    },

    updateButtonText: {
      textAlign: 'center',
      color: colors.colorOnPrimary,
    },
  });

const OrderItemComponent = ({ item }: { item: OrderItem }) => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyle);

  const moneyFormat = useMoneyFormat();

  const uri = usePhotoUrl(item?.product?.photo?.url as string);

  const statusColor = useOrderItemStatusColor();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri }} />
      <View style={styles.body}>
        <Text style={styles.number}>{item.product?.name}</Text>
        <Text style={styles.amount}>{moneyFormat(item.amount as number)}</Text>
        <Text style={styles.quantity}>QTY: {item.quantity}</Text>
        <Text style={[styles.status, statusColor(item.status)]}>
          {item.status}
        </Text>
        {item.status === OrderItemStatus.PENDING && (
          <TouchableOpacity activeOpacity={0.8} style={styles.updateButtonRed}>
            <Text style={styles.updateButtonText}>{t('Cancel')}</Text>
          </TouchableOpacity>
        )}
        {item.status === OrderItemStatus.TRANSPORTING && (
          <TouchableOpacity activeOpacity={0.8} style={styles.updateButton}>
            <Text style={styles.updateButtonText}>{t('Fulfilled')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OrderItemComponent;
