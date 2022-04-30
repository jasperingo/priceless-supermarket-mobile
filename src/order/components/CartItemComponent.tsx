import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMoneyFormat } from '../../hooks/formatters';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import { usePhotoUrl } from '../../photo';
import { QuantityPickerComponent } from '../../product';
import { CartActionType } from '../context/cartState';
import useCart from '../hooks/cartHook';
import OrderItem from '../models/OrderItem';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: dimens.xSmall,
      marginBottom: dimens.small,
      borderRadius: dimens.xSmall,
      backgroundColor: colors.colorSurface,
    },

    image: {
      width: 70,
      height: '100%',
      resizeMode: 'stretch',
      marginRight: dimens.small,
      borderRadius: dimens.xxSmall,
    },

    body: {
      flexGrow: 1,
    },

    productName: {
      fontSize: dimens.medium,
      color: colors.colorOnSurface,
      marginBottom: dimens.xxSmall,
    },

    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    amount: {
      fontSize: dimens.large,
      color: colors.colorSecondary,
      marginBottom: dimens.xxSmall,
    },

    remove: {
      fontSize: dimens.xLarge,
      color: colors.colorError,
    },
  });

const CartItemComponent = ({ item }: { item: OrderItem }) => {
  const { t } = useTranslation();

  const { dispatch } = useCart();

  const styles = useAppStyles(getStyles);

  const moneyFormat = useMoneyFormat();

  const uri = usePhotoUrl(item.product?.photo?.url ?? '');

  const removeItem = () => {
    Alert.alert(t('Confirm_remove_item'), t('_confirm_remove_cart_item'), [
      { style: 'cancel', text: t('Cancel') },
      {
        style: 'default',
        text: t('Proceed'),
        onPress: () =>
          dispatch?.({
            type: CartActionType.ITEM_REMOVED,
            payload: { cartItem: item },
          }),
      },
    ]);
  };

  const changeQuantity = (quantity: number) => {
    dispatch?.({
      type: CartActionType.ITEM_QUANTITY_CHANGED,
      payload: { cartItem: { ...item, quantity } },
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri }} />
      <View style={styles.body}>
        <Text style={styles.productName}>{item.product?.name}</Text>
        <Text style={styles.amount}>
          {moneyFormat((item?.quantity ?? 0) * (item?.product?.price ?? 0))}
        </Text>
        <View style={styles.bottomContainer}>
          <QuantityPickerComponent
            hideTitle={true}
            setQuantityToOrder={changeQuantity}
            quantityToOrder={item.quantity as number}
            quantity={item.product?.quantity as number}
          />
          <TouchableOpacity activeOpacity={0.8} onPress={removeItem}>
            <Ionicons name="trash" style={styles.remove} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItemComponent;
