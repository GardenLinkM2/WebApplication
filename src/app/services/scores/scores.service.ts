import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Score} from '../../@entities/score';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  scoresUrl = environment.url + 'api/Gardens/';

  constructor(private httpClient: HttpClient) {
  }

  getScoresByGarden(gardenId: string) {
    return this.httpClient.get(this.scoresUrl + gardenId +  '/score');
  }

  postScoreToGarden(gardenId: string, score: Score) {
    return this.httpClient.post(this.scoresUrl + gardenId +  '/score', score);
  }
}
