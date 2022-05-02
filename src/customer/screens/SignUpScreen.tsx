import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
} from 'react-native';
import { RootStackParamList } from '../../../App';
import FormButtonComponent from '../../components/form/FormButtonComponent';
import HaveAnAccountComponent from '../../components/form/HaveAnAccountComponent';
import InputComponent from '../../components/form/InputComponent';
import LoadingModalComponent from '../../components/modal/LoadingModalComponent';
import { useErrorTextTranslate } from '../../errors/errorTextHook';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import useCustomerCreate from '../hooks/customerCreateHook';
import useCustomerSignIn from '../hooks/customerSignInHook';
import useCustomer from '../hooks/customerHook';
import { CustomerActionType } from '../context/customerState';

const getStyles = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      minHeight: '100%',
      padding: dimensions.medium,
      backgroundColor: colors.colorSurface,
    },

    containerContent: {
      justifyContent: 'center',
    },

    tos: {
      color: colors.colorOnBackground,
      marginBottom: dimensions.medium,
    },

    haveAnAccount: {
      flexDirection: 'row',
      justifyContent: 'center',
    },

    haveAnAccountQuestion: {
      color: colors.colorOnBackground,
    },

    haveAnAccountAction: {
      color: colors.colorSecondary,
    },
  });

const SignUpScreen = () => {
  const errorText = useErrorTextTranslate();

  const styles = useAppStyles(getStyles);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignUp'>>();

  const { dispatch } = useCustomer();

  const [
    submit,
    loading,
    success,
    error,
    firstNameError,
    lastNameError,
    emailAddressError,
    phoneNumberError,
    passwordError,
  ] = useCustomerCreate();

  const [
    loginSubmit,
    loginLoading,
    loginSuccess,
    loginError,
    ,
    customerAuthToken,
  ] = useCustomerSignIn();

  const [firstName, setFirstName] = useState('');

  const [lastName, setLastName] = useState('');

  const [emailAddress, setEmailAddress] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');

  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error !== null) {
      ToastAndroid.show(errorText(error), ToastAndroid.LONG);
    }

    if (success) {
      loginSubmit(emailAddress, password);
    }
  }, [emailAddress, password, success, error, errorText, loginSubmit]);

  useEffect(() => {
    if (loginError !== null) {
      ToastAndroid.show(errorText(loginError), ToastAndroid.LONG);
    }

    if (loginSuccess) {
      dispatch?.({
        type: CustomerActionType.FETCHED,
        payload: { token: customerAuthToken },
      });
      navigation.navigate('Home', { screen: 'Products' });
    }
  }, [
    loginSuccess,
    loginError,
    navigation,
    customerAuthToken,
    errorText,
    dispatch,
  ]);

  const onSubmitClicked = () => {
    submit(firstName, lastName, emailAddress, phoneNumber, password);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 100}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}>
        <InputComponent
          label="First_name"
          value={firstName}
          onChangeText={setFirstName}
          error={firstNameError}
        />

        <InputComponent
          label="Last_name"
          value={lastName}
          onChangeText={setLastName}
          error={lastNameError}
        />

        <InputComponent
          label="Email"
          value={emailAddress}
          onChangeText={setEmailAddress}
          error={emailAddressError}
          keyboardType="email-address"
        />

        <InputComponent
          label="Phone_number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          error={phoneNumberError}
          keyboardType="phone-pad"
        />

        <InputComponent
          label="Password"
          password={true}
          value={password}
          onChangeText={setPassword}
          error={passwordError}
        />

        <Text style={styles.tos}>
          By signing up, you agree to our terms of service
        </Text>

        <FormButtonComponent text="Sign_up" action={onSubmitClicked} />

        <HaveAnAccountComponent
          buttonText="Sign_in"
          question="Already_have_an_account"
          action={() => navigation.navigate('SignIn')}
        />

        <LoadingModalComponent visible={loading || loginLoading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
