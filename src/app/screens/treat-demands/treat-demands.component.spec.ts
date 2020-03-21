import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatDemandsComponent } from './treat-demands.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TreatDemandsComponent', () => {
  let component: TreatDemandsComponent;
  let fixture: ComponentFixture<TreatDemandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatDemandsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatDemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
