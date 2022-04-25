import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { useAppColors } from '../hooks/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 10,
  },
});

const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Splash'>>();

  const colors = useAppColors();

  setTimeout(() => {
    navigation.replace('Home');
  }, 2000);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/logo-pro.png')}
      />

      <ActivityIndicator color={colors.colorPrimary} size="large" />
    </View>
  );
};

export default SplashScreen;
