import { TestBed } from '@angular/core/testing';

import { SnackbarManager } from './snackbar-manager';

describe('SnackbarManager', () => {
  let service: SnackbarManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
