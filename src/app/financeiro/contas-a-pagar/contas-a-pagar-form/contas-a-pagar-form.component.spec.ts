import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasAPagarFormComponent } from './contas-a-pagar-form.component';

describe('ContasAPagarFormComponent', () => {
  let component: ContasAPagarFormComponent;
  let fixture: ComponentFixture<ContasAPagarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContasAPagarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContasAPagarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
