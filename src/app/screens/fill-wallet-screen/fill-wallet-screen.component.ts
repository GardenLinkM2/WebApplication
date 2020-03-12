import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fill-wallet-screen',
  templateUrl: './fill-wallet-screen.component.html',
  styleUrls: ['./fill-wallet-screen.component.scss']
})
export class FillWalletScreenComponent implements OnInit {
  private title = 'Recharger le porte-monnaie';
  constructor() { }

  ngOnInit() {
  }

}
