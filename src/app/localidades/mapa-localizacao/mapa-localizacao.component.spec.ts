import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaLocalizacaoComponent } from './mapa-localizacao.component';

describe('MapaLocalizacaoComponent', () => {
  let component: MapaLocalizacaoComponent;
  let fixture: ComponentFixture<MapaLocalizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaLocalizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaLocalizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
