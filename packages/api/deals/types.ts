import { Dictionary } from '../../api/base';
import { Customer } from '../customers';

export interface DealType extends Dictionary {}

export interface Deal {
  price: number; //TODO: check it should be string or number from decimal
  type: DealType['id'];
  customer: Customer['id'];
}
