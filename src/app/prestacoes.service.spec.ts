import { TestBed } from '@angular/core/testing';

import { PrestacoesService } from './prestacoes.service';

describe('PrestacoesService', () => {
  let service: PrestacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
