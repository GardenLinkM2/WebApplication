import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdpOublieComponent } from './mdp-oublie.component';

describe('MpdOublieComponent', () => {
  let component: MdpOublieComponent;
  let fixture: ComponentFixture<MdpOublieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdpOublieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdpOublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
