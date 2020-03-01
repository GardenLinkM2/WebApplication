import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPwdScreenComponent } from './recover-pwd-screen.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('RecoverPwdScreenComponent', () => {
  let component: RecoverPwdScreenComponent;
  let fixture: ComponentFixture<RecoverPwdScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverPwdScreenComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPwdScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
