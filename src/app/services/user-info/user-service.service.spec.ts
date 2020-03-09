import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs';
import {UpdatedInfo} from '../../@entities/updateInfo';

describe('UserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('getUserWallet should return observable', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getUserWallet()).toBe(Observable);
  });

  it('getUserInfoAuth should return observable', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getUserInfoAuth()).toBe(Observable);
  });

  it('deleteAccount should return observable', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.deleteAccount('anyid')).toBe(Observable);
  });

  it('updateInformation should return observable', () => {
    const service: UserService = TestBed.get(UserService);
    let updatedInfo: UpdatedInfo;
    updatedInfo = {
      password: 'password',
      avatar: 'avatar',
      email: 'example@example.com',
      phone: '0600000000',
      newsletter: true
    };
    expect(service.updateInformation('anyid', updatedInfo)).toBe(Observable);
  });
});
