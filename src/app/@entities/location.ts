export interface Location {
  streetNumber :number;
  street : string;
  postalCode : number;
  city : string;
  longitudeAndLatitude : LongitudeAndLatitude
}

export interface LongitudeAndLatitude {
  longitude : number;
  latitude : number;
}