import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesJardinsComponent } from './mes-jardins.component';
import {AdCardComponent} from '../../components/ad-card/ad-card.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('MesJardinsComponent', () => {
  let component: MesJardinsComponent;
  let fixture: ComponentFixture<MesJardinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MesJardinsComponent,
        AdCardComponent
      ],
      imports: [
        HttpClientTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesJardinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
