import { TestBed } from '@angular/core/testing';

import { AtenticacaoService } from './atenticacao.service';

describe('AtenticacaoService', () => {
  let service: AtenticacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtenticacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
