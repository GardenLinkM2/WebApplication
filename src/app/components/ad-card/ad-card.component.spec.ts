import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCardComponent } from './ad-card.component';
import {CardModule} from 'primeng/card';

describe('AdCardComponent', () => {
  let component: AdCardComponent;
  let fixture: ComponentFixture<AdCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdCardComponent ],
      imports: [
        CardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCardComponent);
    component = fixture.componentInstance;
    component.garden =  {id: '1', minUse: 12, name: 'Beau Jardin', owner: 'JL Picard', reserve: false, size: 123, type: 'type',
      validation: {id: '12', state: 12},
      criteria:
        {
          id: '1',
          location: {id: 'belle adresse'},
          price: 100,
          area: 120,
          directAccess: true,
          equipments: true,
          locationTime: undefined,
          orientation: 'orienté',
          typeOfClay: 'typé',
          waterAccess: true
        },
      photos: undefined
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
