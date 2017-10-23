import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotaAcessoDetailComponent } from './rota-acesso-detail.component';

describe('RotaAcessoDetailComponent', () => {
  let component: RotaAcessoDetailComponent;
  let fixture: ComponentFixture<RotaAcessoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotaAcessoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaAcessoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
