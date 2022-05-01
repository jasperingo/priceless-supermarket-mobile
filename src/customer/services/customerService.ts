import rootService, { PAGE_LIMIT } from '../../services';

const customerService = {
  authToken: '',

  apiUrl(path: string | number = '') {
    return rootService.apiUrl(`customers/${path}`);
  },

  create(form: {
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
    password: string;
  }) {
    return fetch(this.apiUrl(), {
      method: 'POST',
      body: JSON.stringify(form),
      headers: rootService.jsonContentType,
    });
  },

  auth(form: { email_address: string; password: string }) {
    return fetch(rootService.apiUrl('auth/customer'), {
      method: 'POST',
      body: JSON.stringify(form),
      headers: rootService.jsonContentType,
    });
  },

  update(
    id: number,
    form: {
      first_name?: string;
      last_name?: string;
      email_address?: string;
      phone_number?: string;
    },
  ) {
    return fetch(this.apiUrl(id), {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: rootService.jsonAndAuthHeader(this.authToken),
    });
  },

  readOne(id: number) {
    return fetch(this.apiUrl(id), {
      method: 'GET',
      headers: rootService.jsonAndAuthHeader(this.authToken),
    });
  },

  readOrders(id: number, before?: number) {
    let queryString = `${id}/orders?limit=${PAGE_LIMIT}`;
    if (before) {
      queryString += `&before=${before}`;
    }
    return fetch(this.apiUrl(queryString), {
      method: 'GET',
      headers: rootService.jsonAndAuthHeader(this.authToken),
    });
  },
};

export default customerService;
