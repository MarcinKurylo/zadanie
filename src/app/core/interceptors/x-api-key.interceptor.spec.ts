import { TestBed } from '@angular/core/testing';

import { XApiKeyInterceptor } from './x-api-key.interceptor';

describe('XApiKeyInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      XApiKeyInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: XApiKeyInterceptor = TestBed.inject(XApiKeyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
