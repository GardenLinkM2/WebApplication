import { TestBed } from '@angular/core/testing';

import { RecoverPwdService } from './recover-pwd.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('RecoverPwdService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [RecoverPwdService]
  }));

  it('should be created', () => {
    const service: RecoverPwdService = TestBed.get(RecoverPwdService);
    expect(service).toBeTruthy();
  });
});
