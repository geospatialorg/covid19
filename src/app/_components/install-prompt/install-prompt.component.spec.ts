import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallPromptComponent } from './install-prompt.component';

describe('InstallPromptComponent', () => {
  let component: InstallPromptComponent;
  let fixture: ComponentFixture<InstallPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
