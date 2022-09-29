import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from '@nestjs/common';
import { throws } from 'assert';
import { CognitoService } from '../../cognito.service';
import { BookingServiceService, employee, company } from '../../services/booking-service.service';
import { MailService } from '@office-booker/api/mail';

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

  exists: boolean;
  beenRun: boolean;

  constructor(
    private router: Router,
    private bookingService: BookingServiceService,
    private cognitoService: CognitoService,
    private popupDialogService: PopupDialogService,
    private mailService: MailService
  ) {
    this.option = {
      title: '',
      message: '',
      cancelText: 'Ok',
      confirmText: ''
    };

    this.email = "";
    this.company = "";
    this.loading = false;
    this.beenRun = false;
    this.exists = false;
  }

  /*ngOnInit(): void {}*/

  public invite(): void {

    if (this.validateEmail(this.email)) {
      this.beenRun = true;
      this.option.title = "This user has already been invited!";
      this.option.message = this.email;

      this.cognitoService.getCompany();
      const thisCompany = this.cognitoService.returnCompanyID();

      this.bookingService.getEmployeeByEmail(this.email).subscribe(res => {
        if (res) {
          this.exists = true;
        }
        else {
          this.bookingService.createUser(this.email, thisCompany, this.email, true).subscribe(data => {
            this.exists = false;
            return data;
          });
        }
      });
      //return


      if (this.email == "") { //if email is empty, show error popup
        this.option.title = "Error";
        this.option.message = "Please enter an email address";
        this.popupDialogService.open(this.option);
      }
      else { //if email is not empty, create user
        this.option.title = "This user has already been invited!";
        this.option.message = this.email;

        this.cognitoService.getCompany();
        const thisCompany = this.cognitoService.returnCompanyID();

        this.bookingService.getEmployeeByEmail(this.email).subscribe(res => {
          if (res) {
            this.exists = true;
            this.option.title = "This user has already been invited!";
            this.option.message = this.email;
            this.popupDialogService.open(this.option);
          }
          else {
            this.bookingService.createUser(this.email, thisCompany, this.email, true).subscribe(data => {
              this.exists = false;
              this.mailService.sendUserConfirmation(this.email);
              this.option.title = "You have successfully invited";
              this.option.message = this.email;
              this.popupDialogService.open(this.option);
              // return data;
            });
          }
        });

        /*if (this.exists == false){
          this.option.title = "You have successfully invited";
          this.option.message = this.email;
        }
        else if (this.exists == true){
          this.option.title = "This user has already been invited!";
          this.option.message = this.email;
        }*/

      }
    } else {
      this.option.title = "Invalid email";
      this.option.message = this.email;
      this.popupDialogService.open(this.option);
    }


  }

  public validateEmail(email: string): boolean {
    const regexEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; // eslint-disable-line no-useless-escape
    if (email.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }

}
