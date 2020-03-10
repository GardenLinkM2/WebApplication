import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadScreenComponent } from './upload-screen.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

describe('UploadScreenComponent', () => {
  let component: UploadScreenComponent;
  let fixture: ComponentFixture<UploadScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadScreenComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.cityPattern).toEqual(/^[A-Za-z0-9 -]+$/);
    expect(component.onlyNumbers).toEqual( /^[0-9]+$/);
    expect(component.streetNamePattern).toEqual(/^[A-Za-z0-9 ]+$/);
    expect(component.zipCodePattern).toEqual(/^[0-9][0-9][0-9][0-9][0-9]$/);
  });
});
