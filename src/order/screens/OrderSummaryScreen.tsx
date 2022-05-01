import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import FormButtonComponent from '../../components/form/FormButtonComponent';
import LoadingModalComponent from '../../components/modal/LoadingModalComponent';
import { useErrorTextTranslate } from '../../errors/errorTextHook';
import { useMoneyFormat } from '../../hooks/formatters';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import CartItemComponent from '../components/CartItemComponent';
import useCart from '../hooks/cartHook';
import useCartItemsTotal from '../hooks/cartItemsTotalHook';
import useOrderCreate from '../hooks/orderCreateHook';

const getStyle = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      padding: dimens.xSmall,
    },

    footer: {
      padding: dimens.xSmall,
      marginBottom: dimens.small,
      borderRadius: dimens.xSmall,
      backgroundColor: colors.colorSurface,
    },

    detail: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: dimens.small,
    },

    detailTitle: {
      fontWeight: 'bold',
      fontSize: dimens.medium,
      color: colors.colorOnSurface,
    },

    detailBody: {
      fontSize: dimens.medium,
      color: colors.colorOnSurface,
    },
  });

const OrderSummaryScreen = () => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyle);

  const { cart } = useCart();

  const moneyFormat = useMoneyFormat();

  const errorText = useErrorTextTranslate();

  const total = useCartItemsTotal();

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'OrderSummary'>
    >();

  const [
    onSubmit,
    loading,
    success,
    error,
    orderId,
    stateError,
    cityError,
    streetError,
    itemsError,
  ] = useOrderCreate();

  useEffect(() => {
    if (success) {
      navigation.navigate('Order', { id: orderId });
    }
  }, [success, orderId, navigation]);

  useEffect(() => {
    let message = '';

    if (error) {
      message += `${errorText(error)}, `;
    }

    if (stateError) {
      message += `${errorText(stateError)}, `;
    }

    if (cityError) {
      message += `${errorText(cityError)}, `;
    }

    if (streetError) {
      message += `${errorText(streetError)}, `;
    }

    if (itemsError) {
      message += `${errorText(itemsError)}.`;
    }

    Alert.alert(message);
  }, [error, stateError, cityError, streetError, itemsError, errorText]);

  return (
    <FlatList
      data={cart?.orderItems ?? []}
      renderItem={({ item }) => <CartItemComponent item={item} />}
      contentContainerStyle={styles.container}
      ListFooterComponentStyle={styles.footer}
      ListFooterComponent={
        <View>
          <View style={styles.detail}>
            <Text style={styles.detailTitle}>{t('Delivery_street')}</Text>
            <Text style={styles.detailBody}>{cart?.deliveryAddressStreet}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailTitle}>{t('Delivery_city')}</Text>
            <Text style={styles.detailBody}>{cart?.deliveryAddressCity}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailTitle}>{t('Delivery_state')}</Text>
            <Text style={styles.detailBody}>{cart?.deliveryAddressState}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailTitle}>{t('Total')}</Text>
            <Text style={styles.detailBody}>{moneyFormat(total)}</Text>
          </View>
          <FormButtonComponent text={t('Place_order')} action={onSubmit} />
          <LoadingModalComponent visible={loading} />
        </View>
      }
    />
  );
};

export default OrderSummaryScreen;
