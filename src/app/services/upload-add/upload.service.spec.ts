import {async, inject, TestBed} from '@angular/core/testing';

import { UploadService } from './upload.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {UploadAdBody} from '../../@entities/adUploadBody';

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
    // tslint:disable-next-line:prefer-const
    let requestBody: UploadAdBody;
    expect(uploadService.postGarden(requestBody)).toEqual(jasmine.any(Observable));
  })));
  it(`should return Observable`, async(inject([HttpClientTestingModule, UploadService],
    (httpclient: HttpClientTestingModule, uploadService: UploadService) => {
      expect(uploadService.getId()).toEqual(jasmine.any(Observable));
    })));
});
