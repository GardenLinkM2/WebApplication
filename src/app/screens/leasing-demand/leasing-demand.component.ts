import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-leasing-demand',
  templateUrl: './leasing-demand.component.html',
  styleUrls: ['./leasing-demand.component.scss']
})
export class LeasingDemandComponent implements OnInit {
  gardenId = '';
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.gardenId = this.activatedRoute.snapshot.params.id;
  }

  title : string = "Demande de location";

}
