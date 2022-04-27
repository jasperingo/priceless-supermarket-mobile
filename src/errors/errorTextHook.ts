import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorCode from './ErrorCode';

export const useErrorText = () => {
  return useCallback((code: ErrorCode) => {
    switch (code) {
      case ErrorCode.PASSWORD_LENGTH:
        return '_password_length';
      case ErrorCode.PHONE_NUMBER_INVALID:
        return '_phone_number_invalid';
      case ErrorCode.PHONE_NUMBER_EXISTS:
        return '_phone_number_exists';
      case ErrorCode.EMAIL_ADDRESS_INVALID:
        return '_email_address_invalid';
      case ErrorCode.EMAIL_ADDRESS_EXISTS:
        return '_email_address_exists';
      case ErrorCode.FIELD_REQUIRED:
        return '_field_required';
      case ErrorCode.CREDENTIALS_INCORRECT:
        return 'Crediential_incorrect';
      case ErrorCode.NO_NETWORK_CONNECTION:
        return 'Not_network_connection';
      case ErrorCode.UNKNOWN:
        return '_unknown_error';
      default:
        return code === null ? '' : code.toString();
    }
  }, []);
};

export const useErrorTextTranslate = () => {
  const { t } = useTranslation();
  const errorText = useErrorText();
  return useCallback((code: ErrorCode) => t(errorText(code)), [errorText, t]);
};

export default useErrorText;
