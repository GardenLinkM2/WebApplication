import { TestBed } from '@angular/core/testing';

import { MdpService } from './mdp.service';
import { HttpClientTestingModule} from '@angular/common/http/testing';

describe('MdpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [MdpService]
  }));

  it('should be created', () => {
    const service: MdpService = TestBed.get(MdpService);
    expect(service).toBeTruthy();
  });
});
