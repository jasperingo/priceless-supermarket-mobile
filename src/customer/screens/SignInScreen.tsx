import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { RootStackParamList } from '../../../App';
import FormButtonComponent from '../../components/form/FormButtonComponent';
import HaveAnAccountComponent from '../../components/form/HaveAnAccountComponent';
import InputComponent from '../../components/form/InputComponent';
import LoadingModalComponent from '../../components/modal/LoadingModalComponent';
import { useErrorTextTranslate } from '../../errors/errorTextHook';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import useCustomerFetch from '../hooks/customerFetchHook';
import useCustomerSignIn from '../hooks/customerSignInHook';

const getStyles = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      minHeight: '100%',
      padding: dimensions.medium,
      backgroundColor: colors.colorSurface,
    },

    containerContent: {
      flex: 1,
      justifyContent: 'center',
    },

    forgotPasswordButton: {
      alignItems: 'center',
      marginBottom: dimensions.medium,
    },

    forgotPasswordText: {
      color: colors.colorSecondary,
    },
  });

const SignInScreen = () => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  const errorText = useErrorTextTranslate();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignIn'>>();

  const [submit, loading, success, error, customerId, customerAuthToken] =
    useCustomerSignIn();

  const [fetchCustomer, , customer, fetchLoading, fetchError] =
    useCustomerFetch();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error !== null) {
      ToastAndroid.show(errorText(error), ToastAndroid.LONG);
    }

    if (success && customerAuthToken !== null) {
      fetchCustomer(customerId, customerAuthToken);
    }
  }, [customerId, customerAuthToken, success, error, fetchCustomer, errorText]);

  useEffect(() => {
    if (fetchError) {
      ToastAndroid.show(errorText(fetchError), ToastAndroid.LONG);
    }

    if (customer !== null) {
      navigation.replace('Home', { screen: 'Products' });
    }
  }, [fetchError, customer, navigation, errorText]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 100}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}>
        <InputComponent
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <InputComponent
          label="Password"
          password={true}
          value={password}
          onChangeText={setPassword}
        />

        <FormButtonComponent
          text="Sign_in"
          action={() => submit(email, password)}
        />

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => Alert.alert('Not available')}>
          <Text style={styles.forgotPasswordText}>{t('Forgot_password')}</Text>
        </TouchableOpacity>

        <HaveAnAccountComponent
          buttonText="Sign_up"
          question="Do_not_have_an_account"
          action={() => navigation.navigate('SignUp')}
        />

        <LoadingModalComponent visible={loading || fetchLoading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
