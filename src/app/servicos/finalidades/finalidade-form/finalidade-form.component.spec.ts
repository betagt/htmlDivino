import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalidadeFormComponent } from './finalidade-form.component';

describe('FinalidadeFormComponent', () => {
  let component: FinalidadeFormComponent;
  let fixture: ComponentFixture<FinalidadeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalidadeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalidadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
