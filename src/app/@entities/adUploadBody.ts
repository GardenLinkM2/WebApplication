export interface UploadAdBody {
  id: string;
  name: string;
  size: number;
  isReserved: boolean;
  minUse: number;
  description: string;
  owner: string;
  validation: number;
  location: {
    streetNumber: number,
    street: string,
    postalCode: number,
    city: string
  };
  criteria: {
    locationTime: number
    area: number
    price: number
    orientation: string
    typeOfClay: string
    equipments: boolean
    waterAccess: boolean
    directAccess: boolean
  };
  photos: [
    {
      id: string
      fileName: string
    }
  ];
}
