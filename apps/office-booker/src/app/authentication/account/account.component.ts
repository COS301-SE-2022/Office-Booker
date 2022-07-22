import { Component, OnInit } from '@angular/core';
import { IUser, CognitoService } from '../../cognito.service';

@Component({
  selector: 'office-booker-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  user: IUser;

  constructor(private cognitoService: CognitoService) {

    this.user = {} as IUser;
  }

  // ngOnInit(): void {
  //   // this.forgotPassword();

  // }



  public forgotPassword(): void {
    alert(this.user.email);
    this.cognitoService.resetPassword(this.user.email);
    // this.cognitoService.forgotPassword();
  }

}
