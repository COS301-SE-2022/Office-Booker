import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { MatSliderModule } from '@angular/material/slider'; 
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { BookingServiceService, Room, Desk, Booking, employee, rating} from '../../services/booking-service.service';
import { Employee } from '@prisma/client';

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
  currentUser: employee = {id:-1, email:"null", name: "null", companyId:-1, admin: false, guest: false, currentRating: 0, ratingsReceived: 0};
  rateUser: rating = {currentRating: -1, ratingsReceived: -1};
  clicked = false;

  

  constructor(private router: Router, private bookingService: BookingServiceService, private changeDetection: ChangeDetectorRef, public snackBar: MatSnackBar) {
    //changeDetection.detach();
  }

  ngOnInit(){
    this.getDesksByRoomId(1);
    this.getCurrentUser();
  }
  
  getScore(score: number, employeeRate: number){
    let i: number;
    for(i = 0; i < this.Users.length; i++){
    if(this.Users[i].id == employeeRate){
      this.rateUser.currentRating = this.Users[i].currentRating + score;
      this.rateUser.ratingsReceived = this.Users[i].ratingsReceived + 1;
      this.updateUserRatings(employeeRate, this.rateUser);
    }
    } 
  }

  openSnackBar(message: number) {
    this.snackBar.open("Review Made for workspace " + message, "Ok", {
      duration: 5000,
    });
  }
  
  updateUserRatings(user: number, ratings: rating): boolean{ // this function updates the users rating.
    console.log(ratings.ratingsReceived);

    this.bookingService.updateRatings(user, ratings.currentRating, ratings.ratingsReceived).subscribe(stuff => {
      //This API call will update the user with a new rating score and increase their total ratings received by 1.
      
     
    });
    return true;
  }

  getUsers(){ // this gets the users in the database for a specific company.
    this.bookingService.getAllEmployees().subscribe(res => {
      res.forEach(user => {
        if(user.id != this.currentUser.id){ // this makes sure that the current user is not included so they can not rate themselves.
        this.Users.push(user);
        this.getBookings(user.id, user.name);
        }
      })
    });
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


 getCurrentUser(){ //This identifies the current user so that the user can be excluded from ratings to prevent rating yourself.
   const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser")); // this gets the users email from local storage.
   this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {//Uses the email to find the current user and assign them to current user.
      this.currentUser = res;
      this.userNumb = this.currentUser.id;
       this.getUsers(); // this gets the current users.
   }) 
}

  
}
