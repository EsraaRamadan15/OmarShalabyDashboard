import { TestBed } from '@angular/core/testing';

import { ToasterNotifierService } from './toaster-notifier.service';

describe('ToasterNotifierService', () => {
  let service: ToasterNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
