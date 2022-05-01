import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { AppDimensions, useAppStyles } from '../../hooks/styles';
import OrderItemComponent from '../components/OrderItemComponent';

const getStyle = (_: any, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      margin: dimensions.xSmall,
    },
  });

const OrdersScreen = () => {
  const styles = useAppStyles(getStyle);

  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6]}
      keyExtractor={item => String(item)}
      renderItem={() => <OrderItemComponent />}
      contentContainerStyle={styles.container}
    />
  );
};

export default OrdersScreen;
