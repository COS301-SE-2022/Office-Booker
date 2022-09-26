import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component'

import { IUser, CognitoService } from '../../cognito.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'office-booker-login',
  templateUrl: './guest-login.component.html',
  styleUrls: ['./guest-login.component.css'],
})
export class GuestLoginComponent {

  loading: boolean;
  user: IUser;

  constructor(private router: Router,
              private cognitoService: CognitoService,
              ) {
    this.loading = false;
    this.user = {} as IUser;
  }

  // Function that uses cognito services to sign the user in and check admin status. It navigates to the 
  // personal bookings page if successful, otherwise it prints an error

  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)
    .then(() => {
      this.cognitoService.setAuthenticated(true);
      this.cognitoService.hasAdmin();
      
      //const comp = new MenuBarComponent(this.app, this.cognitoService);
      //comp.ngOnInit();


      this.router.navigate(['/bookings']);
    }).catch((e) => {
      alert(e)
    this.loading = false;
    });
  }
  
  //function to navigate to registration page
  moveToRegister() : void {
    this.router.navigate(['/registration']);
  }

  //function to check if user is an admin
  isAdmin(): boolean {
    {
         if (this.cognitoService.admin()) {
           return true;
       } else {
           return false;
        }
       }
  }

  showPassword() : void { 
   "user.showPassword = !user.showPassword"
  }


}


