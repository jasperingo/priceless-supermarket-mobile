import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ErrorCode from '../../errors/ErrorCode';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import { useErrorTextTranslate } from '../../errors/errorTextHook';
import useCustomer from '../hooks/customerHook';
import useCustomerSignOut from '../hooks/customerSignOutHook';
import { RootStackParamList } from '../../../App';
import LoadingModalComponent from '../../components/modal/LoadingModalComponent';

const getStyle = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      padding: dimensions.medium,
    },

    name: {
      padding: dimensions.small,
      fontSize: dimensions.large,
      color: colors.colorOnSurface,
      borderRadius: dimensions.xxSmall,
      backgroundColor: colors.colorSurface,
    },

    signOutButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: dimensions.xSmall,
      borderRadius: dimensions.xxSmall,
      backgroundColor: colors.colorError,
    },

    signOutIcon: {
      fontSize: dimensions.large,
      color: colors.colorOnSecondary,
      marginRight: dimensions.xSmall,
    },

    signOutText: {
      fontSize: dimensions.medium,
      color: colors.colorOnSecondary,
    },

    menu: {
      marginVertical: dimensions.xxLarge,
    },

    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: dimensions.small,
      marginBottom: dimensions.medium,
      borderRadius: dimensions.xxSmall,
      backgroundColor: colors.colorSecondary,
    },

    menuItemIcon: {
      fontSize: dimensions.large,
      color: colors.colorOnSecondary,
      marginRight: dimensions.xSmall,
    },

    menuItemText: {
      fontSize: dimensions.medium,
      color: colors.colorOnSecondary,
    },
  });

const MenuItem = ({
  icon,
  text,
  action,
}: {
  icon: string;
  text: string;
  action: () => void;
}) => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyle);

  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={styles.menuItem}>
      <Ionicons name={icon} style={styles.menuItemIcon} />
      <Text style={styles.menuItemText}>{t(text)}</Text>
    </TouchableOpacity>
  );
};

const AccountScreen = () => {
  const { t } = useTranslation();

  const { customer } = useCustomer();

  const styles = useAppStyles(getStyle);

  const errorText = useErrorTextTranslate();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Account'>>();

  const [signOut, loading, error] = useCustomerSignOut();

  useEffect(() => {
    if (error) {
      ToastAndroid.show(errorText(ErrorCode.UNKNOWN), ToastAndroid.LONG);
    }

    if (customer === null) {
      navigation.replace('SignIn');
    }
  }, [error, customer, navigation, errorText]);

  const confirmSignOut = () => {
    Alert.alert(t('Confirm_sign_out'), t('_confirm_sign_out'), [
      { style: 'cancel', text: t('Cancel') },
      { style: 'default', text: t('Proceed'), onPress: signOut },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {t('Welcome')}, {customer?.firstName} {customer?.lastName}.
      </Text>
      <View style={styles.menu}>
        <MenuItem
          icon="person"
          text="Profile"
          action={() => navigation.navigate('Profile')}
        />

        <MenuItem
          icon="file-tray-full"
          text="Orders"
          action={() => Alert.alert('Orders clicked')}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={confirmSignOut}
        style={styles.signOutButton}>
        <Ionicons name="log-out" style={styles.signOutIcon} />
        <Text style={styles.signOutText}>{t('Sign_out')}</Text>
      </TouchableOpacity>

      <LoadingModalComponent visible={loading} />
    </View>
  );
};

export default AccountScreen;
