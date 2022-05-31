import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'office-booker-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent /*implements OnInit*/ {
  constructor(private app: AppComponent) { }

  //ngOnInit(): void {}

  signOut(): void {
    this.app.signOut();
  }
  isAuthenticated() : void {
    this.app.ngOnInit();
  }
}


