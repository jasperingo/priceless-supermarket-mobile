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
import useErrorText from '../../errors/errorTextHook';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
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

  const errorText = useErrorText();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignIn'>>();

  const [submit, loading, success, error] = useCustomerSignIn();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error !== null) {
      ToastAndroid.show(t(errorText(error)), ToastAndroid.LONG);
    }

    if (success) {
      ToastAndroid.show('We did it', ToastAndroid.LONG);
    }
  }, [success, error, errorText, t]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 100}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}>
        <InputComponent label="Email" value={email} onChangeText={setEmail} />
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

        <LoadingModalComponent visible={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
