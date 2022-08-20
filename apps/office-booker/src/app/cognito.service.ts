import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Amplify, { Auth } from 'aws-amplify';

import { environment } from '../environments/environment';
import { BookingServiceService } from './services/booking-service.service';

export interface IUser {
  username: string
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  company: string;
  companyID: number;
  isAuthenticate: boolean;
  isAdmin: boolean;
  isGuest: boolean;
  private authenticationSubject: BehaviorSubject<any>;

  isLoggedIn = false;
  code = "";


  constructor(private bookingService: BookingServiceService) {
    Amplify.configure({
      Auth: environment.cognito,
    });
    this.company = "";
    this.companyID = 0;
    this.isAuthenticate = false;
    this.isAuthenticated();
    this.isAdmin = false;
    this.hasAdmin();
    this.isGuest = true;
    this.hasGuest();
  

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email,
      }
    });


  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
      .then(() => {
        this.hasGuest();
        this.authenticationSubject.next(true);
      });
  }


  //function to sign a user out of cognito
  public signOut(): Promise<any> {
    //alert('Sign out');
    this.setGuest(false);

    return Auth.signOut()
      .then(() => {
        this.authenticationSubject.next(false);
        //alert("Suc sign out")
      });
  }

  public isAuthenticated(): void {
    if ((localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"))) {
      this.isAuthenticate = true;
      // console.log("isAuthenticated: " + this.isAuthenticate);

    }
    else
    {
      this.isAuthenticate = false;
      // console.log("isAuthenticated: " + this.isAuthenticate);
    }
  }

  public isAuthenticatedCheck(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        }).catch(() => {
          return false;
        });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
      .then((cognitoUser: any) => {
        return Auth.updateUserAttributes(cognitoUser, user);
      });
  }

  public getEmail(): Promise<string> {
    return Auth.currentUserInfo();
  }

  public getEmailAddress(): string {
    const length = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser")).length;
    // console.log(JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser")));
    const userData = (JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"))).substring(1, length - 1);
    return userData;
  }

  public hasAdmin() : void {
    const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
    if (userData != "null") {
      this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
        this.isAdmin = res.admin;
        console.log("hasAdmin: " + this.isAdmin);
      })
  }

  }

  public hasGuest() : void {
    const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
    if (userData != "null") {
      this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
        this.isGuest = res.guest;
      })
    }

    console.log("Guest: " + this.isGuest);

  }  

  public admin(): boolean {
    // this.hasAdmin();
    return this.isAdmin;
  }

  public guest(): boolean {
    return this.isGuest;

  }

  public authenticated(): boolean {
    return this.isAuthenticate;
  }

  public setAdmin(value: boolean): void {
    this.isAdmin = value;
  }

  public setGuest(value: boolean): void {
    this.isGuest = value;
  }

  public setAuthenticated(value: boolean): void {
    this.isAuthenticate = value;
  }

  public getCompany(): void {
    const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
    this.bookingService.getCompanyIdByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
      // console.log(res.companyId);
      this.companyID = res.companyId;
      this.bookingService.getCompanyByID(res.companyId).subscribe(res2 => {
        // console.log(res2.name);
      })
    })
  }

  public returnCompany(): string {
    console.log(this.company);
    return this.company;
  }

  public returnCompanyID(): number{
    return this.companyID;
  }

  //deletes user from Cognito User Pool
  public deleteUser(): void {
    Auth.deleteUser();
  }
  
  public submitPasswordReset(): void {
    Auth.forgotPasswordSubmit(this.getEmail, this.code, this.newPassword);
  }

  public resetPassword(email : string) : void {
    Auth.forgotPassword(email);
  }

  public loggedIn() : boolean {
    this.isAuthenticated();
    // console.log(this.authenticated())
    return this.authenticated();
  }

}