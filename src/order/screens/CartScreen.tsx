import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import EmptyListComponent from '../../components/fetch/EmptyListComponent';
import { AppDimensions, useAppStyles } from '../../hooks/styles';
import CartCheckOutComponent from '../components/CartCheckOutComponent';
import CartItemComponent from '../components/CartItemComponent';
import useCart from '../hooks/cartHook';

const getStyle = (_: any, dimensions: AppDimensions) =>
  StyleSheet.create({
    wrapper: {
      margin: dimensions.xSmall,
    },
  });

const CartScreen = () => {
  const { cart } = useCart();

  const styles = useAppStyles(getStyle);

  return (
    <FlatList
      data={cart?.orderItems ?? []}
      renderItem={({ item }) => <CartItemComponent item={item} />}
      contentContainerStyle={styles.wrapper}
      ListFooterComponent={
        (cart !== null && cart?.orderItems?.length && (
          <CartCheckOutComponent />
        )) ||
        ((cart === null || cart.orderItems?.length === 0) && (
          <EmptyListComponent text="Cart_is_empty" />
        )) ||
        null
      }
    />
  );
};

export default CartScreen;
