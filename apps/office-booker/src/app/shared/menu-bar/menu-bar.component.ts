import { ChangeDetectorRef, Component, OnInit, HostListener } from '@angular/core';
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
  guest = true;
  authenticated = false;
  email = "";
  name = "";
  loggedIn = false;
  status = "";


  constructor(private app: AppComponent,
    private cognitoService: CognitoService, private changeDetection: ChangeDetectorRef,
    ) {
      if ((localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"))) {
        this.loggedIn = true;
      } else this.loggedIn = false;
    
    this.admin = this.cognitoService.authenticated();
    this.guest = this.cognitoService.guest();
    this.authenticated = this.cognitoService.admin();
    this.email = this.cognitoService.getEmailAddress();
    this.name = this.cognitoService.returnName();
    this.cognitoService.update();
    this.name = this.getName();
    console.log(this.name);
      
  }

  ngOnInit() {
    if ((localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"))) {
      this.loggedIn = true;
    } else this.loggedIn = false;
    this.admin = this.cognitoService.authenticated();
    this.guest = this.cognitoService.guest();
    this.authenticated = this.cognitoService.admin();
    this.email = this.cognitoService.getEmailAddress();
    this.name = this.cognitoService.returnName();
    this.cognitoService.update();
    this.name = this.getName();
    console.log(this.name);
    // this.cognitoService.getName();

    this.changeDetection.detectChanges();
    this.changeDetection.detectChanges();

    this.changeDetection.detectChanges();

    this.changeDetection.detectChanges();

    this.changeDetection.detectChanges();

    
  }

  signOut(): void {
    this.cognitoService.signOut();
    this.loggedIn = false;
    this.isAuthenticated();
    this.app.signOut();
  }

  getName() : string {
    this.name = this.cognitoService.getName();
    return this.name;
  }
  

  isAuthenticated(): boolean {
    return this.cognitoService.loggedIn();
    // return this.cognitoService.authenticated();
  }

  isAdmin(): boolean {
    return this.cognitoService.admin();
  }

  isNotGuest(): boolean {
    // console.log("isNotGuest");
    return !(this.cognitoService.guest());
    // return !(this.cognitoService.guest()) && this.cognitoService.loggedIn();
  }

  isStatus() : void { 
    if (this.isAdmin() == true)
      this.status = "Admin";
    else if (this.isNotGuest() == false)
      this.status = "Guest";
    else 
      this.status = "User";
    return;
  }

  isEmailAddress(): boolean {
    this.isStatus();
    this.email = this.cognitoService.getEmailAddress();
    if (this.email != null && this.isAuthenticated() ){
      return true;
    }
    return false;
  }
    


}


