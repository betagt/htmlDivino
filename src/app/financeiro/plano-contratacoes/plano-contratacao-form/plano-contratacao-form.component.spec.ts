import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoContratacaoFormComponent } from './plano-contratacao-form.component';

describe('PlanoContratacaoFormComponent', () => {
  let component: PlanoContratacaoFormComponent;
  let fixture: ComponentFixture<PlanoContratacaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoContratacaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoContratacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
