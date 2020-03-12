import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private user = 'user-info';
  private gardens = 'my-gardens';
  private messages = 'messages';
  private active = '';
  tabs = [
    {
      route: `/personal-space/${this.user}`,
      name: 'Mes informations',
      id: 'user'
    },
    {
      route: `/personal-space/${this.gardens}`,
      name: 'Mes jardins',
      id: 'gardens'
    },
    {
      route: `/personal-space/${this.messages}`,
      name: 'Messages',
      id: 'msgs'
    }]
  constructor(private router: Router) { }
  ngOnInit() {
  }

  switch(tabRoute) {
    return tabRoute === this.router.url ? 'active' : '';
  }

}
