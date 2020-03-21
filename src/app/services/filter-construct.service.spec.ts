import { TestBed } from '@angular/core/testing';

import { FilterConstructService } from './filter-construct.service';

describe('FilterConstructService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterConstructService = TestBed.get(FilterConstructService);
    expect(service).toBeTruthy();
  });
});
