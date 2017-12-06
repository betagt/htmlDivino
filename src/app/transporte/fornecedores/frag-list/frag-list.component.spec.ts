import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragListComponent } from './frag-list.component';

describe('FragListComponent', () => {
  let component: FragListComponent;
  let fixture: ComponentFixture<FragListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
