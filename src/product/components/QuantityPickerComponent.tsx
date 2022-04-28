import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: dimens.xSmall,
    },
  });

const QuantityButton = ({ icon }: { icon: string }) => {
  return (
    <TouchableOpacity>
      <Ionicons name={icon} />
    </TouchableOpacity>
  );
};

const QuantityPickerComponent = () => {
  const styles = useAppStyles(getStyles);

  return (
    <View style={styles.container}>
      <QuantityButton icon="remove" />
      <Text>QuantityPickerComponent</Text>
      <QuantityButton icon="add" />
    </View>
  );
};

export default QuantityPickerComponent;
