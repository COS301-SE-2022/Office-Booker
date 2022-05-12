import { keyframes } from '@angular/animations';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { BookingServiceService } from '../services/booking-service.service';

@Component({
  selector: 'office-booker-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})

export class BookingsComponent{
  //gridLayout: Array<Array<object>>[];
  rooms: object[];
  //roomName: string;
  constructor(private bookingService: BookingServiceService, public dialog: MatDialog) {
    //this.gridLayout = [];
    this.rooms = [];
    console.log(this.showRooms());
    //console.log(this.showRoomById(1));
    //this.roomName = this.showRoomById(1);
  }

 

  showRooms() {
    this.bookingService.getAllRooms().subscribe(res => {
      return res;
    })
  }

  showRoomById(roomId: number) {
    this.bookingService.getRoomByID(roomId).subscribe(res => {
      console.log(res);
    })
  }

  getDesksByRoomId(roomId: number) {
    this.bookingService.getDesksByRoomId(roomId).subscribe(res => {
      return res;
    })
  }

  showDesks() {
    this.bookingService.getAllDesks().subscribe(res => {
      return res;
    })
  }

  getFacilitiesByDeskId(deskId: number) {
    this.bookingService.getFacilitiesByDeskId(deskId).subscribe(res => {
      return res;
    })
  }

  getBookingsByDeskId(deskId: number) {
    this.bookingService.getBookingsByDeskId(deskId).subscribe(res => {
      return res;
    })
  }

  getBookingByBookingId(bookingId: number) {
    this.bookingService.getBookingByBookingId(bookingId).subscribe(res => {
      return res;
    })
  }

  getCurrentBookingByDeskId(deskId: number) {
    this.bookingService.getCurrentBooking(deskId).subscribe(res => {
      return res;
    })
  }

  openDialog($event: any): void {
    console.log($event.currentTarget.id);
    this.dialog.open(BookingDialogComponent, {data: {deskId: $event.currentTarget.id}});
  }
}