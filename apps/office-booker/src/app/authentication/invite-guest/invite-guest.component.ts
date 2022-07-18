import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingServiceService, employee, company} from '../../services/booking-service.service';

@Component({
  selector: 'office-booker-invite-guest',
  templateUrl: './invite-guest.component.html',
  styleUrls: ['./invite-guest.component.css'],
})
export class InviteGuestComponent /*implements OnInit*/ {
  email: string;
  company: string;
  constructor(
    private router: Router,
  ) {
    this.email = "";
    this.company = "";
  }

  /*ngOnInit(): void {}*/
}
