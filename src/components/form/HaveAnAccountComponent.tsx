import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppColors, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors) =>
  StyleSheet.create({
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

type Props = {
  question: string;
  buttonText: string;
  action: () => void;
};

const HaveAnAccountComponent = ({ question, buttonText, action }: Props) => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  return (
    <View style={styles.haveAnAccount}>
      <Text style={styles.haveAnAccountQuestion}>{t(question)} </Text>
      <TouchableOpacity onPress={action}>
        <Text style={styles.haveAnAccountAction}>{t(buttonText)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HaveAnAccountComponent;
