import webService from '../../services';

const categoryService = {
  authToken: '',

  apiUrl(path: string | number = '') {
    return webService.apiUrl(`categories/${path}`);
  },

  read() {
    return fetch(this.apiUrl(), {
      method: 'GET',
      headers: webService.jsonContentType,
    });
  },
};

export default categoryService;
