import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSpaceComponent } from './personal-space.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('PersonalSpaceComponent', () => {
  let component: PersonalSpaceComponent;
  let fixture: ComponentFixture<PersonalSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalSpaceComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
