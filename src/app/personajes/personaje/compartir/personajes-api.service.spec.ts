import { TestBed } from '@angular/core/testing';

import { PersonajesApiService } from './personajes-api.service';

describe('PersonajesApiService', () => {
  let service: PersonajesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonajesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
