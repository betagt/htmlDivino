import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPrecoFormComponent } from './tabela-preco-form.component';

describe('TabelaPrecoFormComponent', () => {
  let component: TabelaPrecoFormComponent;
  let fixture: ComponentFixture<TabelaPrecoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaPrecoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaPrecoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
