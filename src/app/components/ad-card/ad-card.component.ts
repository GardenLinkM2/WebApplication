import {Component, Input, OnInit} from '@angular/core';
import {Garden} from '../../@entities/garden';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss']
})
export class AdCardComponent implements OnInit {

  @Input() garden: Garden;

  constructor() { }

  ngOnInit() {
  }

}
