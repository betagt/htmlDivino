import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarChamadasComponent } from './gerenciar-chamadas.component';

describe('GerenciarChamadasComponent', () => {
  let component: GerenciarChamadasComponent;
  let fixture: ComponentFixture<GerenciarChamadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarChamadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarChamadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
