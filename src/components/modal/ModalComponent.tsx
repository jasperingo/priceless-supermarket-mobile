import React, { ReactNode } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { AppColors, useAppStyles } from '../../hooks/styles';

const getStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.colorTransparentGray,
    },
  });

type Props = {
  children: ReactNode;
  visible: boolean;
};

const ModalComponent = ({ children, visible }: Props) => {
  const styles = useAppStyles(getStyles);

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.container}>{children}</View>
    </Modal>
  );
};

export default ModalComponent;
