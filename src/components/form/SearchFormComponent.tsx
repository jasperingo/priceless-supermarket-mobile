import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, ToastAndroid } from 'react-native';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (Colors: AppColors, Dimensions: AppDimensions) =>
  StyleSheet.create({
    input: {
      height: 40,
      flexGrow: 1,
      borderWidth: 1,
      borderColor: Colors.colorSecondary,
      paddingHorizontal: Dimensions.small,
      borderRadius: Dimensions.xxSmall,
      backgroundColor: Colors.colorSurface,
    },
  });

const SearchFormComponent = ({
  text = '',
  action,
}: {
  text?: string;
  action: (q: string) => void;
}) => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  const [q, setQ] = useState(text);

  const onSubmit = () => {
    if (q.length > 2) {
      action(q);
    } else {
      ToastAndroid.show(t('_search_q_length'), ToastAndroid.SHORT);
    }
  };

  return (
    <TextInput
      value={q}
      style={styles.input}
      onChangeText={setQ}
      returnKeyType="search"
      onSubmitEditing={onSubmit}
      placeholder={t('Search_products')}
    />
  );
};

export default SearchFormComponent;
