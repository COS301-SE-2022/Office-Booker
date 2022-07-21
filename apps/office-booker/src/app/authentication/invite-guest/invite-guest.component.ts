import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../../cognito.service';
import { BookingServiceService, employee, company } from '../../services/booking-service.service';

@Component({
  selector: 'office-booker-invite-guest',
  templateUrl: './invite-guest.component.html',
  styleUrls: ['./invite-guest.component.css'],
})
export class InviteGuestComponent /*implements OnInit*/ {
  email: string;
  company: string;
  loading: boolean;
  constructor(
    private router: Router,
    private bookingService: BookingServiceService,
    private cognitoService: CognitoService,
  ) {
    this.email = "";
    this.company = "";
    this.loading = false;
  }

  /*ngOnInit(): void {}*/
  public invite(): void {
    console.log(this.email);
    this.cognitoService.getCompany();
    const thisCompany = this.cognitoService.returnCompanyID();
    this.bookingService.createUser(this.email, thisCompany, this.email, true).subscribe(res => { 
      return res; 
    });
    console.log("User created!")
  }
}
