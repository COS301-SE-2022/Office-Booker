import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingServiceService, Desk, Booking, employee, rating } from '../../services/booking-service.service';


@Component({
  selector: 'office-booker-voting-bookings',
  templateUrl: './voting-bookings.component.html',
  styleUrls: ['./voting-bookings.component.css'],
})
export class VotingBookingsComponent {
  desks: Array<Desk> = [];
  userBookings: Array<Booking> = [];
  Users: Array<employee> = [];
  employeeName = "";
  userNumb = -1;
  currentUser: employee = { id: -1, email: "null", name: "null", companyId: -1, admin: false, guest: false, currentRating: 0, ratingsReceived: 0 };
  rateUser: rating = { currentRating: -1, ratingsReceived: -1 };
  clicked = false;



  constructor(private router: Router, private bookingService: BookingServiceService, private changeDetection: ChangeDetectorRef, public snackBar: MatSnackBar) {
    changeDetection.detach();
  }

  ngOnInit() {
    // this.getDesksByRoomId(1);
    this.getCurrentUser();
  }

  getScore(scoreToBeAdded: number, bookingId: number) {
    // let i: number;
    // for (i = 0; i < this.Users.length; i++) {
    //   if (this.Users[i].id == employeeRate) {
    //     this.rateUser.currentRating = this.Users[i].currentRating + score;
    //     this.rateUser.ratingsReceived = this.Users[i].ratingsReceived + 1;
    //     this.makeVote(employeeRate, this.rateUser);
    //   }
    // }
    this.makeVote(bookingId, scoreToBeAdded);

  }

  openSnackBar(message: number) {
    this.snackBar.open("Review Made for workspace " + message, "Ok", {
      duration: 5000,
    });
  }

  makeVote(bookingId: number, scoreToBeAdded: number): boolean { // this function updates the users rating.
    this.bookingService.makeVote(bookingId, this.userNumb, scoreToBeAdded).subscribe(stuff => {
      //This API call will update the user with a new rating score and increase their total ratings received by 1.
      //console.log(stuff);
      this.userBookings = this.userBookings.filter(booking => booking.id != bookingId);
      //console.log(this.userBookings);
      this.changeDetection.detectChanges();
    });
    return true;
  }

  // getUsers() { // this gets the users in the database for a specific company.
  //   this.bookingService.getAllEmployees().subscribe(res => {
  //     res.forEach(user => {
  //       if (user.id != this.currentUser.id) { // this makes sure that the current user is not included so they can not rate themselves.
  //         this.Users.push(user);
  //         this.getBookings(user.id, user.name);
  //       }
  //     })
  //   });
  // }


  // getDesksByRoomId(roomId: number) {
  //   this.bookingService.getDesksByRoomId(roomId).subscribe(res => {
  //     res.forEach(desk => {
  //       const newDesk = {} as Desk;
  //       newDesk.id = desk.id;
  //       newDesk.LocationCol = desk.LocationCol;
  //       newDesk.LocationRow = desk.LocationRow;
  //       newDesk.roomId = desk.roomId;
  //       newDesk.bookings = [];
  //       this.getBookingsByDeskId(desk.id);

  //       this.desks.push(newDesk);
  //       //this.changeDetection.detectChanges();
  //     });
  //   })

  // }

  // getBookingsByDeskId(deskId: number) {
  //   let bookingReturn = false;

  //   this.bookingService.getBookingsByDeskId(this.currentUser.id).subscribe(res => {
  //     res.forEach(booking => {
  //       if (booking) {
  //         bookingReturn = true;
  //       }
  //       for (let i = 0; i < this.desks.length; i++) {
  //         if (this.desks[i].id == deskId) {
  //           this.desks[i].booking = bookingReturn;
  //           this.desks[i].bookings.push(booking);
  //         }
  //       }
  //       //this.changeDetection.detectChanges();
  //     });
  //   })
  // }

  getBookings(userId: number) {
    this.userBookings.splice(0);
    this.bookingService.getBookingsAllowedToVote(userId).subscribe(res => {
      res.forEach(booking => {
        //console.log(booking);
        const compareDate = new Date();
        const bookingDate = new Date(booking.endsAt);
        bookingDate.setHours(bookingDate.getHours() - 2);
        // console.log(compareDate);
        // console.log(bookingDate);

        const sameDay = (d1: Date, d2: Date) => {
          return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
          );
        };
        // if (compareDate.setHours(0, 0, 0, 0) == bookingDate.setHours(0, 0, 0, 0)) {
        if (sameDay(compareDate, bookingDate)) {
          // console.log("time verify passed!");
          const newBooking = {} as Booking;
          newBooking.id = booking.id;
          newBooking.deskId = booking.deskId;
          newBooking.startsAt = booking.startsAt;
          newBooking.endsAt = booking.endsAt;
          newBooking.employeeId = booking.employeeId;
          newBooking.employeeName = this.currentUser.name;
          this.userBookings.push(newBooking);
          // console.log("all bookings:" + this.userBookings);
          this.changeDetection.detectChanges();
        }
      });
      //this.changeDetection.detectChanges();
    })
  }


  getCurrentUser() { //This identifies the current user so that the user can be excluded from ratings to prevent rating yourself.
    const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser")); // this gets the users email from local storage.
    this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {//Uses the email to find the current user and assign them to current user.
      this.currentUser = res;
      this.userNumb = this.currentUser.id;
      this.getBookings(this.userNumb); // this gets the current users.
    });
  }


}
