import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import ErrorCode from '../../errors/ErrorCode';
import useErrorText from '../../errors/errorTextHook';
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

    label: {
      color: colors.colorOnSurface,
    },

    input: {
      color: colors.colorOnSurface,
    },

    error: {
      color: colors.colorError,
    },
  });

type Props = {
  label: string;
  value?: string;
  error?: ErrorCode | null;
  options: { label: string; value: string }[];
  onChangeValue?: (text: string, index: number) => void;
};

const PickerComponent = ({
  label,
  value,
  error,
  options = [],
  onChangeValue,
}: Props) => {
  const { t } = useTranslation();

  const errorText = useErrorText();

  const styles = useAppStyles(getStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t(label)}</Text>
      <Picker
        style={styles.input}
        selectedValue={value}
        onValueChange={onChangeValue}>
        <Picker.Item label={t('Select_an_option')} value="" enabled={false} />
        {options.map(item => (
          <Picker.Item label={item.label} value={item.value} />
        ))}
      </Picker>
      {error && <Text style={styles.error}>{t(errorText(error))}</Text>}
    </View>
  );
};

export default PickerComponent;
