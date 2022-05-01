import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDateFormat, useMoneyFormat } from '../../hooks/formatters';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import { usePhotoUrl } from '../../photo';
import Order from '../models/Order';

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

const OrderItemComponent = ({
  item,
  action,
}: {
  item: Order;
  action: () => void;
}) => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyle);

  const dateFormat = useDateFormat();

  const moneyFormat = useMoneyFormat();

  const uri = usePhotoUrl(item?.orderItems?.[0]?.product?.photo?.url as string);

  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={styles.container}>
      <Image style={styles.image} source={{ uri }} />
      <View>
        <Text style={styles.number}>{item.number}</Text>
        <Text style={styles.amount}>{moneyFormat(item.total as number)}</Text>
        <Text style={styles.items}>
          {t('__item', { count: item.orderItems?.length })}
        </Text>
        <Text style={styles.date}>{dateFormat(item.createdAt as Date)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderItemComponent;
