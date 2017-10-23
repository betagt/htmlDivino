import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDocumentoDetailComponent } from './tipo-documento-detail.component';

describe('TipoDocumentoDetailComponent', () => {
  let component: TipoDocumentoDetailComponent;
  let fixture: ComponentFixture<TipoDocumentoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDocumentoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDocumentoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
