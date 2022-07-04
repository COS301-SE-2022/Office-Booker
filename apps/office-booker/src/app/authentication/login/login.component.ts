import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component'

import { IUser, CognitoService } from '../../cognito.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'office-booker-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loading: boolean;
  user: IUser;

  constructor(private router: Router,
              private cognitoService: CognitoService,
              ) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService.signIn(this.user)
    .then(() => {
      //console.log("Sign in fucntion sets permissions")
      this.cognitoService.setAuthenticated(true);
      this.cognitoService.hasAdmin();
      
      //const comp = new MenuBarComponent(this.app, this.cognitoService);
      //comp.ngOnInit();


      this.router.navigate(['/personal-bookings']);
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


