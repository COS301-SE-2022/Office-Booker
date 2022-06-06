import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@office-booker/api-interfaces';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

import { CognitoService } from './cognito.service';


@Component({
  selector: 'office-booker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent //implements OnInit 
{
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient, 
    private router: Router,
    private cognitoService: CognitoService) 
    {
        alert("AppComponent not authenticated");
        this.isAuthenticated = false;
    }


  isAuthenticated: boolean;

  //public ngOnInit(): void {
    // this.cognitoService.isAuthenticated()
    // .then((success: boolean) => {
    //   alert("AppComponent is authenticated")
    //   this.isAuthenticated = success;

    //});
  //}

  public signOut(): void {
    //alert('does this work?')
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/signIn']);
    });
  }

}



  