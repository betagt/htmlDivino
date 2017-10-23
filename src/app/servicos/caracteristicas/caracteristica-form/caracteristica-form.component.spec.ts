import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicaFormComponent } from './caracteristica-form.component';

describe('CaracteristicaFormComponent', () => {
  let component: CaracteristicaFormComponent;
  let fixture: ComponentFixture<CaracteristicaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracteristicaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracteristicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
