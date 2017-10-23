import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicaListComponent } from './caracteristica-list.component';

describe('CaracteristicaListComponent', () => {
  let component: CaracteristicaListComponent;
  let fixture: ComponentFixture<CaracteristicaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaracteristicaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaracteristicaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
