import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { CognitoService } from '../../cognito.service';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'office-booker-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css'],
})
export class SignOutComponent implements OnInit {
  constructor(private router: Router, 
              private cognitoService: CognitoService) {}

  ngOnInit(): void {
    this.cognitoService.signOut();
    this.router.navigate(['login'])
  }
}
