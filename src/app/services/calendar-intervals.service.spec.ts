import { TestBed } from '@angular/core/testing';

import { CalendarIntervalsService } from './calendar-intervals.service';

describe('CalendarIntervalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarIntervalsService = TestBed.get(CalendarIntervalsService);
    expect(service).toBeTruthy();
  });
});
