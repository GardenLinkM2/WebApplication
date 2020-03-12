import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';
import {MenuComponent} from '../../components/menu/menu.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainLayoutComponent,
        MenuComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
