import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';

@Component({
  selector: 'office-booker-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent{

  constructor(public dialog: MatDialog) {}

  //ngOnInit(): void { }

  openDialog($event: any): void {
    console.log($event.currentTarget.id);
    this.dialog.open(BookingDialogComponent, {data: {deskId: $event.currentTarget.id}});
  }
}
