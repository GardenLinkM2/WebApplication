import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLeasingDComponent } from './confirm-leasing-d.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {ConfirmationService} from 'primeng/api';
import {UserService} from '../../services/user-info/user.service';
import {GardensService} from '../../services/gardens/gardens.service';

describe('ConfirmLeasingDComponent', () => {
  let component: ConfirmLeasingDComponent;
  let fixture: ComponentFixture<ConfirmLeasingDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmLeasingDComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmLeasingDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
