import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesJardinsComponent } from './mes-jardins.component';

describe('MesJardinsComponent', () => {
  let component: MesJardinsComponent;
  let fixture: ComponentFixture<MesJardinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesJardinsComponent ]
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
