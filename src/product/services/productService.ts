import webService, { PAGE_LIMIT } from '../../services';

const productService = {
  authToken: '',

  apiUrl(path: string | number = '') {
    return webService.apiUrl(`products/${path}`);
  },

  read(before?: number) {
    let queryString = `?limit=${PAGE_LIMIT}`;
    if (before) {
      queryString += `&before=${before}`;
    }
    return fetch(this.apiUrl(queryString), {
      method: 'GET',
      headers: webService.jsonContentType,
    });
  },
};

export default productService;
