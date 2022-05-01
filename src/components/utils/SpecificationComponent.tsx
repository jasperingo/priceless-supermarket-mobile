import { useTranslation } from 'react-i18next';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors, dimens: AppDimensions) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: dimens.small,
    },

    title: {
      fontWeight: 'bold',
      marginRight: dimens.xxSmall,
      color: colors.colorOnSurface,
    },

    body: {
      color: colors.colorOnSurface,
    },
  });

const SpecificationComponent = ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  const { t } = useTranslation();

  const styles = useAppStyles(getStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(title)}:</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
};

export default SpecificationComponent;
