import { Expose, Type } from 'class-transformer';
import Product from '../../product/models/Product';

export default class OrderItem {
  id?: number;

  amount?: number;

  quantity?: number;

  status?: string;

  @Type(() => Product)
  product?: Product;

  @Type(() => Date)
  @Expose({ name: 'processed_at' })
  processedAt?: Date;

  @Type(() => Date)
  @Expose({ name: 'transported_at' })
  transportedAt?: Date;

  @Type(() => Date)
  @Expose({ name: 'fulfilled_at' })
  fulfilledAt?: Date;

  @Type(() => Date)
  @Expose({ name: 'created_at' })
  createdAt?: Date;
}
