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
});
