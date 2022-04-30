import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LoadingComponent from '../../components/fetch/LoadingComponent';
import RetryComponent from '../../components/fetch/RetryComponent';
import FormButtonComponent from '../../components/form/FormButtonComponent';
import InputComponent from '../../components/form/InputComponent';
import PickerComponent from '../../components/form/PickerComponent';
import ErrorCode from '../../errors/ErrorCode';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import useDeliveryLocationsFetch from '../hooks/deliveryLocationsFetchHook';

const getStyle = (colors: AppColors, dimensions: AppDimensions) =>
  StyleSheet.create({
    container: {
      height: '100%',
      padding: dimensions.xSmall,
      backgroundColor: colors.colorSurface,
    },
  });

const DeliveryAddressScreen = () => {
  const styles = useAppStyles(getStyle);

  const [fetchLocations, locations, loading, error, loaded] =
    useDeliveryLocationsFetch();

  useEffect(() => {
    if (!loaded && error === null) {
      fetchLocations();
    }
  }, [error, loaded, fetchLocations]);

  console.log(locations);

  return (
    <View style={styles.container}>
      {loaded && (
        <>
          <PickerComponent label="Street" options={[]} />
          <PickerComponent label="City" options={[]} />
          <InputComponent label="Street" />
          <FormButtonComponent text="Continue" action={() => 1} />
        </>
      )}
      {loading && <LoadingComponent />}
      {(error === ErrorCode.NO_NETWORK_CONNECTION && (
        <RetryComponent action={fetchLocations} text="Not_network_connection" />
      )) ||
        (error !== null && <RetryComponent action={fetchLocations} />)}
    </View>
  );
};

export default DeliveryAddressScreen;
