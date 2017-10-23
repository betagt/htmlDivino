import { TestBed, inject } from '@angular/core/testing';

import { BaseServiceService } from './base-service.service';

describe('BaseServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseServiceService]
    });
  });

  it('should ...', inject([BaseServiceService], (service: BaseServiceService) => {
    expect(service).toBeTruthy();
  }));
});
