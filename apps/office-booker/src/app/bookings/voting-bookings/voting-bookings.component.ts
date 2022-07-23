import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { MatSliderModule } from '@angular/material/slider'; 
import { BookingServiceService, Room, Desk, Booking, employee} from '../../services/booking-service.service';

@Component({
  selector: 'office-booker-voting-bookings',
  templateUrl: './voting-bookings.component.html',
  styleUrls: ['./voting-bookings.component.css'],
})
export class VotingBookingsComponent{
  desks: Array<Desk> = [];
  userBookings: Array<Booking> = [];
  rateBookings: Array<Booking> = [];
  Users: Array<employee> = [];
  employeeName = "";
  userNumb = -1;
  currentUser: employee = {id:-1, email:"null", name: "null", companyId:-1, admin: false, guest: false};
  clicked = false;
  

  constructor(private router: Router, private bookingService: BookingServiceService, private changeDetection: ChangeDetectorRef) {
    //changeDetection.detach();
  }

  ngOnInit(){
    this.getDesksByRoomId(1);
    this.getCurrentUser();
  }
  
  getScore(score: number){

    console.log(score);

  }

  getUsers(){
    this.bookingService.getAllEmployees().subscribe( res => {
      res.forEach(user => {
        if(user.id != this.currentUser.id){
        this.Users.push(user);
        this.getBookings(user.id, user.name);
        //this.changeDetection.detectChanges();
      }
      });
    })
  }


  getDesksByRoomId(roomId: number){
    this.bookingService.getDesksByRoomId(roomId).subscribe(res => {
      res.forEach(desk => {
        const newDesk = {} as Desk;
        newDesk.id = desk.id;
        newDesk.LocationCol = desk.LocationCol;
        newDesk.LocationRow = desk.LocationRow;
        newDesk.roomId = desk.roomId;
        newDesk.bookings = [];
        this.getBookingsByDeskId(desk.id);

        this.desks.push(newDesk);
        //this.changeDetection.detectChanges();
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

  getBookings(userId: number, name: string){

    this.bookingService.getBookingByEmployee(userId).subscribe(res => {
       res.forEach(booking => {
        const compareDate = new Date();
        const bookingDate = new Date(booking.endsAt);
         if(compareDate.setHours(0, 0, 0, 0) == bookingDate.setHours(0, 0, 0, 0)){
         const newBooking = {} as Booking;
         newBooking.id = booking.id;
         newBooking.deskId = booking.deskId;
         newBooking.startsAt = booking.startsAt;
         newBooking.endsAt = booking.endsAt;
         newBooking.employeeId = booking.employeeId;
         newBooking.employeeName = name;
         this.userBookings.push(newBooking);
         //this.changeDetection.detectChanges();
         }
        });
        //this.changeDetection.detectChanges();
      })   
 }


 getCurrentUser(){
   const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
   this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
      this.currentUser = res;
      this.userNumb = this.currentUser.id;
       this.getUsers();
   }) 
}

  
}
