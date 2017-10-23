import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoContratacaoDetailComponent } from './plano-contratacao-detail.component';

describe('PlanoContratacaoDetailComponent', () => {
  let component: PlanoContratacaoDetailComponent;
  let fixture: ComponentFixture<PlanoContratacaoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoContratacaoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoContratacaoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
