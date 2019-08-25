import { TestBed } from '@angular/core/testing';

import { MonkService } from './monk.service';

describe('MonkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonkService = TestBed.get(MonkService);
    expect(service).toBeTruthy();
  });
});
