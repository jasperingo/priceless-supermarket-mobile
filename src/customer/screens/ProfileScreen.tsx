import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({

  });

const ProfileScreen = () => {
  const styles = useAppStyles(getStyles);

  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
