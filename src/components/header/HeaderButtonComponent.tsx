import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (Colors: AppColors, Dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      position: 'relative',
    },

    headerIcon: {
      color: Colors.colorSecondary,
      padding: Dimensions.xxSmall,
      fontSize: Dimensions.xLarge,
      marginLeft: Dimensions.xSmall,
    },

    badge: {
      top: -8,
      left: -8,
      borderRadius: 100,
      paddingVertical: 2,
      position: 'absolute',
      paddingHorizontal: Dimensions.xxSmall,
      color: Colors.colorOnPrimary,
      backgroundColor: Colors.colorError,
    },
  });

const HeaderButtonComponent = ({
  icon,
  badge,
  action,
}: {
  icon: string;
  badge?: string | number;
  action: () => void;
}) => {
  const styles = useAppStyles(getStyles);

  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.7}
      style={styles.container}>
      {badge !== undefined && <Text style={styles.badge}>{badge}</Text>}
      <Ionicons name={icon} style={styles.headerIcon} />
    </TouchableOpacity>
  );
};

export default HeaderButtonComponent;
