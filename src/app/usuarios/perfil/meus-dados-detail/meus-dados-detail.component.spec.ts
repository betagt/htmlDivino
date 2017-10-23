import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusDadosDetailComponent } from './meus-dados-detail.component';

describe('MeusDadosDetailComponent', () => {
  let component: MeusDadosDetailComponent;
  let fixture: ComponentFixture<MeusDadosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusDadosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusDadosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
