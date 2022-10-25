import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookingServiceService, Desk, rating, Employee, Booking } from '../../services/booking-service.service';

@Component({
  selector: 'office-booker-voting-bookings',
  templateUrl: './voting-bookings.component.html',
  styleUrls: ['./voting-bookings.component.css'],
})
export class VotingBookingsComponent {
  desks: Array<Desk> = [];
  userBookings: Array<Booking> = [];
  employeeName = "";
  userNumb = -1;
  currentUser: Employee = { id: -1, email: "null", name: "null", companyId: -1, admin: false, guest: false, currentRating: 0, ratingsReceived: 0 };
  rateUser: rating = { currentRating: -1, ratingsReceived: -1 };
  clicked = false;



  constructor(private router: Router, private bookingService: BookingServiceService, private changeDetection: ChangeDetectorRef, public snackBar: MatSnackBar) {
   
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getScore(scoreToBeAdded: number, bookingId: number) {
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
      this.userBookings = this.userBookings.filter(booking => booking.id != bookingId);
      this.changeDetection.detectChanges();
    });
    return true;
  }

  getBookings(userId: number) {
    this.userBookings.splice(0);
    this.bookingService.getBookingsAllowedToVote(userId).subscribe(res => {
      res.forEach(booking => {
        const compareDate = new Date();
        const bookingDate = new Date(booking.endsAt);
        bookingDate.setHours(bookingDate.getHours() - 2);

        const sameDay = (d1: Date, d2: Date) => {
          return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
          );
        };
        if (sameDay(compareDate, bookingDate)) {
          const newBooking = {} as Booking;
          newBooking.id = booking.id;
          newBooking.deskId = booking.deskId;
          newBooking.startsAt = booking.startsAt;
          newBooking.endsAt = booking.endsAt;
          newBooking.employeeId = booking.employeeId;
          newBooking.Employee = booking.Employee;
          this.userBookings.push(newBooking);
          this.changeDetection.detectChanges();
        }
      });
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
