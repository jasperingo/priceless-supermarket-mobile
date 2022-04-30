import { useNetInfo } from '@react-native-community/netinfo';
import { useCallback, useState } from 'react';
import ErrorCode, { ErrorCodeType } from '../../errors/ErrorCode';
import deliveryLocationsService from '../services/deliveryLocationsService';

type ReturnType = [
  fetchLocations: () => Promise<void>,
  locations: any[],
  loading: boolean,
  error: ErrorCodeType,
  loaded: boolean,
];

const useDeliveryLocationsFetch = (): ReturnType => {
  const [locations, setLocations] = useState<any>([]);

  const [loaded, setLoaded] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<ErrorCodeType>(null);

  const { isConnected } = useNetInfo();

  const fetchLocations = useCallback(async () => {
    if (loading) {
      return;
    }

    if (!isConnected) {
      setError(ErrorCode.NO_NETWORK_CONNECTION);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await deliveryLocationsService.read();

      const body = (await res.json()) as any[];

      if (res.status === 200) {
        const resArray = await Promise.all(
          body.map(i => deliveryLocationsService.readOne(i.id)),
        );

        const bodyArray = await Promise.all(
          resArray.map(resp => {
            if (!resp.ok) {
              throw ErrorCode.UNKNOWN;
            }
            resp.json();
          }),
        );

        setLocations(bodyArray);
        setLoaded(true);
      } else {
        throw ErrorCode.UNKNOWN;
      }
    } catch {
      setError(ErrorCode.UNKNOWN);
    } finally {
      setLoading(false);
    }
  }, [isConnected, loading]);

  return [fetchLocations, locations, loading, error, loaded];
};

export default useDeliveryLocationsFetch;
