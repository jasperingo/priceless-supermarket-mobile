import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: dimens.small,
    },

    quantity: {
      marginRight: dimens.xSmall,
      color: colors.colorOnSurface,
    },

    quantityAvailable: {
      marginRight: dimens.xSmall,
      color: colors.colorOnSurface,
    },

    button: {
      padding: dimens.xxSmall,
      marginRight: dimens.xSmall,
      borderRadius: dimens.medium,
      backgroundColor: colors.colorPrimary,
    },

    buttonIcon: {
      fontSize: dimens.large,
      color: colors.colorOnPrimary,
    },
  });

const QuantityButton = ({ icon }: { icon: string }) => {
  const styles = useAppStyles(getStyles);

  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
      <Ionicons name={icon} style={styles.buttonIcon} />
    </TouchableOpacity>
  );
};

const QuantityPickerComponent = () => {
  const styles = useAppStyles(getStyles);

  return (
    <View style={styles.container}>
      <QuantityButton icon="remove" />
      <Text style={styles.quantity}>1</Text>
      <QuantityButton icon="add" />
      <Text style={styles.quantityAvailable}>20 units available</Text>
    </View>
  );
};

export default QuantityPickerComponent;
