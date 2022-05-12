import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { BookingServiceService, Room, Desk } from '../services/booking-service.service';


@Component({
  selector: 'office-booker-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent{
  //gridLayout: Array<Array<object>>[];
  roomName: string;
  rooms: Room[];
  desks: Desk[];
  constructor(private bookingService: BookingServiceService, public dialog: MatDialog) {
    this.rooms = [];
    this.desks = [];
    this.roomName = "";
    this.getRooms();
    this.getRoomById(1);
    this.getDesksByRoomId(1);
  }

  generateGrid() {
    const el = '<mat-grid-tile></mat-grid-tile>'
    for(let i = 0; i < 12; i++){
      for(let j = 0; j < 12; j++){
        this.desks.forEach(desk => {
          if(desk.LocationRow == i && desk.LocationCol == j){
            //
          }
        });
      }
    }
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
       this.roomName = res.name;
    });
  }

  getDesksByRoomId(roomId: number) {
    this.bookingService.getDesksByRoomId(roomId).subscribe(res => {
      res.forEach(desk => {
        this.desks.push(desk);
      });
    })
  }

  getDesks() {
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