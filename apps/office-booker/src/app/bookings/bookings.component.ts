import { OnInit, ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { BookingServiceService, Room, Desk, Booking } from '../services/booking-service.service';


@Component({
  selector: 'office-booker-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent {
  //gridLayout: Array<Array<object>>[];
  roomName: string;
  rooms: Room[];
  desks: Desk[];
  deskGrid: boolean[][];
  bookedGrid: boolean[][];
  constructor(private bookingService: BookingServiceService, public dialog: MatDialog, private changeDetection: ChangeDetectorRef) {
    changeDetection.detach();
    this.rooms = [];
    this.desks = [];
    this.deskGrid = [];
    this.bookedGrid = [];
    this.roomName = "";
    // const only_id = this.rooms.at(0).id;
    // this.getRoomById(only_id);
    // this.getDesksByRoomId(only_id);

    // this.generateGrid();
    // console.log(this.deskGrid);
  }

  ngOnInit() {
    this.generateGrid();
    this.getRooms();

    console.log("my rooms are ");
    console.log(this.rooms);
    console.log(this.rooms[0]);
    console.log(this.deskGrid);
    this.changeDetection.detectChanges();
  }

  generateGrid() {
    for (let i = 0; i < 12; i++) {
      this.deskGrid.push([]);
      this.bookedGrid.push([]);
      for (let j = 0; j < 12; j++) {
        this.deskGrid[i].push(false);
        this.bookedGrid[i].push(false);
      }
    }
  }

  getDeskIdAtLocation(row: number, col: number): number {
    for (let i = 0; i < this.desks.length; i++) {
      if (this.desks[i].LocationRow === row && this.desks[i].LocationCol === col) {
        return this.desks[i].id;
      }
    }
    return -1;
  }

  getRooms() {
    this.bookingService.getAllRooms().subscribe(res => {
      res.forEach(room => {
        this.rooms.push(room);
        this.getDesksByRoomId(room.id);
      });
    });
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
        this.deskGrid[desk.LocationRow][desk.LocationCol] = true;
        this.getBookingsByDeskId(desk.id);
        this.changeDetection.detectChanges();
      });
    })
  }

  markBooking(deskId: number): boolean {
    for (let i = 0; i < this.desks.length; i++) {
      if (this.desks[i].id === deskId) {
        const row = this.desks[i].LocationRow;
        const col = this.desks[i].LocationCol;
        this.bookedGrid[row][col] = true;
      }
    }
    return false;
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
      res.forEach(booking => {
        this.markBooking(booking.deskId);
        console.log("booking exists for desk " + booking.deskId);
        this.changeDetection.detectChanges();
      });
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
    this.dialog.open(BookingDialogComponent, { data: { deskId: $event.currentTarget.id } });
  }
}