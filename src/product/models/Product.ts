import { Expose, Type } from 'class-transformer';
import { Category } from '../../category';
import { Photo } from '../../photo';

export default class Product {
  id?: number;

  name?: string;

  price?: number;

  quantity?: number;

  description?: string;

  available?: boolean;

  barcode?: string;

  weight?: number;

  width?: number;

  height?: number;

  @Type(() => Date)
  @Expose({ name: 'created_at' })
  createdAt?: Date;

  @Type(() => Photo)
  photo?: Photo;

  @Type(() => Category)
  category?: Category;
}
