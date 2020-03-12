import { TestBed } from '@angular/core/testing';

import {InscriptionService} from './inscription.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormControl, FormGroup} from '@angular/forms';

describe('InscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [InscriptionService],
  }));

  it('should be created', () => {
    const service: InscriptionService = TestBed.get(InscriptionService);
    expect(service).toBeTruthy();
  });

  it('should be falsy form', () => {
    const service: InscriptionService = TestBed.get(InscriptionService);
    const falsyForm = new FormGroup({
      testing: new FormControl('test')
    });
    expect(service.enroll.bind(falsyForm)).toThrowError('Cannot read property \'controls\' of undefined');
  });

  it('should be truthy form', () => {
    const service: InscriptionService = TestBed.get(InscriptionService);
    const trueForm = new FormGroup({
      firstName: new FormControl('test'),
      lastName: new FormControl('test'),
      email: new FormControl('test'),
      phone: new FormControl('test'),
      password: new FormControl('test'),
      repassword: new FormControl('test'),
      captcha: new FormControl('test'),
      condition: new FormControl('test'),
      newsletter: new FormControl('test')
    });
    expect(service.enroll(trueForm)).toBeTruthy();
  });
});
