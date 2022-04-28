export const API_URL = 'http://10.0.2.2:3000/api/v1/';

export const PAGE_LIMIT = 2;

const webService = {
  jsonContentType: { 'Content-Type': 'application/json' },

  apiUrl(path: string) {
    return `${API_URL}${path}`;
  },

  jsonAndAuthHeader(token: string) {
    return {
      ...this.jsonContentType,
      Authorization: `Bearer ${token}`,
    };
  },
};

export default webService;
