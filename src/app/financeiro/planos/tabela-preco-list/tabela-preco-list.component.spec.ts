import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPrecoListComponent } from './tabela-preco-list.component';

describe('TabelaPrecoListComponent', () => {
  let component: TabelaPrecoListComponent;
  let fixture: ComponentFixture<TabelaPrecoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaPrecoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaPrecoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
