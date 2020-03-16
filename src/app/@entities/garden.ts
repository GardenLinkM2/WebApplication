import {Criteria} from './criteria';
import {Photo} from './photo';
import {Location} from './location';

export interface Garden {
  id: string;
  name: string;
  isReserved: boolean;
  minUse: number;
  description : string;
  location: Location;
  owner: string;
  validation: string;
  criteria: Criteria;
  photos: Photo[];
}
