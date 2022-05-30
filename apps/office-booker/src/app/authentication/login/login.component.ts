import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'office-booker-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent /*implements OnInit*/ {
  constructor
  (private router: Router,) {
  }
      


  
  //ngOnInit(): void {}
  moveToRegister() : void {
    console.log("Hi")

    this.router.navigate(['/registration']);

  }



}
