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

  isAuthenticated() : boolean {  
    //return true;
    const auth = this.cognitoService.isAuthenticated()

    if (auth) return false;
    else return true;
        
    //this.app.ngOnInit();
  }

}


