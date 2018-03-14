import { TestBed, inject } from '@angular/core/testing';

import { ContasAPagarService } from './contas-a-pagar.service';

describe('ContasAPagarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContasAPagarService]
    });
  });

  it('should ...', inject([ContasAPagarService], (service: ContasAPagarService) => {
    expect(service).toBeTruthy();
  }));
});
