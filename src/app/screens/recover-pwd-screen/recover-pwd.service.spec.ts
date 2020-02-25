import { TestBed } from '@angular/core/testing';

import { RecoverPwdService } from './recover-pwd.service';

describe('RecoverPwdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecoverPwdService = TestBed.get(RecoverPwdService);
    expect(service).toBeTruthy();
  });
});
