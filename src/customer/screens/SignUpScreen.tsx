import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FormButtonComponent from '../../components/form/FormButtonComponent';
import InputComponent from '../../components/form/InputComponent';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      padding: dimensions.medium,
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
  const styles = useAppStyles(getStyles);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 140 : 100}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.containerContent}>
        <InputComponent label="First_name" />
        <InputComponent label="Last_name" />
        <InputComponent label="Email" />
        <InputComponent label="Phone_number" />
        <InputComponent label="Password" />

        <Text style={styles.tos}>
          By signing up, you agree to our terms of service
        </Text>

        <FormButtonComponent />

        <View style={styles.haveAnAccount}>
          <Text style={styles.haveAnAccountQuestion}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity>
            <Text style={styles.haveAnAccountAction}>Sign in.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
