import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoContratacaoListComponent } from './plano-contratacao-list.component';

describe('PlanoContratacaoListComponent', () => {
  let component: PlanoContratacaoListComponent;
  let fixture: ComponentFixture<PlanoContratacaoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoContratacaoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoContratacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
