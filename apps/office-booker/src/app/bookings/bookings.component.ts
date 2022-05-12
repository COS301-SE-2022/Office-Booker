import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { BookingServiceService, Room } from '../services/booking-service.service';


@Component({
  selector: 'office-booker-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent{
  //gridLayout: Array<Array<object>>[];
  //roomName: string;
  rooms: Room[];
  constructor(private bookingService: BookingServiceService, public dialog: MatDialog) {
    this.rooms = [];
    this.getRooms();
    console.log(this.rooms);
    //this.gridLayout = [];
    //console.log(this.showRoomById(1));
    //this.roomName = this.showRoomById(1);
  }


  getRooms() {
    this.bookingService.getAllRooms().subscribe(res => {
      res.forEach(room => {
        this.rooms.push(room);
      });
    })
  }

  getRoomById(roomId: number) {
    this.bookingService.getRoomByID(roomId).subscribe(res => {
      return res;
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