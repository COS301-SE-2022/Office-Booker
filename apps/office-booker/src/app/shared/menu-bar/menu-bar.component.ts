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
  email = "";


  constructor(private app: AppComponent,
    private cognitoService: CognitoService, 
    ) {
      
     
    
  }

  ngOnInit() {
    this.admin = this.cognitoService.authenticated();
    alert(this.admin);
    this.authenticated = this.cognitoService.admin();
    alert(this.authenticated);
    this.email = this.cognitoService.getEmailAddress();
    alert(this.email);

    //console.log(this.admin);
    //console.log(this.authenticated);
    //console.log("Test")

    
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

  isEmailAddress(): boolean {
    // alert("is email called");
    this.email = this.cognitoService.getEmailAddress();
    if (this.cognitoService.getEmailAddress() != null && this.isAuthenticated() )
      return true;
    return false;
  }
    


}


