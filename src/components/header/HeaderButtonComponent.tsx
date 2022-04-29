import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (Colors: AppColors, Dimensions: AppDimensions) =>
  StyleSheet.create({
    headerIcon: {
      color: Colors.colorSecondary,
      padding: Dimensions.xxSmall,
      fontSize: Dimensions.xLarge,
      marginLeft: Dimensions.xSmall,
    },
  });

const HeaderButtonComponent = ({
  icon,
  action,
}: {
  icon: string;
  action: () => void;
}) => {
  const styles = useAppStyles(getStyles);

  return (
    <TouchableOpacity onPress={action} activeOpacity={0.7}>
      <Ionicons name={icon} style={styles.headerIcon} />
    </TouchableOpacity>
  );
};

export default HeaderButtonComponent;
