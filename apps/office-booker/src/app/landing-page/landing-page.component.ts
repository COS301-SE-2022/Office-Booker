import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'office-booker-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  constructor(private router: Router,) {
    //
  }


  navigateToLogin() : void {
    this.router.navigate(['/login']);
  }
}
