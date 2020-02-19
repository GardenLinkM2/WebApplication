import { TestBed } from '@angular/core/testing';

import { MdpService } from './mdp.service';

describe('MdpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MdpService = TestBed.get(MdpService);
    expect(service).toBeTruthy();
  });
});
