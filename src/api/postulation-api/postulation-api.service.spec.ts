import { TestBed } from '@angular/core/testing';

import { PostulationApiService } from './postulation-api.service';

describe('PostulationApiService', () => {
  let service: PostulationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostulationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
