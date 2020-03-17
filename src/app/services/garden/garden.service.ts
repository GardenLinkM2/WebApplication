import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Report } from 'src/app/@entities/report';

@Injectable({
  providedIn: 'root'
})
export class GardenService {

  private urlback = `${environment.url}api/`;

  constructor(private client: HttpClient) { }

  sendReport(report : Report) {
    return this.client.post(this.urlback + `Gardens/${report.ofGarden}/report`, report);
  }
}
