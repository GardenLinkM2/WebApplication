import { TestBed } from '@angular/core/testing';

import { GardensService } from './gardens.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GardensService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: GardensService = TestBed.get(GardensService);
    expect(service).toBeTruthy();
  });
});
