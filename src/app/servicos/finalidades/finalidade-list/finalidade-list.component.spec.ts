import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalidadeListComponent } from './finalidade-list.component';

describe('FinalidadeListComponent', () => {
  let component: FinalidadeListComponent;
  let fixture: ComponentFixture<FinalidadeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalidadeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalidadeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
