import rootService from '../../services';
import { OrderItemStatus } from '../models/OrderItem';

const orderItemService = {
  authToken: '',

  apiUrl(path: string | number = '') {
    return rootService.apiUrl(`order-items/${path}`);
  },

  update(id: number, form: { status: OrderItemStatus }) {
    return fetch(this.apiUrl(`${id}/status`), {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: rootService.jsonAndAuthHeader(this.authToken),
    });
  },
};

export default orderItemService;
