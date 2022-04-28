import { API_URL } from '../../services';

const usePhotoUrl = (url: string) => {
  return `${API_URL}${url?.substring(url?.indexOf('photos'))}`;
};

export default usePhotoUrl;
