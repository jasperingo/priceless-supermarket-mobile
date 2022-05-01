import { useNetInfo } from '@react-native-community/netinfo';
import { useCallback, useState } from 'react';
import ErrorCode, { ErrorCodeType } from '../../errors/ErrorCode';
import deliveryLocationsService from '../services/deliveryLocationsService';

type Location = {
  state: string;
  alias: string;
  lgas: string[];
};

type ReturnType = [
  fetchLocations: () => Promise<void>,
  locations: Location[],
  loading: boolean,
  error: ErrorCodeType,
  loaded: boolean,
];

const useDeliveryLocationsFetch = (): ReturnType => {
  const [locations, setLocations] = useState<Location[]>([]);

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

      const body = (await res.json()) as Location[];

      if (res.status === 200) {
        setLocations(
          body.sort((a, b) => {
            if (a.state < b.state) {
              return -1;
            }
            if (a.state > b.state) {
              return 1;
            }
            return 0;
          }),
        );
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
