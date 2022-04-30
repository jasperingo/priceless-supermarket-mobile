import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import EmptyListComponent from '../../components/fetch/EmptyListComponent';
import CartItemComponent from '../components/CartItemComponent';
import useCart from '../hooks/cartHook';

const styles = StyleSheet.create({});

const CartScreen = () => {
  const { cart } = useCart();

  return (
    <View>
      {cart !== null && (
        <FlatList
          data={cart.orderItems}
          renderItem={() => <CartItemComponent />}
        />
      )}
      {(cart === null || cart.orderItems?.length === 0) && (
        <EmptyListComponent text="Cart_is_empty" />
      )}
    </View>
  );
};

export default CartScreen;
