import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'office-booker-personal-bookings',
  templateUrl: './personal-bookings.component.html',
  styleUrls: ['./personal-bookings.component.css'],
})
export class PersonalBookingsComponent{
  constructor(private router: Router,) {
    //
  }

}
