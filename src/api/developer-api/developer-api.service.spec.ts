import { TestBed } from '@angular/core/testing';

import { DeveloperApiService } from './developer-api.service';

describe('DeveloperApiService', () => {
  let service: DeveloperApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeveloperApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
