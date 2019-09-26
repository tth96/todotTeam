import { TestBed } from '@angular/core/testing';

import { FormadddataService } from './formadddata.service';

describe('FormadddataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormadddataService = TestBed.get(FormadddataService);
    expect(service).toBeTruthy();
  });
});
