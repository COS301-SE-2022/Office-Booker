import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from '../../cognito.service';
import { BookingServiceService, employee, company } from '../../services/booking-service.service';
import { MailService } from '@office-booker/api/mail';

@Component({
  selector: 'office-booker-invite-guest',
  templateUrl: './invite-guest.component.html',
  styleUrls: ['./invite-guest.component.css'],
})
export class InviteGuestComponent /*implements OnInit*/ {
  email: string;
  company: string;
  loading: boolean;
  exists: boolean;
  constructor(
    private router: Router,
    private bookingService: BookingServiceService,
    private cognitoService: CognitoService,
  ) {
    this.email = "";
    this.company = "";
    this.loading = false;
    this.exists = false;
  }

  /*ngOnInit(): void {}*/
  public invite(): void {
    console.log(this.email);
    this.cognitoService.getCompany();
    const thisCompany = this.cognitoService.returnCompanyID();
    this.bookingService.getEmployeeByEmail(this.email).subscribe(res => {
      console.log(res);
      if (res) {
        console.log("User is already on the system");
        alert("User is already on the system");
      } else {
        this.bookingService.createUser(this.email, thisCompany, this.email, true).subscribe(data => {
          console.log("User created!");
          alert("User created!");
          return data;
        });
      }
    });


  }
}
