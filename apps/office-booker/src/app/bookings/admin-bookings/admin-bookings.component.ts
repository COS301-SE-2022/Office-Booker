import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { BookingServiceService, Room, Desk, Booking, employee, rating} from '../../services/booking-service.service';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { CognitoService } from '../../cognito.service';

@Component({
  selector: 'office-booker-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css'],
})
export class AdminBookingsComponent{
  desks: Array<Desk> = [];
  userBookings: Array<Booking> = [];
  Users: Array<employee> = [];
  Domains: Array<string> = [];
  employeeName = "";
  userNumb = -1;
  currentUser: employee = {id:-1, email:"null", name: "null", companyId:-1, admin: false, guest : false, currentRating: 0, ratingsReceived: 0};
  newRating: rating = {currentRating: -1, ratingsReceived: -1};
  rating = 0;
  isMeet = false;
  filter = "bookings";
  settingsFilter = "none";
  companyId = 0;


  constructor(private router: Router, private bookingService: BookingServiceService, 
    public snackBar: MatSnackBar, private changeDetection: ChangeDetectorRef, private cognitoService: CognitoService) {
  }

  ngOnInit(){
    this.getDesksByRoomId(1);
    this.getUsers();
  }

  openDeleteSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 5000,
      panelClass: "fail-snack",
    });
  }
  
  getUsers(){
    this.Users.splice(0, this.Users.length);
    this.cognitoService.getCompany();
    this.companyId = this.cognitoService.returnCompanyID();
    this.bookingService.getAllEmployeesByCompany(this.companyId).subscribe( res => {
      res.forEach(employee => {
        this.Users.push(employee);
      
      });
    })
    this.bookingService.getCompanyByID(this.companyId).subscribe(res => {
      this.Domains = res.domain;
    });
    this.changeDetection.detectChanges();
    this.getBookings(this.currentUser.id, this.currentUser.name);
  }

  getRating(employeeRate: number): number{
    let i: number;
    for(i = 0; i < this.Users.length; i++){
    if(this.Users[i].id == employeeRate){
      this.rating = this.Users[i].currentRating/this.Users[i].ratingsReceived;
      
      return this.rating;
    }
    }
    return this.rating;
  }

  getDesksByRoomId(roomId: number) {
    this.bookingService.getDesksByRoomId(roomId).subscribe(res => {
      res.forEach(desk => {
        const newDesk = {} as Desk;
        newDesk.id = desk.id;
        newDesk.LocationCol = desk.LocationCol;
        newDesk.LocationRow = desk.LocationRow;
        newDesk.roomId = desk.roomId;
        newDesk.bookings = [];
        newDesk.isMeetingRoom = desk.isMeetingRoom;
        this.getBookingsByDeskId(desk.id);

        this.desks.push(newDesk);
      });
    })

  }

  getBookingsByDeskId(deskId: number) {
    let bookingReturn = false;
    
    this.bookingService.getBookingsByDeskId(this.currentUser.id).subscribe(res => {
      res.forEach(booking => {
        if(booking){
          bookingReturn = true;
        }
        for(let i = 0; i < this.desks.length; i++)
        {
          if(this.desks[i].id == deskId){
            this.desks[i].booking = bookingReturn;
            this.desks[i].bookings.push(booking);
          }
        }
        //this.changeDetection.detectChanges();
      });
    })
  }

  getBookings(userId: number, userName: string) {
    this.userBookings = [];
    this.bookingService.getAllBookings().subscribe(res => {
      res.forEach(booking => {
        const newBooking = {} as Booking;
        newBooking.employeeName = userName;
        newBooking.id = booking.id;
        newBooking.deskId = booking.deskId;
        newBooking.startsAt = booking.startsAt;
        newBooking.endsAt = booking.endsAt;
        newBooking.employeeId = booking.employeeId;
        newBooking.desk = booking.desk;
        newBooking.isInvited = booking.isInvited;
        // newBooking.Invite = this.invites;
        newBooking.employeeName = this.getEmployeeName(booking.employeeId);

        this.changeDetection.detectChanges();

        this.userBookings.push(newBooking);

        this.changeDetection.detectChanges();

        this.getMeetingRoom(booking.deskId, booking.id);
        // this.getEmployeeName(1);


      });
      this.changeDetection.detectChanges();
    })
  }

  getEmployeeName(employeeId: number) : string {
    for (let i = 0; i < this.Users.length; i++) {
      if (this.Users[i].id == employeeId) {
        return this.Users[i].name;
      }
    }
   return "Error";
  }

  getMeetingRoom(deskId: number, bookingId: number) : void {
    this.desks.forEach(desk => {
      if (desk.id == deskId) {
        for (let i = 0; i < this.userBookings.length; i++){

          if (this.userBookings[i].id == bookingId) {
            this.userBookings[i].isMeetingRoom = desk.isMeetingRoom;
          }
        }
      }
      this.changeDetection.detectChanges();
    });
  }

  isMeetingRoom(deskId: number) : string{
    for (let i = 0; i < this.desks.length; i++) {
      if (this.desks[i].id == deskId) {
        this.isMeet = this.desks[i].isMeetingRoom;
      }
    }

    if (this.isMeet==false){
      return "Desk";

    }
    else if (this.isMeet==true){
      return "Meeting Room";
    }
    return "Error";
  }



 deleteADeskBooking(bookingId: number) {
  this.bookingService.deleteBooking(bookingId).subscribe(res => {
    return res;
  });
  this.userBookings.forEach(user => {
    for(let d = 0; d < this.userBookings.length; d++){
      if(this.userBookings[d].id == bookingId){
        this.userBookings.splice(d,1);
      }
    }
    //this.changeDetection.detectChanges();
  });
  
}


setFilter(filter: string) : void{
  this.getUsers();
  this.filter = filter;
  this.changeDetection.detectChanges();
}

setNgIf(filter: string) : void {
  this.getUsers();
  this.settingsFilter = filter;
  this.changeDetection.detectChanges();
}


}
