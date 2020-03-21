import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandComponent } from './demand.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DemandComponent', () => {
  let component: DemandComponent;
  let fixture: ComponentFixture<DemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandComponent ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
