import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountyGraphsComponent } from './county-graphs.component';

describe('CountyGraphsComponent', () => {
  let component: CountyGraphsComponent;
  let fixture: ComponentFixture<CountyGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountyGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountyGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
