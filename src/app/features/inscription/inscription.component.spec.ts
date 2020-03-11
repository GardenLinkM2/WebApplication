import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InscriptionComponent } from './inscription.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
// import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {observable} from 'rxjs';

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscriptionComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [InscriptionComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initForm should not fail', () => {
    expect(component.initForm).toBeTruthy();
  });

  it('should not be undefinied', () => {
    component.initForm();
    expect(component.myForm).toBeDefined();
  });

  it('onSubmit should not fail', () => {
    expect(component.onSubmit()).toBeUndefined();
  });
});
