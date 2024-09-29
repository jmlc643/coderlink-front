import { TestBed } from '@angular/core/testing';

import { JwtApiService } from './jwt-api.service';

describe('JwtApiService', () => {
  let service: JwtApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
