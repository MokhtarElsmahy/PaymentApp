import { TestBed } from '@angular/core/testing';

import { OpenDrainService } from './open-drain.service';

describe('OpenDrainService', () => {
  let service: OpenDrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenDrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
