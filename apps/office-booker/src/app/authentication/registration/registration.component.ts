import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserServiceService, User } from '../../services/user-service.service';


import { IUser, CognitoService } from '../../cognito.service';

@Component({
  selector: 'office-booker-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {

  loading: boolean;
  isConfirm: boolean;
  user: IUser;
  userId : string;

  constructor(private router: Router,
    private cognitoService: CognitoService, 
    private userService: UserServiceService) {
  this.loading = false;
  this.isConfirm = false;
  this.user = {} as IUser;
  this.userId = '';
}

public signUp(): void {
  this.loading = true;
  
  this.cognitoService.signUp(this.user)

  .then(() => {
    alert("worked")
  this.loading = false;
  this.isConfirm = true;
  

  }).catch((e) => {
    alert(e)
  this.loading = false;
  });
}

public confirmSignUp(): void {
  alert("Entered confirmSignUp")
  this.loading = true;
  this.cognitoService.confirmSignUp(this.user)
  .then(() => {
    this.userId = user
    this.userService.createUser(deskId, startsAt, endsAt).subscribe(user => {
      this.addBooking(booking.deskId, booking.id);
    });
  this.router.navigate(['/login']);
  }).catch((e) => {
    alert(e)
  this.loading = false;
  this.router.navigate(['/login'])
  });
}

}