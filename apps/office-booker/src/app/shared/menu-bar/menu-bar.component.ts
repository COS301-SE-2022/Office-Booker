import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { CognitoService } from '../../cognito.service';
import { BookingServiceService, employee } from '../../services/booking-service.service';

@Component({
  selector: 'office-booker-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent {

  admin = false;
  authenticated = false;


  constructor(private app: AppComponent,
    private cognitoService: CognitoService, 
    ) {
      
     
    
  }

  ngOnInit() {
    this.admin = this.cognitoService.authenticated();
    this.authenticated = this.cognitoService.admin();

    console.log(this.admin);
    console.log(this.authenticated);
    console.log("Test")

    
  }

  signOut(): void {
    this.cognitoService.signOut();
    this.app.signOut();
  }

  isAuthenticated(): boolean {
    //console.log("called")
    return this.cognitoService.authenticated();
  }

  isAdmin(): boolean {
    return this.cognitoService.admin();
  }


}


