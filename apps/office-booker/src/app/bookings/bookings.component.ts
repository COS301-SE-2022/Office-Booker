import { Component, OnInit } from '@angular/core';
import { BookingServiceService } from '../services/booking-service.service';
@Component({
  selector: 'office-booker-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent{
  constructor(private bookingService: BookingServiceService) {
    this.showRooms();
  }

  //ngOnInit(): void { }

  showRooms() {
    this.bookingService.getAllRooms().subscribe(res => {
      console.log(res);
      })
    
  }
}
