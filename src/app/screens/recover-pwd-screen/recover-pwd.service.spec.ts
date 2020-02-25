import { TestBed } from '@angular/core/testing';

import { RecoverPwdService } from './recover-pwd.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormControl, FormGroup, Validators} from '@angular/forms';

describe('RecoverPwdService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [RecoverPwdService]
  }));

  it('should be created', () => {
    const service: RecoverPwdService = TestBed.get(RecoverPwdService);
    expect(service).toBeTruthy();
  });

  it('#reinint works', () => {
    const service: RecoverPwdService = TestBed.get(RecoverPwdService);
    const userForm = new FormGroup(
      {password: new FormControl('', [Validators.required])}
    );
    expect(service.reinitpass.bind(userForm)).toThrowError(TypeError);
  });
});
