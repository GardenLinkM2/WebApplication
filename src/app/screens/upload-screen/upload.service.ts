import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  url = 'https://devbackendm2.artheriom.fr/api/Gardens';
  private body: {};
  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${'eyJraWQiOiJnYXJkZW5saW5rIiwiYWxnIjoiSFM1MTIifQ.eyJzdWIiOiJyaWNreWJsYWNrd2FsbEBnbWFpbC5jb20iLCJraWQiOiJnYXJkZW5saW5rIiwiaXNBZG1pbiI6ZmFsc2UsImV4cCI6MTU4NDQzOTYyNywidXVpZCI6IjkwYTVmY2NjLTVkZTktNGQyZS1iMjYwLTNjYjkwY2I4M2E5YSIsImVtaXR0ZXIiOiJnYXJkZW5saW5rIiwianRpIjoiN2ZiNzc2MTAtOTg3OS00NDNkLTk1MWYtNTkxYjFiNjM4MTBjIn0._D-CS0Bi4ZTSn3K56ogZyEIS4wdf4xH1usI27BhnPDpGUkc_5vs_FDndk_h2mlbJ4594hkISpmbc1PEZnoYcbQ'}`)
  }
  constructor(private client: HttpClient) { }
  postGarden(userForm: FormGroup) {
    this.client.get('https://devbackendm2.artheriom.fr/api/me', this.header).subscribe(
      me => console.log('success ', me),
      fail => console.log('error ', fail)
    );
    this.body = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: userForm.get('title').value,
      size: 0,
      reserve: false,
      type: userForm.get('soilType').value,
      minUse: userForm.get('durationMax').value,
      owner: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      validation: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        state: 0
      },
      criteria: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        locationTime: {},
        area: userForm.get('surface').value,
        price: userForm.get('price').value,
        location: {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
        },
        orientation: userForm.get('orientation').value,
        typeOfClay: userForm.get('soilType').value,
        equipments: userForm.get('accessTools').value,
        waterAccess: userForm.get('accessWater').value,
        directAccess: userForm.get('directAccess').value
      },
      photos: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          fileName: 'string'
        }
      ]
    };
    return this.client.post(this.url, this.body, this.header);
  }

}
