import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from '../../../components/navbar/navbar.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal-space',
  templateUrl: './personal-space.component.html',
  styleUrls: ['./personal-space.component.scss']
})
export class PersonalSpaceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
