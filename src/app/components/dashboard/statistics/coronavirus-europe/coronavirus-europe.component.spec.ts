import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoronavirusEuropeComponent } from './coronavirus-europe.component';

describe('CoronavirusEuropeComponent', () => {
  let component: CoronavirusEuropeComponent;
  let fixture: ComponentFixture<CoronavirusEuropeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoronavirusEuropeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoronavirusEuropeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
