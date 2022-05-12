import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { BookingServiceService } from '../services/booking-service.service';

@Component({
  selector: 'office-booker-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})

export class BookingsComponent {
  constructor(private bookingService: BookingServiceService, public dialog: MatDialog) {
    this.showRooms();
  }

  //ngOnInit(): void { }

  showRooms() {
    this.bookingService.getAllRooms().subscribe(res => {
      console.log(res);
      })
  }

  openDialog($event: any): void {
    console.log($event.currentTarget.id);
    this.dialog.open(BookingDialogComponent, {data: {deskId: $event.currentTarget.id}});
  }
}