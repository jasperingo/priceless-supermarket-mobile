import rootService from '../../services';

type CreateDTO = {
  delivery_address_street: string;
  delivery_address_city: string;
  delivery_address_state: string;
  order_items: {
    quantity: number;
    product_id: number;
  }[];
};

const orderService = {
  authToken: '',

  apiUrl(path: string | number = '') {
    return rootService.apiUrl(`orders/${path}`);
  },

  create(form: CreateDTO) {
    return fetch(this.apiUrl(), {
      method: 'POST',
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
};

export default orderService;
