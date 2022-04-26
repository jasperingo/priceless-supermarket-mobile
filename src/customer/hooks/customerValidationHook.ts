import isEmpty from 'validator/lib/isEmpty';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import ErrorCode, { ErrorCodeType } from '../../errors/ErrorCode';

type UpdateParamType = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
};

type CreateParamType = UpdateParamType & {
  password: string;
};

type ValidityType = [
  firstNameValidity: ErrorCodeType,
  lastNameValidity: ErrorCodeType,
  emailAddressValidity: ErrorCodeType,
  phoneNumberValidity: ErrorCodeType,
];

type CreateReturnType = [
  error: boolean,
  firstNameValidity: ErrorCodeType,
  lastNameValidity: ErrorCodeType,
  emailAddressValidity: ErrorCodeType,
  phoneNumberValidity: ErrorCodeType,
  passwordValidity: ErrorCodeType,
];

type UpdateReturnType = [
  error: boolean,
  firstNameValidity: ErrorCodeType,
  lastNameValidity: ErrorCodeType,
  emailAddressValidity: ErrorCodeType,
  phoneNumberValidity: ErrorCodeType,
];

export const useCustomerUpdateValidation = () => {
  return ({
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
  }: UpdateParamType): UpdateReturnType => {
    let error = false;
    let firstNameError = null;
    let lastNameError = null;
    let emailError = null;
    let phoneError = null;

    if (isEmpty(firstName)) {
      error = true;
      firstNameError = ErrorCode.FIELD_REQUIRED;
    }

    if (isEmpty(lastName)) {
      error = true;
      lastNameError = ErrorCode.FIELD_REQUIRED;
    }

    if (isEmpty(emailAddress)) {
      error = true;
      emailError = ErrorCode.FIELD_REQUIRED;
    } else if (!isEmail(emailAddress)) {
      emailError = ErrorCode.EMAIL_ADDRESS_INVALID;
    }

    if (isEmpty(phoneNumber)) {
      error = true;
      phoneError = ErrorCode.FIELD_REQUIRED;
    } else if (!isMobilePhone(phoneNumber)) {
      error = true;
      phoneError = ErrorCode.PHONE_NUMBER_INVALID;
    }

    return [error, firstNameError, lastNameError, emailError, phoneError];
  };
};

export const useCustomerCreateValidation = () => {
  const validator = useCustomerUpdateValidation();

  return (validity: CreateParamType): CreateReturnType => {
    const result = validator(validity);

    let error = result[0];

    let passwordError = null;

    if (isEmpty(validity.password)) {
      error = true;
      passwordError = ErrorCode.FIELD_REQUIRED;
    } else if (!isLength(validity.password, { min: 6 })) {
      error = true;
      passwordError = ErrorCode.PASSWORD_LENGTH;
    }

    return [error, ...(result.slice(1) as ValidityType), passwordError];
  };
};
