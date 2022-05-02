import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../../App';
import {
  AppColors,
  AppDimensions,
  useAppColors,
  useAppStyles,
} from '../hooks/styles';
import {
  useCustomer,
  useCustomerAuthGet,
  useCustomerAuthUnset,
  useCustomerFetch,
} from '../customer';
import ErrorCode from '../errors/ErrorCode';
import { useErrorTextTranslate } from '../errors/errorTextHook';
import { useTranslation } from 'react-i18next';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    image: {
      marginBottom: dimens.xxLarge,
    },

    retry: {
      padding: dimens.small,
      borderRadius: dimens.xxSmall,
      backgroundColor: colors.colorPrimary,
    },

    retryText: {
      color: colors.colorOnPrimary,
    },
  });

const SplashScreen = () => {
  const { t } = useTranslation();

  const colors = useAppColors();

  const styles = useAppStyles(getStyles);

  const errorText = useErrorTextTranslate();

  const getAuth = useCustomerAuthGet();

  const removeAuth = useCustomerAuthUnset();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Splash'>>();

  const { customer, loading: fetchLoading, error: fetchError } = useCustomer();

  const [fetchCustomer] = useCustomerFetch();

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useCallback(
    () => navigation.replace('Home', { screen: 'Products' }),
    [navigation],
  );

  useEffect(() => {
    const unsaveToken = async () => {
      setLoading(true);
      try {
        await removeAuth();
        navigate();
      } catch {
        setError(true);
      }
    };

    if (fetchError !== null) {
      if (fetchError === ErrorCode.UNAUTHORIZED) {
        unsaveToken();
      } else {
        setError(true);
        ToastAndroid.show(errorText(fetchError), ToastAndroid.LONG);
      }
    } else {
      setError(false);
    }
  }, [fetchError, removeAuth, errorText, navigate]);

  useEffect(() => {
    const checkForAuth = async () => {
      try {
        const [id, token] = await getAuth();
        if (id !== null && token !== null) {
          fetchCustomer(Number(id), token);
        } else {
          navigate();
        }
      } catch {
        setError(true);
      }
    };

    if (!error) {
      if (customer !== null) {
        navigate();
      } else {
        checkForAuth();
      }
    }
  }, [error, customer, navigate, getAuth, fetchCustomer]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/logo-pro.png')}
      />

      {(fetchLoading || loading) && (
        <ActivityIndicator color={colors.colorPrimary} size="large" />
      )}

      {error && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.retry}
          onPress={() => setError(false)}>
          <Text style={styles.retryText}>{t('Retry')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SplashScreen;
