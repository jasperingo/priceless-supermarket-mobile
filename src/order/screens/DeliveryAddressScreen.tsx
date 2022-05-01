import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LoadingComponent from '../../components/fetch/LoadingComponent';
import RetryComponent from '../../components/fetch/RetryComponent';
import FormButtonComponent from '../../components/form/FormButtonComponent';
import InputComponent from '../../components/form/InputComponent';
import PickerComponent from '../../components/form/PickerComponent';
import ErrorCode from '../../errors/ErrorCode';
import { RootStackParamList } from '../../../App';
import { AppColors, AppDimensions, useAppStyles } from '../../hooks/styles';
import useDeliveryAddressCreate from '../hooks/deliveryAddressCreateHook';
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

  const [state, setState] = useState('');

  const [city, setCity] = useState('');

  const [street, setStreet] = useState('');

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'DeliveryAddress'>
    >();

  const [fetchLocations, locations, loading, error, loaded] =
    useDeliveryLocationsFetch();

  const [submit, success, streetError, cityError, stateError] =
    useDeliveryAddressCreate();

  useEffect(() => {
    if (!loaded && error === null) {
      fetchLocations();
    }
  }, [error, loaded, fetchLocations]);

  useEffect(() => {
    if (success) {
      navigation.navigate('OrderSummary');
    }
  }, [success, navigation]);

  const onSubmit = () => submit(street, city, state);

  return (
    <View style={styles.container}>
      {loaded && (
        <>
          <PickerComponent
            label="Street"
            value={state}
            error={stateError}
            onChangeValue={setState}
            options={locations.map(item => ({
              label: item.state,
              value: item.state,
            }))}
          />
          <PickerComponent
            label="City"
            value={city}
            error={cityError}
            onChangeValue={setCity}
            options={
              locations
                .find(item => item.state === state)
                ?.lgas.map(item => ({ label: item, value: item })) ?? []
            }
          />
          <InputComponent
            label="Street"
            value={street}
            error={streetError}
            onChangeText={setStreet}
          />
          <FormButtonComponent text="Continue" action={onSubmit} />
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
