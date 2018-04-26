import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalheChamadaComponent } from './modal-detalhe-chamada.component';

describe('ModalDetalheChamadaComponent', () => {
  let component: ModalDetalheChamadaComponent;
  let fixture: ComponentFixture<ModalDetalheChamadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalheChamadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalheChamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
