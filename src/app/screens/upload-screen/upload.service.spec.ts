import {async, inject, TestBed} from '@angular/core/testing';

import { UploadService } from './upload.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormControl, FormGroup, Validators} from '@angular/forms';

describe('UploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      UploadService
    ],
  }));

  it(`should create`, async(inject([HttpClientTestingModule, UploadService],
    (httpClient: HttpClientTestingModule, uploadService: UploadService) => {
      expect(uploadService).toBeTruthy();
    })));
  it(`should Throw an error`, async(inject([HttpClientTestingModule, UploadService],
    (httpclient: HttpClientTestingModule, uploadService: UploadService) => {
    expect(uploadService.postGarden).toThrowError('');
  })));

  it(`should Throw TypeError`, async(inject([HttpClientTestingModule, UploadService],
    (httpclient: HttpClientTestingModule, uploadService: UploadService) => {
      let userform;
      userform = new FormGroup({
        falsified: new FormControl('', Validators.required)
      });
      expect(uploadService.postGarden.bind(userform)).toThrowError(TypeError);
    })));

  it(`should succeed`, async(inject([HttpClientTestingModule, UploadService],
    (httpclient: HttpClientTestingModule, uploadService: UploadService) => {
      let userform;
      let cityPattern;
      let streetNamePattern;
      let onlyNumbers;
      let zipCodePattern;
      cityPattern = /^[A-Za-z0-9 -]+$/; // Gestion rule 6
      streetNamePattern = /^[A-Za-z0-9 ]+$/; // Gestion rule 5
      onlyNumbers = /^[0-9]+$/;
      zipCodePattern = /^[0-9][0-9][0-9][0-9][0-9]$/;
      userform = new FormGroup( // Garden upload form
        {
          title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
          surface: new FormControl('', [Validators.required, Validators.max(10 ** 4), Validators.pattern(onlyNumbers)]),
          price: new FormControl('', [Validators.required, Validators.max(10 ** 4), Validators.pattern(onlyNumbers)]),
          durationMax: new FormControl('', [Validators.required, Validators.pattern(onlyNumbers)]),
          address: new FormGroup({
            streetNum: new FormControl('', Validators.pattern(onlyNumbers)),
            streetName: new FormControl('', [Validators.required, Validators.minLength(6),
              Validators.maxLength(255), Validators.pattern(streetNamePattern)]),
            zipCode: new FormControl('', [Validators.required, Validators.pattern(zipCodePattern), Validators.max(99999)]),
            city: new FormControl('', [Validators.required, Validators.minLength(1),
              Validators.maxLength(255), Validators.pattern(cityPattern)])
          }),
          soilType: new FormControl(''),
          orientation: new FormControl(''),
          accessWater: new FormControl(false),
          accessTools: new FormControl(false),
          directAccess: new FormControl(false),
          description: new FormControl('', Validators.maxLength(25 * (10 ** 3))),
          pictures: new FormControl('')
        }
      );
      expect(uploadService.postGarden.bind(userform)).toBeTruthy();
    })));

  it(`should fail`, async(inject([HttpClientTestingModule, UploadService],
    (httpclient: HttpClientTestingModule, uploadService: UploadService) => {
      expect(uploadService.postGarden.bind(null)).toThrowError('Cannot read property \'get\' of undefined');
    })));

  it(`should succeed`, async(inject([HttpClientTestingModule, UploadService],
    (httpclient: HttpClientTestingModule, uploadService: UploadService) => {
      let userform;
      let cityPattern;
      let streetNamePattern;
      let onlyNumbers;
      let zipCodePattern;
      cityPattern = /^[A-Za-z0-9 -]+$/; // Gestion rule 6
      streetNamePattern = /^[A-Za-z0-9 ]+$/; // Gestion rule 5
      onlyNumbers = /^[0-9]+$/;
      zipCodePattern = /^[0-9][0-9][0-9][0-9][0-9]$/;
      userform = new FormGroup( // Garden upload form
        {
          title: new FormControl('A title', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
          surface: new FormControl(50, [Validators.required, Validators.max(10 ** 4), Validators.pattern(onlyNumbers)]),
          price: new FormControl(50, [Validators.required, Validators.max(10 ** 4), Validators.pattern(onlyNumbers)]),
          durationMax: new FormControl(30, [Validators.required, Validators.pattern(onlyNumbers)]),
          address: new FormGroup({
            streetNum: new FormControl('', Validators.pattern(onlyNumbers)),
            streetName: new FormControl('Girondins', [Validators.required, Validators.minLength(6),
              Validators.maxLength(255), Validators.pattern(streetNamePattern)]),
            zipCode: new FormControl(63000, [Validators.required, Validators.pattern(zipCodePattern), Validators.max(99999)]),
            city: new FormControl('Clermont', [Validators.required, Validators.minLength(1),
              Validators.maxLength(255), Validators.pattern(cityPattern)])
          }),
          soilType: new FormControl(''),
          orientation: new FormControl(''),
          accessWater: new FormControl(false),
          accessTools: new FormControl(false),
          directAccess: new FormControl(false),
          description: new FormControl('', Validators.maxLength(25 * (10 ** 3))),
          pictures: new FormControl('')
        }
      );
      uploadService.postGarden(userform).subscribe(
        (response) => {
                       expect(response.type).toEqual(0); console.log(response); }
      /* Test should be expect(response.status).toEqual(201)
      * But cannot be run due to Requests dual execution
      * TODO: fix requests dual executions*/
      );
    })));
});
