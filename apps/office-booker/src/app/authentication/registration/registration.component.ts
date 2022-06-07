import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService, employee} from '../../services/booking-service.service';

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
  userName : string;
  companyId : number;

  constructor(private router: Router,
    private cognitoService: CognitoService, 
    private bookingService: BookingServiceService,
    ) {
  this.loading = false;
  this.isConfirm = false;
  this.user = {} as IUser;
  this.userId = '';
  this.userName = '';
  this.companyId = 1;
}

public signUp(): void {
  this.loading = true;
  
  this.cognitoService.signUp(this.user)

  .then(() => {
    
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
    
    this.userId = this.user.email
    this.userName = this.user.name
    this.companyId - this.companyId;
    this.bookingService.createUser(this.userName, this.companyId, this.userId).subscribe(res => {
      return res;
     
    });
    
      
    });
  this.router.navigate(['/login']);

  this.loading = false;
  this.router.navigate(['/login'])
}

}