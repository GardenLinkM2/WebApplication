import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarousselComponent } from './caroussel.component';

describe('CarousselComponent', () => {
  let component: CarousselComponent;
  let fixture: ComponentFixture<CarousselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarousselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarousselComponent);
    component = fixture.componentInstance;
    component.images = [{fileName: '', id: '1', path: ''}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
