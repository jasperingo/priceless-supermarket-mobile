import { Expose, Type } from 'class-transformer';

export default class Customer {
  id?: number;

  @Expose({ name: 'first_name' })
  firstName?: string;

  @Expose({ name: 'last_name' })
  lastName?: string;

  @Expose({ name: 'email_address' })
  emailAddress?: string;

  @Expose({ name: 'phone_number' })
  phoneNumber?: string;

  password?: string;

  status?: string;

  @Type(() => Date)
  @Expose({ name: 'created_at' })
  createdAt?: Date;
}
