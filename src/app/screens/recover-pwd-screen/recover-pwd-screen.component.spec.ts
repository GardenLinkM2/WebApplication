import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPwdScreenComponent } from './recover-pwd-screen.component';

describe('RecoverPwdScreenComponent', () => {
  let component: RecoverPwdScreenComponent;
  let fixture: ComponentFixture<RecoverPwdScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverPwdScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPwdScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
