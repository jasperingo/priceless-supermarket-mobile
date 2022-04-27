import { useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { plainToInstance } from 'class-transformer';
import ErrorCode, { ErrorCodeType, parseError } from '../../errors/ErrorCode';
import useCustomer from './customerHook';
import customerService from '../services/customerService';
import { CustomerActionType } from '../context/customerState';
import { useCustomerUpdateValidation } from './customerValidationHook';
import ApiResponse from '../../dtos/ApiResponse';
import Customer from '../models/Customer';
import BadRequestType from '../../errors/badRequest';

type ReturnType = [
  onSubmit: (
    firstName: string,
    lastName: string,
    emailAddress: string,
    phoneNumber: string,
  ) => Promise<void>,
  loading: boolean,
  success: boolean,
  error: ErrorCodeType,
  firstNameError: ErrorCodeType,
  lastNameError: ErrorCodeType,
  emailError: ErrorCodeType,
  phoneError: ErrorCodeType,
];

const useCustomerUpdate = (): ReturnType => {
  const { dispatch, customer, token } = useCustomer();

  const { isConnected } = useNetInfo();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState<ErrorCodeType>(null);

  const [firstNameError, setFirstNameError] = useState<ErrorCodeType>(null);

  const [lastNameError, setLastNameError] = useState<ErrorCodeType>(null);

  const [emailError, setEmailError] = useState<ErrorCodeType>(null);

  const [phoneError, setPhoneError] = useState<ErrorCodeType>(null);

  const validator = useCustomerUpdateValidation();

  async function onSubmit(
    firstName: string,
    lastName: string,
    emailAddress: string,
    phoneNumber: string,
  ) {
    if (loading) {
      return;
    }

    if (!isConnected) {
      setError(ErrorCode.NO_NETWORK_CONNECTION);
      return;
    }

    setError(null);
    setSuccess(false);

    const [
      invalid,
      firstNameValidity,
      lastNameValidity,
      emailValidity,
      phoneValidity,
    ] = validator({ emailAddress, firstName, lastName, phoneNumber });

    setFirstNameError(firstNameValidity);
    setLastNameError(lastNameValidity);
    setEmailError(emailValidity);
    setPhoneError(phoneValidity);

    if (invalid) {
      return;
    }

    const form: { [key: string]: string } = {};

    if (lastName !== customer?.lastName) {
      form.last_name = lastName;
    }

    if (firstName !== customer?.firstName) {
      form.first_name = firstName;
    }

    if (emailAddress !== customer?.emailAddress) {
      form.email_address = emailAddress;
    }

    if (phoneNumber !== customer?.phoneNumber) {
      form.phone_number = phoneNumber;
    }

    if (Object.keys(form).length < 1) {
      return;
    }

    setLoading(true);

    try {
      customerService.authToken = token as string;

      const res = await customerService.update(Number(customer?.id), form);

      const body = (await res.json()) as ApiResponse<Customer | BadRequestType>;

      if (res.status === 200) {
        setSuccess(true);
        dispatch?.({
          type: CustomerActionType.FETCHED,
          payload: {
            customerId: String(customer?.id),
            customer: plainToInstance(Customer, body.data),
          },
        });
      } else if (res.status === 400) {
        for (const err of body.data as BadRequestType) {
          switch (err.name) {
            case 'first_name':
              setFirstNameError(err.error_code);
              break;

            case 'last_name':
              setLastNameError(err.error_code);
              break;

            case 'email_address':
              setEmailError(err.error_code);
              break;

            case 'phone_number':
              setPhoneError(err.error_code);
              break;

            default:
          }
        }
      } else if (res.status === 401) {
        throw ErrorCode.UNAUTHORIZED;
      } else if (res.status === 404) {
        throw ErrorCode.NOT_FOUND;
      } else if (res.status === 403) {
        throw ErrorCode.PERMISSION_DENIED;
      } else {
        throw ErrorCode.UNKNOWN;
      }
    } catch (err) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  }

  return [
    onSubmit,
    loading,
    success,
    error,
    firstNameError,
    lastNameError,
    emailError,
    phoneError,
  ];
};

export default useCustomerUpdate;
