import { TestBed } from '@angular/core/testing';

import { WLeaveService } from './wleave.service';

describe('WLeaveService', () => {
  let service: WLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
