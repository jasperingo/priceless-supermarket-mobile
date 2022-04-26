import React from 'react';
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
  });

const ModalComponent = () => {
  const styles = useAppStyles(getStyles);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <Text>ModalComponent</Text>
      </Modal>
    </View>
  );
};

export default ModalComponent;
