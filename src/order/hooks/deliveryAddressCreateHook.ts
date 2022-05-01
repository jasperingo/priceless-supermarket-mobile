import { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import ErrorCode, { ErrorCodeType } from '../../errors/ErrorCode';
import { CartActionType } from '../context/cartState';
import useCart from './cartHook';

type ReturnType = [
  submit: (street: string, city: string, state: string) => void,
  success: boolean,
  streetError: ErrorCodeType,
  cityError: ErrorCodeType,
  stateError: ErrorCodeType,
];

const useDeliveryAddressCreate = (): ReturnType => {
  const { dispatch } = useCart();

  const [success, setSuccess] = useState(false);

  const [stateError, setStateError] = useState<ErrorCodeType>(null);

  const [cityError, setCityError] = useState<ErrorCodeType>(null);

  const [streetError, setStreetError] = useState<ErrorCodeType>(null);

  const submit = (street: string, city: string, state: string) => {
    let error = false;

    if (isEmpty(street)) {
      error = true;
      setStreetError(ErrorCode.FIELD_REQUIRED);
    } else {
      setStreetError(null);
    }

    if (isEmpty(city)) {
      error = true;
      setCityError(ErrorCode.FIELD_REQUIRED);
    } else {
      setCityError(null);
    }

    if (isEmpty(state)) {
      error = true;
      setStateError(ErrorCode.FIELD_REQUIRED);
    } else {
      setStateError(null);
    }

    if (error) {
      setSuccess(false);
    } else {
      dispatch?.({
        type: CartActionType.DELIVERY_ADDRESS_ADDED,
        payload: {
          cart: {
            deliveryAddressStreet: street,
            deliveryAddressCity: city,
            deliveryAddressState: state,
          },
        },
      });
      setSuccess(true);
    }
  };

  return [submit, success, streetError, cityError, stateError];
};

export default useDeliveryAddressCreate;
