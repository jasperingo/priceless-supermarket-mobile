import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import ErrorComponent from '../../components/fetch/ErrorComponent';
import LoadingComponent from '../../components/fetch/LoadingComponent';
import RetryComponent from '../../components/fetch/RetryComponent';
import SpecificationComponent from '../../components/utils/SpecificationComponent';
import { useCustomer } from '../../customer';
import ErrorCode from '../../errors/ErrorCode';
import { useDateFormat, useMoneyFormat } from '../../hooks/formatters';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import OrderItemComponent from '../components/OrderItemComponent';
import useOrderFetch from '../hooks/orderFetchHook';
import useOrder from '../hooks/orderHook';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      margin: dimens.xSmall,
    },

    heading: {
      padding: dimens.xSmall,
      marginBottom: dimens.small,
      borderRadius: dimens.xSmall,
      color: colors.colorOnSurface,
      backgroundColor: colors.colorSurface,
    },

    itemHeading: {
      fontWeight: 'bold',
      padding: dimens.xSmall,
      color: colors.colorOnSurface,
      backgroundColor: colors.colorSurface,
      borderTopLeftRadius: dimens.xSmall,
      borderTopRightRadius: dimens.xSmall,
    },
  });

const OrderScreen = () => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  const dateFormat = useDateFormat();

  const moneyFormat = useMoneyFormat();

  const {
    params: { id },
  } = useRoute<RouteProp<RootStackParamList, 'Order'>>();

  const { token } = useCustomer();

  const { order, orderId, error, loading } = useOrder();

  const [fetchOrder, unfetchOrder] = useOrderFetch();

  const orderFetch = useCallback(() => {
    fetchOrder(id, token);
  }, [fetchOrder, id, token]);

  useEffect(() => {
    if ((order !== null || error !== null) && orderId !== id) {
      unfetchOrder();
    } else if (order === null && error === null) {
      orderFetch();
    }
  }, [id, order, error, orderId, orderFetch, unfetchOrder]);

  return (
    <FlatList
      data={order === null ? [] : order.orderItems}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => <OrderItemComponent item={item} />}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        order !== null ? (
          <>
            <View style={styles.heading}>
              <SpecificationComponent
                title="Order_number"
                body={order.number as string}
              />
              <SpecificationComponent
                title="Total"
                body={moneyFormat(order.total as number)}
              />
              <SpecificationComponent
                title="Date"
                body={dateFormat(order.createdAt as Date)}
              />
              <SpecificationComponent
                title="Delivery_street"
                body={order.deliveryAddressStreet as string}
              />
              <SpecificationComponent
                title="Delivery_city"
                body={order.deliveryAddressCity as string}
              />
              <SpecificationComponent
                title="Delivery_state"
                body={order.deliveryAddressState as string}
              />
            </View>
            <Text style={styles.itemHeading}>
              {t('__item', { count: order.orderItems?.length as number })}
            </Text>
          </>
        ) : null
      }
      ListFooterComponent={
        order === null ? (
          <View style={styles.heading}>
            {(loading && <LoadingComponent />) ||
              (error === ErrorCode.NOT_FOUND && (
                <ErrorComponent text="_not_found" />
              )) ||
              (error === ErrorCode.UNAUTHORIZED && (
                <ErrorComponent text="Authorization_failed" />
              )) ||
              (error === ErrorCode.PERMISSION_DENIED && (
                <ErrorComponent text="Permission_denied" />
              )) ||
              (error === ErrorCode.NO_NETWORK_CONNECTION && (
                <RetryComponent
                  action={orderFetch}
                  text="Not_network_connection"
                />
              )) ||
              (error !== null && <RetryComponent action={orderFetch} />)}
          </View>
        ) : null
      }
    />
  );
};

export default OrderScreen;
