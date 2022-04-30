import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    title: {
      color: colors.colorOnSurface,
      marginBottom: dimens.xSmall,
    },

    pickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    quantity: {
      fontWeight: 'bold',
      marginRight: dimens.xSmall,
      color: colors.colorOnSurface,
    },

    quantityAvailable: {
      marginRight: dimens.xSmall,
      color: colors.colorOnSurface,
    },

    button: {
      padding: 2,
      marginRight: dimens.xSmall,
      borderRadius: dimens.medium,
      backgroundColor: colors.colorPrimary,
    },

    buttonIcon: {
      fontSize: dimens.large,
      color: colors.colorOnPrimary,
    },
  });

const QuantityButton = ({
  icon,
  action,
}: {
  icon: string;
  action: () => void;
}) => {
  const styles = useAppStyles(getStyles);

  return (
    <TouchableOpacity
      onPress={action}
      style={styles.button}
      activeOpacity={0.8}>
      <Ionicons name={icon} style={styles.buttonIcon} />
    </TouchableOpacity>
  );
};

const QuantityPickerComponent = ({
  quantity,
  quantityToOrder,
  hideTitle = false,
  setQuantityToOrder,
}: {
  quantity: number;
  quantityToOrder: number;
  hideTitle?: boolean;
  setQuantityToOrder: (quantity: number) => void;
}) => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  const onQuantityChange = (value: number) => {
    value = quantityToOrder + value;
    if (quantity === 0) {
      setQuantityToOrder(0);
    } else if (value < 1) {
      setQuantityToOrder(1);
    } else if (value > quantity) {
      setQuantityToOrder(quantity);
    } else {
      setQuantityToOrder(value);
    }
  };

  return (
    <View>
      {!hideTitle && <Text style={styles.title}>{t('Quantity')}</Text>}
      <View style={styles.pickerContainer}>
        <QuantityButton icon="remove" action={() => onQuantityChange(-1)} />
        <Text style={styles.quantity}>{quantityToOrder}</Text>
        <QuantityButton icon="add" action={() => onQuantityChange(1)} />
        <Text style={styles.quantityAvailable}>
          {t('unit_available', { count: quantity })}
        </Text>
      </View>
    </View>
  );
};

export default QuantityPickerComponent;
