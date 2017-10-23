import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicaDetailComponent } from './caracteristica-detail.component';

describe('CaracteristicaDetailComponent', () => {
  let component: CaracteristicaDetailComponent;
  let fixture: ComponentFixture<CaracteristicaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracteristicaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracteristicaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
