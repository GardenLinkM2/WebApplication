import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { FillWalletComponent } from './fill-wallet.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';



describe('FillWalletComponent', () => {
  let component: FillWalletComponent;
  let fixture: ComponentFixture<FillWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillWalletComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
