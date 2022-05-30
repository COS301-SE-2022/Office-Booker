import { Component, Input } from '@angular/core';


@Component({
  selector: 'office-booker-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css'],
})
export class BookingCardComponent{
  @Input() booking = {  }
  constructor() {
  //
  }

}
