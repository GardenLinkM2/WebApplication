import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInformationComponent } from './user-information.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('UserInformationComponent', () => {
  let component: UserInformationComponent;
  let fixture: ComponentFixture<UserInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInformationComponent ],
      providers: [UserInformationComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch state', () => {
    component.switchFieldState();
    expect(component.infoForm.controls.email.enabled).toEqual(true);
    expect(component.infoForm.controls.phoneNumber.enabled).toEqual(true);
    expect(component.infoForm.controls.newsletter.enabled).toEqual(true);
  });

  it('save changes should be void', () => {
    expect(component.saveChanges()).toBeUndefined();
  });

  it('editPassword should switch from enabled to disabled', () => {
    component.infoForm.controls.password.enable();
    component.editPassword();
    expect(component.infoForm.controls.password.enabled).toEqual(false);
    expect(component.infoForm.controls.confirmPassword.enabled).toEqual(false);
    expect(component.editingPassword).toEqual(false);
    expect(component.passwordLabel).toEqual('Mot de passe');
    expect(component.infoForm.controls.password.value).toEqual('****************');
  });

  it('editPassword should switch from disabled to enabled', () => {
    component.infoForm.controls.password.disable();
    component.editPassword();
    expect(component.infoForm.controls.password.disabled).toEqual(false);
    expect(component.infoForm.controls.confirmPassword.disabled).toEqual(false);
    expect(component.editingPassword).toEqual(true);
    expect(component.passwordLabel).toEqual('Saisir le nouveau mot de passe');
    expect(component.infoForm.controls.password.value).toEqual('');
    expect(component.infoForm.controls.confirmPassword.value).toEqual('');
  });
});
