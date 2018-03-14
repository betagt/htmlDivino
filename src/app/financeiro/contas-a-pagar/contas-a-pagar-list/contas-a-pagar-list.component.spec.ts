import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasAPagarListComponent } from './contas-a-pagar-list.component';

describe('ContasAPagarListComponent', () => {
  let component: ContasAPagarListComponent;
  let fixture: ComponentFixture<ContasAPagarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContasAPagarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContasAPagarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
