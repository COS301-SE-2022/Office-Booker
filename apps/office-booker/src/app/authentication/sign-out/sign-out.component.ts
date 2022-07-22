import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { CognitoService } from '../../cognito.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuBarComponent } from '../../shared/menu-bar/menu-bar.component';

@Component({
  selector: 'office-booker-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css'],
})
export class SignOutComponent implements OnInit {
  constructor(private router: Router, 
              private cognitoService: CognitoService,
              ) {}

  ngOnInit(): void {
    this.cognitoService.signOut();
    this.cognitoService.setAuthenticated(false);
    this.cognitoService.setAdmin(false);
    this.cognitoService.setGuest(true);
      
    //const comp = new MenuBarComponent(this.app, this.cognitoService);
    //comp.ngOnInit();
    this.router.navigate(['login'])
  }
}
