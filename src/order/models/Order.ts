import { Expose, Type } from 'class-transformer';
import { Customer } from '../../customer';
import OrderItem from './OrderItem';

export default class Order {
  id?: number;

  number?: string;

  total?: number;

  @Expose({ name: 'delivery_address_state' })
  deliveryAddressState?: string;

  @Expose({ name: 'delivery_address_city' })
  deliveryAddressCity?: string;

  @Expose({ name: 'delivery_address_street' })
  deliveryAddressStreet?: string;

  @Type(() => Customer)
  customer?: Customer;

  @Expose({ name: 'order_items' })
  @Type(() => OrderItem)
  orderItems?: OrderItem[];

  @Type(() => Date)
  @Expose({ name: 'created_at' })
  createdAt?: Date;
}
