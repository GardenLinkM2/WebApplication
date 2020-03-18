import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDetailsCommentsComponent } from './ad-details-comments.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AdDetailsCommentsComponent', () => {
  let component: AdDetailsCommentsComponent;
  let fixture: ComponentFixture<AdDetailsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdDetailsCommentsComponent ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdDetailsCommentsComponent);
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
    component.owner = {id: '', lastName: '', firstName: '', avatar: '', admin: false, email: '', newsletter: false, phone: ''}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
