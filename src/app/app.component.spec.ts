import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MainLayoutComponent} from './screens/main-layout/main-layout.component';
import {MenuComponent} from './components/menu/menu.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        MainLayoutComponent,
        MenuComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
