import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import FormButtonComponent from '../../components/form/FormButtonComponent';
import { useCustomer } from '../../customer';
import { useMoneyFormat } from '../../hooks/formatters';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import useCartItemsTotal from '../hooks/cartItemsTotalHook';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      padding: dimens.xSmall,
      marginBottom: dimens.small,
      borderRadius: dimens.xSmall,
      backgroundColor: colors.colorSurface,
    },

    total: {
      fontSize: dimens.xLarge,
      marginBottom: dimens.small,
      color: colors.colorSecondary,
    },
  });

const CartCheckOutComponent = () => {
  const { t } = useTranslation();

  const { customer } = useCustomer();

  const styles = useAppStyles(getStyles);

  const moneyFormat = useMoneyFormat();

  const total = useCartItemsTotal();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Cart'>>();

  return (
    <View style={styles.container}>
      <Text style={styles.total}>{moneyFormat(total)}</Text>
      <FormButtonComponent
        text={t('Check_out')}
        action={() =>
          navigation.navigate(customer === null ? 'SignIn' : 'DeliveryAddress')
        }
      />
    </View>
  );
};

export default CartCheckOutComponent;
