import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdCardComponent} from './ad-card.component';
import {CardModule} from 'primeng/card';
import {Location} from '../../@entities/location';
import {Criteria} from '../../@entities/criteria';
import {Photo} from '../../@entities/photo';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AdCardComponent', () => {
  let component: AdCardComponent;
  let fixture: ComponentFixture<AdCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdCardComponent],
      imports: [
        CardModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCardComponent);
    component = fixture.componentInstance;
    component.garden = {
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
