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

  isAuthenticate: boolean;
  isAdmin: boolean;
  private authenticationSubject: BehaviorSubject<any>;



  constructor(private bookingService: BookingServiceService) {
    Amplify.configure({
      Auth: environment.cognito,
    });
    this.isAuthenticate = false;
    this.isAdmin = false;
    

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    //alert(user.email)
    //alert(user.password)
    //alert(user.name)
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
        this.authenticationSubject.next(true);
      });
  }


  //function to sign a user out of cognito
  public signOut(): Promise<any> {
    //alert('Sign out');

    return Auth.signOut()
      .then(() => {
        this.authenticationSubject.next(false);
        //alert("Suc sign out")
      });
  }

  public isAuthenticated(): void {
    if ( (localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser")) )
    {
      this.isAuthenticate = true;

    }
    else
      this.isAuthenticate = false;
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

  public hasAdmin() : void {
    const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));

    this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
      this.isAdmin = res.admin;
   }) 
  
  }

  public admin(): boolean {
    return this.isAdmin;
  }

  public authenticated(): boolean {
    return this.isAuthenticate;
  }

  public setAdmin(value : boolean): void { 
    this.isAdmin = value;
  }

  public setAuthenticated(value : boolean): void {
    this.isAuthenticate = value;
  }
  

}