import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { BookingServiceService, Room, Desk} from '../../services/booking-service.service';

@Component({
  selector: 'office-booker-map-bookings',
  templateUrl: './map-bookings.component.html',
  styleUrls: ['./map-bookings.component.css'],
})
export class MapBookingsComponent{
  desks: Array<Desk> = [];
    roomId = 1;
  constructor(private bookingService: BookingServiceService, private changeDetection: ChangeDetectorRef) { 
    changeDetection.detach();
  }
  ngOnInit() {
    this.getDesksByRoomId(1);
    this.changeDetection.detectChanges();
  }

  getDesksByRoomId(roomId: number){
    this.bookingService.getDesksByRoomId(roomId).subscribe(res => {
      res.forEach(desk => {
        const newDesk = {} as Desk;
        newDesk.id = desk.id;
        newDesk.LocationCol = desk.LocationCol;
        newDesk.LocationRow = desk.LocationRow;
        newDesk.roomId = desk.roomId;
        this.getBookingsByDeskId(desk.id);

        this.desks.push(newDesk);
        
        console.log(this.desks);
        this.changeDetection.detectChanges();
      });
    })
    
  }

  getBookingsByDeskId(deskId: number) {
    let bookingReturn = false;
       this.bookingService.getBookingsByDeskId(deskId).subscribe(res => {
         res.forEach(booking => {
           if(booking){
            bookingReturn = true;
           }
           for(let i = 0; i < this.desks.length; i++)
           {
             if(this.desks[i].id == deskId){
               this.desks[i].booking = bookingReturn;
             }
           }
          this.changeDetection.detectChanges();
         });
       })
     }



