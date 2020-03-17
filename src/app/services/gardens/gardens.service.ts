import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FilterConstructService} from '../filter-construct.service';

@Injectable({
  providedIn: 'root'
})
export class GardensService {

  private gardenUrl = environment.url + 'api/Gardens/';

  constructor(private client: HttpClient, private filterConstructService: FilterConstructService) { }

  getGardenById(id: string) {
    return this.client.get(this.gardenUrl + id);
  }

  getGardens() {
    return this.client.get(this.gardenUrl);
  }

  searchGarden(filters) {
    const filter = this.filterConstructService.constructUrl(filters);
    return this.client.get(this.gardenUrl + filter);
    // ?$filter=criteria/locationTime ge 0 and criteria/locationTime le 36 and criteria/area ge 0 and criteria/area le 10000 and criteria/price ge 0.0 and criteria/price le 10000.0
  }

}
