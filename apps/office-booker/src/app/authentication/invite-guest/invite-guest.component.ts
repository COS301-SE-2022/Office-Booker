import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from '@nestjs/common';
import { CognitoService } from '../../cognito.service';
import { BookingServiceService, employee, company } from '../../services/booking-service.service';

import { PopupDialogService } from '../../shared/popup-dialog/popup-dialog.service';

@Component({
  selector: 'office-booker-invite-guest',
  templateUrl: './invite-guest.component.html',
  styleUrls: ['./invite-guest.component.css'],
})


export class InviteGuestComponent /*implements OnInit*/ {
  email: string;
  company: string;
  loading: boolean;
  option = {
      title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
      message: 'CONFIRM.DOWNLOAD.JOB.MESSAGE',
      cancelText: 'CONFIRM.DOWNLOAD.JOB.CANCELTEXT',
      confirmText: 'CONFIRM.DOWNLOAD.JOB.CONFIRMTEXT'
    };
  constructor(
    private router: Router,
    private bookingService: BookingServiceService,
    private cognitoService: CognitoService,
    private popupDialogService: PopupDialogService,
  ) {
    this.option = {
      title: 'You have successfully invited a guest!',
      message: '',
      cancelText: 'Close',
      confirmText: 'Ok'
    };
    this.email = "";
    this.company = "";
    this.loading = false;
    // this.dialogService.open(options);

  }

  /*ngOnInit(): void {}*/
  public invite(): void {
    console.log("Email before it checks: " + this.email);
    if (this.email == ""){ //if email is empty, show error popup
      this.option.title = "Please enter an email address";
      this.option.message = "";
      this.option.cancelText = "Close";
      this.option.confirmText = "Ok"
    } 
    else { //if email is not empty, create user
      this.option.message = this.email;

      this.cognitoService.getCompany();
      const thisCompany = this.cognitoService.returnCompanyID();
      this.bookingService.createUser(this.email, thisCompany, this.email, true).subscribe(res => { 
        return res; 
      });
      console.log("User created!")
    }

    this.popupDialogService.open(this.option);

    

  }
}
