import { TestBed } from '@angular/core/testing';

import { ScoresService } from './scores.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ScoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ScoresService = TestBed.get(ScoresService);
    expect(service).toBeTruthy();
  });
});
