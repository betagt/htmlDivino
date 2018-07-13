import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessage2Component } from './error-message2.component';

describe('ErrorMessage2Component', () => {
  let component: ErrorMessage2Component;
  let fixture: ComponentFixture<ErrorMessage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMessage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
