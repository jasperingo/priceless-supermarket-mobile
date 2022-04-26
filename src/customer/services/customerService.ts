import rootService from '../../services';

const customerService = {
  authToken: null,

  apiUrl(path: string = '') {
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
};

export default customerService;
