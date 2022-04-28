import { Expose, Type } from 'class-transformer';
import { Photo } from '../../photo';

export default class Category {
  id?: number;

  name?: string;

  description?: string | null;

  @Type(() => Date)
  @Expose({ name: 'created_at' })
  createdAt?: Date;

  @Type(() => Photo)
  photo?: Photo;
}
