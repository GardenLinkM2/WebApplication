import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDetailsScreenComponent } from './ad-details-screen.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AdDetailsScreenComponent', () => {
  let component: AdDetailsScreenComponent;
  let fixture: ComponentFixture<AdDetailsScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdDetailsScreenComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdDetailsScreenComponent);
    component = fixture.componentInstance;
    component.ad = {
      id: '',
      name: '',
      isReserved: false,
      minUse: 1,
      description: '',
      location: {city: '', postalCode: 1, streetNumber: 1, street: '', longitudeAndLatitude: undefined},
      owner: '',
      validation: '',
      criteria: {
        id: '1',
        orientation: '',
        typeOfClay: undefined,
        directAccess: false,
        equipments: false,
        waterAccess: false,
        price: 1,
        locationTime: undefined,
        area: 23
      },
      photos: undefined
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
