import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../../App';
import EmptyListComponent from '../../components/fetch/EmptyListComponent';
import LoadingComponent from '../../components/fetch/LoadingComponent';
import RetryComponent from '../../components/fetch/RetryComponent';
import {
  useCustomer,
  useCustomerOrders,
  useCustomerOrdersFetch,
} from '../../customer';
import ErrorCode from '../../errors/ErrorCode';
import { AppDimensions, useAppStyles } from '../../hooks/styles';
import OrderComponent from '../components/OrderComponent';

const getStyle = (_: any, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      margin: dimensions.xSmall,
    },
  });

const OrdersScreen = () => {
  const styles = useAppStyles(getStyle);

  const { customer, token } = useCustomer();

  const { orders, loading, loaded, ended, error } = useCustomerOrders();

  const [fetchOrders, unfetchOrders] = useCustomerOrdersFetch();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Orders'>>();

  useEffect(() => {
    if (!loaded && error === null) {
      fetchOrders(customer?.id as number, token as string);
    }
  }, [customer, token, error, loaded, fetchOrders]);

  const ordersFetch = () =>
    fetchOrders(
      customer?.id as number,
      token as string,
      orders[orders.length - 1]?.id,
    );

  return (
    <FlatList
      data={orders}
      refreshing={false}
      onRefresh={unfetchOrders}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <OrderComponent
          item={item}
          action={() => navigation.navigate('Order', { id: item.id as number })}
        />
      )}
      contentContainerStyle={styles.container}
      onEndReached={ended ? null : ordersFetch}
      ListFooterComponent={
        (loading && <LoadingComponent />) ||
        (error === ErrorCode.NO_NETWORK_CONNECTION && (
          <RetryComponent text="Not_network_connection" action={ordersFetch} />
        )) ||
        (error === ErrorCode.UNAUTHORIZED && (
          <RetryComponent text="Authorization_failed" action={ordersFetch} />
        )) ||
        (error !== null && <RetryComponent action={ordersFetch} />) ||
        (loaded && orders.length === 0 && (
          <EmptyListComponent text="_empty_orders" />
        )) ||
        null
      }
    />
  );
};

export default OrdersScreen;
