import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillWalletScreenComponent } from './fill-wallet-screen.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('FillWalletScreenComponent', () => {
  let component: FillWalletScreenComponent;
  let fixture: ComponentFixture<FillWalletScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillWalletScreenComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillWalletScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
