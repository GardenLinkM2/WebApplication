import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private user = 'mes-info';
  private gardens = 'mes-jardins';
  private messages = 'messages';
  tabs = [
    {
      route: `/espace-personel/${this.user}`,
      name: 'Mon profil',
      id: 'user'
    },
    {
      route: `/espace-personel/${this.gardens}`,
      name: 'Mes jardins',
      id: 'gardens'
    },
    {
      route: `/espace-personel/${this.messages}`,
      name: 'Mes messages',
      id: 'msgs'
    }];
  constructor(private router: Router) { }
  ngOnInit() {
  }

  switch(tabRoute) {
    return tabRoute === this.router.url ? 'active' : '';
  }

}
