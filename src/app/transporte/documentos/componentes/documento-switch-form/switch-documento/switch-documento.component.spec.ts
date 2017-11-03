import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchDocumentoComponent } from './switch-documento.component';

describe('SwitchDocumentoComponent', () => {
  let component: SwitchDocumentoComponent;
  let fixture: ComponentFixture<SwitchDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
