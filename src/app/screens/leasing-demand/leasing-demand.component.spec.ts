import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingDemandComponent } from './leasing-demand.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('LeasingDemandComponent', () => {
  let component: LeasingDemandComponent;
  let fixture: ComponentFixture<LeasingDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasingDemandComponent ],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasingDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
