import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleFornecedoresComponent } from './controle-fornecedores.component';

describe('ControleFornecedoresComponent', () => {
  let component: ControleFornecedoresComponent;
  let fixture: ComponentFixture<ControleFornecedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleFornecedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