 //gridLayout: Array<Array<object>>[];
//  roomName: string;
//  rooms: Room[];
//  desks: Desk[];
//  deskGrid: boolean[][];
//  bookedGrid: boolean[][];
//  bookingIDGrid: number[][];
//  constructor(private bookingService: BookingServiceService, public dialog: MatDialog, private changeDetection: ChangeDetectorRef) {
//    changeDetection.detach();
//    this.rooms = [];
//    this.desks = [];
//    this.deskGrid = [];
//    this.bookedGrid = [];
//    this.roomName = "";
//    this.bookingIDGrid = [];
//    // const only_id = this.rooms.at(0).id;
//    // this.getRoomById(only_id);
//    // this.getDesksByRoomId(only_id);

//    // this.generateGrid();
//    // console.log(this.deskGrid);
//  }

//  ngOnInit() {
//    this.generateGrid();
//    this.getRooms();

//    console.log("my rooms are ");
//    console.log(this.rooms);
//    console.log(this.rooms[0]);
//    console.log(this.deskGrid);
//    this.changeDetection.detectChanges();
//  }

//  generateGrid() {
//    for (let i = 0; i < 12; i++) {
//      this.deskGrid.push([]);
//      this.bookedGrid.push([]);
//      this.bookingIDGrid.push([]);
//      for (let j = 0; j < 12; j++) {
//        this.deskGrid[i].push(false);
//        this.bookedGrid[i].push(false);
//        this.bookingIDGrid[i].push(-1);
//      }
//    }
//  }

//  getDeskIdAtLocation(row: number, col: number): number {
//    for (let i = 0; i < this.desks.length; i++) {
//      if (this.desks[i].LocationRow === row && this.desks[i].LocationCol === col) {
//        return this.desks[i].id;
//      }
//    }
//    return -1;
//  }

//  getRooms() {
//    this.bookingService.getAllRooms().subscribe(res => {
//      res.forEach(room => {
//        this.rooms.push(room);
//        this.getDesksByRoomId(room.id);
//      });
//    });
//  }

//  getRoomById(roomId: number) {
//    this.bookingService.getRoomByID(roomId).subscribe(res => {
//      this.roomName = res.name;
//    });
//  }

//  getDesksByRoomId(roomId: number) {
//    this.bookingService.getDesksByRoomId(roomId).subscribe(res => {
//      res.forEach(desk => {
//        this.desks.push(desk);
//        this.deskGrid[desk.LocationRow][desk.LocationCol] = true;
//        this.getBookingsByDeskId(desk.id);
//        this.changeDetection.detectChanges();
//      });
//    })
//  }

//  markBooking(deskId: number): void {
//    for (let i = 0; i < this.desks.length; i++) {
//      if (this.desks[i].id === deskId) {
//        const row = this.desks[i].LocationRow;
//        const col = this.desks[i].LocationCol;
//        this.bookedGrid[row][col] = true;
//      }
//    }
//  }

//  addBooking(deskId: number, bookingId: number): void {
//    for (let i = 0; i < this.desks.length; i++) {
//      if (this.desks[i].id === deskId) {
//        const row = this.desks[i].LocationRow;
//        const col = this.desks[i].LocationCol;
//        this.bookingIDGrid[row][col] = bookingId;
//      }
//    }
//  }

//  removeBooking(deskId: number): void {
//    for (let i = 0; i < this.desks.length; i++) {
//      if (this.desks[i].id === deskId) {
//        const row = this.desks[i].LocationRow;
//        const col = this.desks[i].LocationCol;
//        this.bookingIDGrid[row][col] = -1;
//      }
//    }
//  }

//  getBookingID(deskId: number): number {
//    for (let i = 0; i < this.desks.length; i++) {
//      if (this.desks[i].id === deskId) {
//        const row = this.desks[i].LocationRow;
//        const col = this.desks[i].LocationCol;
//        return this.bookingIDGrid[row][col]
//      }
//    } 
//    return -1;
//  }

//  unMarkBooking(deskId: number): void {
//    for (let i = 0; i < this.desks.length; i++) {
//      if (this.desks[i].id === deskId) {
//        const row = this.desks[i].LocationRow;
//        const col = this.desks[i].LocationCol;
//        this.bookedGrid[row][col] = false;
//      }
//    }
//  }

//  isBooked(deskId: number): boolean {
//    for (let i = 0; i < this.desks.length; i++) {
//      if (this.desks[i].id === deskId) {
//        const row = this.desks[i].LocationRow;
//        const col = this.desks[i].LocationCol;
//        console.log("Found desk")
//        return this.bookedGrid[row][col];
//      }
//    }
//    return false;
//  }


//  getDesks() {
//    this.bookingService.getAllDesks().subscribe(res => {
//      return res;
//    })
//  }

//  getFacilitiesByDeskId(deskId: number) {
//    this.bookingService.getFacilitiesByDeskId(deskId).subscribe(res => {
//      return res;
//    })
//  }

//  getBookingsByDeskId(deskId: number) {
//    this.bookingService.getBookingsByDeskId(deskId).subscribe(res => {
//      res.forEach(booking => {
//        this.markBooking(booking.deskId);
//        console.log("booking exists for desk " + booking.deskId);
//        this.addBooking(booking.deskId, booking.id);
//        this.changeDetection.detectChanges();
//      });
//    })
//  }

//  getBookingByBookingId(bookingId: number) {
//    this.bookingService.getBookingByBookingId(bookingId).subscribe(res => {
//      return res;
//    })
//  }

//  getCurrentBookingByDeskId(deskId: number) {
//    this.bookingService.getCurrentBooking(deskId).subscribe(res => {
//      return res;
//    });
//  }

//  deleteABooking(bookingId: number) {
//    this.bookingService.deleteBooking(bookingId).subscribe(res => {
//      return res;
//    });
//  }

//  makeABooking(deskId: number) {
//    //get the current date time and add 2 hours
//    const today = new Date();
//    today.setHours(today.getHours() + 2);
//    const future = new Date(today.getTime());
//    future.setHours(today.getHours() + 2);

//    const startsAt = today.toISOString();
//    const endsAt = future.toISOString();
//    this.bookingService.createBooking(deskId, startsAt, endsAt).subscribe(booking => {
//      this.addBooking(booking.deskId, booking.id);
//    });
//  }

//  toggleBooking(row: number, col: number): void {
//    const deskId = this.getDeskIdAtLocation(row, col);
//    console.log("Desk clicked " + deskId);
//    if (this.bookedGrid[row][col]) {
//      const bookingId = this.getBookingID(deskId);
//      this.removeBooking(deskId);
//      this.deleteABooking(bookingId);
//    } else {
//      this.makeABooking(deskId);
//    }
//    this.bookedGrid[row][col] = !this.bookedGrid[row][col];
//    this.changeDetection.detectChanges();
//  }

}

//type Desk = {id: number, x: number, y: number, booked:boolean}
