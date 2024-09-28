import { TestBed } from '@angular/core/testing';

import { DeveloperDataService } from './developer-data.service';

describe('DeveloperDataService', () => {
  let service: DeveloperDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeveloperDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
