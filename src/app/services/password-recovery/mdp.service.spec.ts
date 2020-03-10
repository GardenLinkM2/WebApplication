import { TestBed } from '@angular/core/testing';

import { MdpService } from './mdp.service';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import {FormControl, FormGroup, Validators} from '@angular/forms';

describe('MdpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [MdpService]
  }));

  it('should be created', () => {
    const service: MdpService = TestBed.get(MdpService);
    expect(service).toBeTruthy();
  });
  it('#recover works', () => {
    const service: MdpService = TestBed.get(MdpService);
    const userForm = new FormGroup(
      {falsified: new FormControl('', [Validators.email, Validators.required])}
    );
    expect(service.recover.bind(userForm)).toThrowError(TypeError);
  });
});
