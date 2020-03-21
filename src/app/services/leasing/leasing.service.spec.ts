import { TestBed } from '@angular/core/testing';

import { LeasingService } from './leasing.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LeasingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: LeasingService = TestBed.get(LeasingService);
    expect(service).toBeTruthy();
  });
});
