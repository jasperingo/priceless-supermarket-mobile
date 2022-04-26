import { useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { plainToInstance } from 'class-transformer';
import ErrorCode, { ErrorCodeType } from '../../errors/ErrorCode';
import useCustomer from './customerHook';
import customerService from '../services/customerService';
import { CustomerActionType } from '../context/customerState';
import { useCustomerCreateValidation } from './customerValidationHook';
import ApiResponse from '../../dtos/ApiResponse';
import Customer from '../models/Customer';
import BadRequestType from '../../errors/badRequest';

type ReturnType = [
  onSubmit: (
    firstName: string,
    lastName: string,
    emailAddress: string,
    phoneNumber: string,
    password: string,
  ) => Promise<void>,
  loading: boolean,
  success: boolean,
  error: ErrorCodeType,
  firstNameError: ErrorCodeType,
  lastNameError: ErrorCodeType,
  emailError: ErrorCodeType,
  phoneError: ErrorCodeType,
  passwordError: ErrorCodeType,
];

const useCustomerCreate = (): ReturnType => {
  const { dispatch } = useCustomer();

  const { isConnected } = useNetInfo();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState<ErrorCodeType>(null);

  const [firstNameError, setFirstNameError] = useState<ErrorCodeType>(null);

  const [lastNameError, setLastNameError] = useState<ErrorCodeType>(null);

  const [emailError, setEmailError] = useState<ErrorCodeType>(null);

  const [phoneError, setPhoneError] = useState<ErrorCodeType>(null);

  const [passwordError, setPasswordError] = useState<ErrorCodeType>(null);

  const validator = useCustomerCreateValidation();

  async function onSubmit(
    firstName: string,
    lastName: string,
    emailAddress: string,
    phoneNumber: string,
    password: string,
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
      passwordValidity,
    ] = validator({ emailAddress, firstName, lastName, password, phoneNumber });

    setFirstNameError(firstNameValidity);
    setLastNameError(lastNameValidity);
    setEmailError(emailValidity);
    setPhoneError(phoneValidity);
    setPasswordError(passwordValidity);

    if (invalid) {
      return;
    }

    setLoading(true);

    try {
      const res = await customerService.create({
        password,
        last_name: lastName,
        first_name: firstName,
        phone_number: phoneNumber,
        email_address: emailAddress,
      });

      const body = (await res.json()) as ApiResponse<Customer | BadRequestType>;

      console.log(body);

      if (res.status === 201) {
        setSuccess(true);
        dispatch?.({
          type: CustomerActionType.FETCHED,
          payload: {
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

            case 'password':
              setPasswordError(err.error_code);
              break;

            default:
          }
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      setError(ErrorCode.UNKNOWN);
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
    passwordError,
  ];
};

export default useCustomerCreate;
