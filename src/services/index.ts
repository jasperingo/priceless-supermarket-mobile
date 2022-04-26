const API_URL = 'http://10.0.2.2:3000/api/v1/';

const rootService = {
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

export default rootService;
