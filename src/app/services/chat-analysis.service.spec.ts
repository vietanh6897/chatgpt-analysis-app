import { TestBed } from '@angular/core/testing';

import { ChatAnalysisService } from './chat-analysis.service';

describe('ChatAnalysisService', () => {
  let service: ChatAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
