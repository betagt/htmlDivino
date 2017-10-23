import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormasPagamentoDetailComponent } from './formas-pagamento-detail.component';

describe('FormasPagamentoDetailComponent', () => {
  let component: FormasPagamentoDetailComponent;
  let fixture: ComponentFixture<FormasPagamentoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormasPagamentoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormasPagamentoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
