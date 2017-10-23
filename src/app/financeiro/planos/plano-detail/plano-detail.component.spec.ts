import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoDetailComponent } from './plano-detail.component';

describe('PlanoDetailComponent', () => {
  let component: PlanoDetailComponent;
  let fixture: ComponentFixture<PlanoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
