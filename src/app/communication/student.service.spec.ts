import { TestBed, inject } from '@angular/core/testing';

import { Student.TsService } from './student.ts.service';

describe('Student.TsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Student.TsService]
    });
  });

  it('should be created', inject([Student.TsService], (service: Student.TsService) => {
    expect(service).toBeTruthy();
  }));
});
