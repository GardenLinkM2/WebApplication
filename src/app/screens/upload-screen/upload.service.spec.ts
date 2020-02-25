import {async, inject, TestBed} from '@angular/core/testing';

import { UploadService } from './upload.service';
import { HttpHandler} from '@angular/common/http';

describe('UploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpHandler, UploadService],
    providers: [
      UploadService
    ],
  }));

  it(`should create`, async(inject([HttpHandler, UploadService],
    (httpClient: HttpHandler, uploadService: UploadService) => {
      expect(uploadService).toBeTruthy();
    })));
});
