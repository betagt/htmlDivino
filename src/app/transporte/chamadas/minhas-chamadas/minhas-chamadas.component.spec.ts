import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasChamadasComponent } from './minhas-chamadas.component';

describe('MinhasChamadasComponent', () => {
  let component: MinhasChamadasComponent;
  let fixture: ComponentFixture<MinhasChamadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasChamadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasChamadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
