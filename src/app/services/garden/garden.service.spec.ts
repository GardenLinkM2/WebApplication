import { TestBed } from '@angular/core/testing';

import { GardenService } from './garden.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GardenService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: GardenService = TestBed.get(GardenService);
    expect(service).toBeTruthy();
  });
});
