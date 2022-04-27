import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FormButtonComponent from '../../components/form/FormButtonComponent';
import InputComponent from '../../components/form/InputComponent';
import LoadingModalComponent from '../../components/modal/LoadingModalComponent';
import { useErrorTextTranslate } from '../../errors/errorTextHook';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import useCustomer from '../hooks/customerHook';
import useCustomerUpdate from '../hooks/customerUpdateHook';

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
  });

const ProfileScreen = () => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  const { customer } = useCustomer();

  const errorText = useErrorTextTranslate();

  const [firstName, setFirstName] = useState(customer?.firstName ?? '');

  const [lastName, setLastName] = useState(customer?.lastName ?? '');

  const [emailAddress, setEmailAddress] = useState(
    customer?.emailAddress ?? '',
  );

  const [phoneNumber, setPhoneNumber] = useState(customer?.phoneNumber ?? '');

  const [
    submit,
    loading,
    success,
    error,
    firstNameError,
    lastNameError,
    emailAddressError,
    phoneNumberError,
  ] = useCustomerUpdate();

  useEffect(() => {
    if (error !== null) {
      ToastAndroid.show(errorText(error), ToastAndroid.LONG);
    }

    if (success) {
      ToastAndroid.show(t('Update_successful'), ToastAndroid.LONG);
    }
  }, [success, error, errorText, t]);

  const onSubmitClicked = () => {
    submit(firstName, lastName, emailAddress, phoneNumber);
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

        <FormButtonComponent text="Update" action={onSubmitClicked} />

        <LoadingModalComponent visible={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;
