import { TestBed } from '@angular/core/testing';

import { PlayGameService } from './play-game.service';

describe('PlayGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayGameService = TestBed.get(PlayGameService);
    expect(service).toBeTruthy();
  });
});
