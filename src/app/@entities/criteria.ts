import {Location} from './location';

export interface Criteria {
  id:	string;
  locationTime: Date;
  area: number;
  price: number;
  location: Location;
  orientation:	string;
  typeOfClay:	string;
  equipments:	boolean;
  waterAccess:	boolean;
  directAccess:	boolean;
}
