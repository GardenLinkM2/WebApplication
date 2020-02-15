import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-mpd-oublie',
  templateUrl: './mpd-oublie.component.html',
  styleUrls: ['./mpd-oublie.component.scss']
})
export class MpdOublieComponent implements OnInit {

  constructor() { }
  name = new FormControl('');
  ngOnInit() {
  }

}
