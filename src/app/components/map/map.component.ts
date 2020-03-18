import * as leaflet from 'leaflet';
import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../../@entities/location';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [
    './map.component.scss'
  ]
})
export class MapComponent implements OnInit {
  private MAP_URL = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png';
  private map: leaflet.Map;
  @Input() localisation: Location;
  constructor(
  ) { }

  ngOnInit() {
    if (this.localisation && this.localisation.longitudeAndLatitude
    && (this.localisation.longitudeAndLatitude.longitude > 0 || this.localisation.longitudeAndLatitude.latitude >0)) {
      this.map = leaflet.map('map').setView(
        [this.localisation.longitudeAndLatitude.latitude, this.localisation.longitudeAndLatitude.longitude],
        12);
    } else {
      this.map = leaflet.map('map').setView(
        [45.7833, 3.0833],
        12);
    }

    leaflet.tileLayer(this.MAP_URL, {
      attribution: 'mamap'
    }).addTo(this.map);
  }



}
