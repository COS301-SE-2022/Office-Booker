import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CognitoService } from '../../cognito.service';

@Component({
  selector: 'office-booker-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent /*implements OnInit*/ {
  constructor(private app: AppComponent,
    private cognitoService: CognitoService) { }

  //ngOnInit(): void {}

  signOut(): void {
    this.cognitoService.signOut();
    this.app.signOut();
  }
  async isAuthenticated() : Promise<boolean> {
    alert("RouteGuard")
    if (await this.cognitoService.isAuthenticated()){
      alert("Returned true for routeGuard")
      return true;
    }
    else{
      alert("Returned false for routeGuard");
      return false;
    }
      
    //this.app.ngOnInit();
  }
}


