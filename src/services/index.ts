export const API_URL = 'http://8.208.97.181/api/v1/';

export const PAGE_LIMIT = 10;

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
