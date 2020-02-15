import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpdOublieComponent } from './mpd-oublie.component';

describe('MpdOublieComponent', () => {
  let component: MpdOublieComponent;
  let fixture: ComponentFixture<MpdOublieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpdOublieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpdOublieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
