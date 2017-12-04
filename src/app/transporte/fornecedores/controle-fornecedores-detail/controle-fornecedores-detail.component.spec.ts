import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleFornecedoresDetailComponent } from './controle-fornecedores-detail.component';

describe('ControleFornecedoresDetailComponent', () => {
  let component: ControleFornecedoresDetailComponent;
  let fixture: ComponentFixture<ControleFornecedoresDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleFornecedoresDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleFornecedoresDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
