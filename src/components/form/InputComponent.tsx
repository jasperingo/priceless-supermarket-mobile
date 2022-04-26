import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ErrorCode from '../../errors/ErrorCode';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      borderWidth: 1.2,
      padding: dimensions.xxSmall,
      marginBottom: dimensions.medium,
      borderRadius: dimensions.xxSmall,
      borderColor: colors.colorSecondary,
      backgroundColor: colors.colorSurface,
    },

    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    label: {
      color: colors.colorOnSurface,
    },

    input: {
      padding: dimensions.xxSmall,
      color: colors.colorOnSurface,
    },

    error: {
      color: colors.colorError,
    },
  });

type Props = {
  label: string;
  error: ErrorCode | null;
  password?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
};

const InputComponent = ({
  label,
  error,
  keyboardType,
  password = false,
}: Props) => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  const [shown, setShown] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{t(label)}</Text>
        {password && (
          <TouchableOpacity onPress={() => setShown(!shown)}>
            <Ionicons name={shown ? 'eye-off' : 'eye'} size={25} />
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        secureTextEntry={!shown}
      />
      {error && <Text style={styles.error}>error</Text>}
    </View>
  );
};

export default InputComponent;
