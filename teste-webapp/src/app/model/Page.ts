import { Pageable } from './Pageable';

export class Page<T> {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  content: T[];
}
