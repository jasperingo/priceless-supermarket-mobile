import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CUSTOMER_ID = 'customer_id';
const CUSTOMER_TOKEN = 'customer_token';

export const useCustomerAuthSet = () => {
  return useCallback((id: number, apiToken: string) => {
    AsyncStorage.setItem(CUSTOMER_ID, String(id));
    AsyncStorage.setItem(CUSTOMER_TOKEN, apiToken);
  }, []);
};

type GetAuth = Promise<
  [customerId: string | null, customerToken: string | null]
>;

export const useCustomerAuthGet = () => {
  return useCallback((): GetAuth => {
    return Promise.all([
      AsyncStorage.getItem(CUSTOMER_ID),
      AsyncStorage.getItem(CUSTOMER_TOKEN),
    ]);
  }, []);
};

export const useCustomerAuthUnset = () => {
  return () => {
    AsyncStorage.removeItem(CUSTOMER_ID);
    AsyncStorage.removeItem(CUSTOMER_TOKEN);
  };
};
