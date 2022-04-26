import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { RootStackParamList } from '../../../App';
import FormButtonComponent from '../../components/form/FormButtonComponent';
import HaveAnAccountComponent from '../../components/form/HaveAnAccountComponent';
import InputComponent from '../../components/form/InputComponent';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

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

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignIn'>>();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 100}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}>
        <InputComponent label="Email" error={null} />
        <InputComponent label="Password" error={null} password={true} />

        <FormButtonComponent
          text="Sign_in"
          action={() => Alert.alert('Loading')}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
