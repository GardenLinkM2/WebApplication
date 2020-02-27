import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {TokenInterceptor} from '../../req-interceptor';

interface Token {
  token: string;
}

interface Body {
  id: string;
  name: string;
  size: number;
  reserve: boolean;
  type: string;
  minUse: number;
  owner: string;
  validation: {
    id: string
    state: number
  };
  criteria: {
    id: string
    locationTime: {}
    area: number
    price: number
    location: {
      id: string
    },
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

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url = 'https://devbackendm2.artheriom.fr/api/Gardens'; // TODO: backend url should be set in environment confing
  private body: Body;
  private req: HttpRequest<any>;
  private tokeninterceptor = new TokenInterceptor();
  constructor(private next: HttpHandler) { }
  postGarden(userForm: FormGroup) {
    /*
    TODO: Get owner id instead of hardcoding (needs fixing Subscribe)
    this.req = new HttpRequest('GET', 'https://devbackendm2.artheriom.fr/api/Users/me');
    this.tokeninterceptor.intercept(this.req, this.next).subscribe(
      response => console.log('Response', response),
      error => {console.log('Failure', error); }
    );
    */
    this.body = { // Request body
      // TODO: missing attributes (notify backend)
      id: '90a5fccc-5de9-4d2e-b260-3cb90cb83a9a',
      name: userForm.get('title').value,
      size: 0,
      reserve: false,
      type: 'any',
      minUse: userForm.get('durationMax').value,
      owner: '90a5fccc-5de9-4d2e-b260-3cb90cb83a9a',
      validation: {
        id: '90a5fccc-5de9-4d2e-b260-3cb90cb83a9a',
        state: 0
      },
      criteria: {
        id: '90a5fccc-5de9-4d2e-b260-3cb90cb83a9a',
        locationTime: {},
        area: userForm.get('surface').value,
        price: userForm.get('price').value,
        location: {
          id: '90a5fccc-5de9-4d2e-b260-3cb90cb83a9a'
        },
        orientation: userForm.get('orientation').value.type,
        typeOfClay: userForm.get('soilType').value.type,
        equipments: userForm.get('accessTools').value,
        waterAccess: userForm.get('accessWater').value,
        directAccess: userForm.get('directAccess').value
      },
      photos: [
        {
          id: '90a5fccc-5de9-4d2e-b260-3cb90cb83a9a',
          fileName: 'string'
        }
      ]
    };
    let filename;
    for (filename of userForm.get('pictures').value) {
      this.body.photos.push({
        id: '90a5fccc-5de9-4d2e-b260-3cb90cb83a9a',
        fileName: filename
      });
    }
    this.req = new HttpRequest('POST', this.url, this.body); // Garden upload request
    return this.tokeninterceptor.intercept(this.req, this.next);
  }

}
