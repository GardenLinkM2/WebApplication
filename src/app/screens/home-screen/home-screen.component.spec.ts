import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeScreenComponent } from './home-screen.component';
import {ResearchComponent} from '../../features/research/research.component';
import {CardModule} from 'primeng/card';
import {AdCardComponent} from '../../components/ad-card/ad-card.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('HomeScreenComponent', () => {
  let component: HomeScreenComponent;
  let fixture: ComponentFixture<HomeScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeScreenComponent,
        ResearchComponent,
        AdCardComponent
      ],
      imports: [
        CardModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
