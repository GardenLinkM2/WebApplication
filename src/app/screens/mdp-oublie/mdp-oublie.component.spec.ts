import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpOublieComponent } from './mdp-oublie.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormControl, FormGroup, Validators} from '@angular/forms';

describe('MpdOublieComponent', () => {
  let component: MdpOublieComponent;
  let fixture: ComponentFixture<MdpOublieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdpOublieComponent ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdpOublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form', () => {
    component.fgtPassForm = new FormGroup(
      {emailControl: new FormControl('example@example', [Validators.email, Validators.required])}
    );
    component.onSubmit();
    expect(component.submitted).toEqual(true);
  });
});
