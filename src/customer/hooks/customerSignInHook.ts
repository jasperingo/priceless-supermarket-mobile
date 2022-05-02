import { useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import ErrorCode from '../../errors/ErrorCode';
import customerRepository from '../services/customerService';
import { useCustomerAuthSet } from './customerAuthStorageHook';
import ApiResponse from '../../dtos/ApiResponse';

type ReturnType = [
  onSubmit: (email: string, password: string) => Promise<void>,
  loading: boolean,
  success: boolean,
  error: ErrorCode | null,
  customerId: number,
  customerAuthToken: string | null,
];

const useCustomerSignIn = (): ReturnType => {
  const setAuthToken = useCustomerAuthSet();

  const { isConnected } = useNetInfo();

  const [customerId, setCustomerId] = useState(0);

  const [customerAuthToken, setCustomerAuthToken] = useState<string | null>(
    null,
  );

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState<ErrorCode | null>(null);

  async function onSubmit(email: string, password: string) {
    if (loading) {
      return;
    }

    if (!isConnected) {
      setError(ErrorCode.NO_NETWORK_CONNECTION);
      return;
    }

    if (!email || !password) {
      setError(ErrorCode.CREDENTIALS_INCORRECT);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await customerRepository.auth({
        password,
        email_address: email,
      });

      const body = (await res.json()) as ApiResponse<{
        access_token: string;
        id: number;
      }>;

      if (res.status === 200) {
        setAuthToken(body.data.id, body.data.access_token);
        setCustomerAuthToken(body.data.access_token);
        setCustomerId(body.data.id);
        setSuccess(true);
      } else if (res.status === 401 || res.status === 403) {
        setError(body.error_code);
      } else {
        throw new Error();
      }
    } catch {
      setError(ErrorCode.UNKNOWN);
    } finally {
      setLoading(false);
    }
  }

  return [onSubmit, loading, success, error, customerId, customerAuthToken];
};

export default useCustomerSignIn;
