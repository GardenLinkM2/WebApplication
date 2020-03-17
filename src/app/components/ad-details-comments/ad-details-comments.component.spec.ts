import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDetailsCommentsComponent } from './ad-details-comments.component';

describe('AdDetailsCommentsComponent', () => {
  let component: AdDetailsCommentsComponent;
  let fixture: ComponentFixture<AdDetailsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdDetailsCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdDetailsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
