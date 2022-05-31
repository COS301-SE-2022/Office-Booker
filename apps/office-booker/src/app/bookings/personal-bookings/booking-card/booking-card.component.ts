import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'office-booker-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.css'],
})
export class BookingCardComponent{
 // @Input() booking = {startDate: null, endDate: null, roomName: null, employee: null, desk: null}
 @Input() booking: { startDate: Date; endDate: Date; roomName: string; employee: string; desk: string; } = {startDate: new Date(), endDate: new Date(), roomName: "", employee: "", desk: ""};

  constructor() {
  //
  //console.log(this.booking);
  }


}
