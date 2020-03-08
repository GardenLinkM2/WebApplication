import {Validation} from './validation';
import {Criteria} from './criteria';
import {Photo} from './photo';

export interface Garden {
  id: string;
  name: string;
  size: number;
  reserve: boolean;
  type: string;
  minUse: number;
  owner: string;
  validation: Validation;
  criteria: Criteria;
  photos: Photo;
}
