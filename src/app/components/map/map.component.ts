import * as leaflet from 'leaflet';
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Location} from '../../@entities/location';
import {OnChange} from 'ngx-bootstrap';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: [
    './map.component.scss'
  ]
})
export class MapComponent implements OnInit, OnChanges {
  private MAP_URL = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png';
  private map: leaflet.Map;
  @Input() localisation: Location;

  constructor() {
  }

  ngOnInit() {
    this.map = leaflet.map('map').setView([0, 0], 1);
    this.setMapView();
    leaflet.tileLayer(this.MAP_URL, {
      attribution: 'mamap'
    }).addTo(this.map);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map) {
      this.setMapView();
    }
  }

  setMapView() {
    if (this.localisation && this.localisation.longitudeAndLatitude
      && (this.localisation.longitudeAndLatitude.longitude > 0 || this.localisation.longitudeAndLatitude.latitude > 0)) {
      this.map.setView(
        [this.localisation.longitudeAndLatitude.latitude, this.localisation.longitudeAndLatitude.longitude],
        20);
    } else {
      this.map.setView(
        [45.7833, 3.0833],
        1);
    }
  }


}
