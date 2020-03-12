import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndevelopmentComponent } from './indevelopment.component';

describe('IndevelopmentComponent', () => {
  let component: IndevelopmentComponent;
  let fixture: ComponentFixture<IndevelopmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndevelopmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
