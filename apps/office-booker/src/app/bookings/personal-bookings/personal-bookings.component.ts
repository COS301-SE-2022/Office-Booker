import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { BookingServiceService, Room, Desk, Booking, employee, Invite, rating } from '../../services/booking-service.service';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { NumberFormatStyle } from '@angular/common';
import { variable } from '@angular/compiler/src/output/output_ast';

// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  inviteEmail: string;
}

@Component({
  selector: 'office-booker-personal-bookings',
  templateUrl: './personal-bookings.component.html',
  styleUrls: ['./personal-bookings.component.css'],
})

export class PersonalBookingsComponent {


  inviteEmail: string;

  desks: Array<Desk> = [];
  userBookings: Array<Booking> = [];
  invites: Array<Invite> = [];
  Users: Array<employee> = [];
  employeeName = "";
  userNumb = -1;

  isMeet = false;

  currentUser: employee = { id: -1, email: "null", name: "null", companyId: -1, admin: false, guest: false, currentRating: 0, ratingsReceived: 0 };
  newRating: rating = { currentRating: -1, ratingsReceived: -1 };
  rating = 0;
  // bookingId = -1;

  constructor(private router: Router, private bookingService: BookingServiceService,
    private changeDetection: ChangeDetectorRef, public dialog: MatDialog) {
    this.inviteEmail = "";
    changeDetection.detach();
    //console.log(this.userBookings);a
  }

  openDialog(bookingId: number): void {
    const dialogRef = this.dialog.open(InviteDialogComponent, {
      width: '550px',
      data: { inviteEmail: this.inviteEmail }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.inviteEmail = result;
      // console.log(this.inviteEmail);
      this.inviteOthers(bookingId);
    });



  }


  ngOnInit() {
    this.getDesksByRoomId(1);
    this.getCurrentUser();

  }

  getUsers() {
    this.bookingService.getAllEmployees().subscribe(res => {
      res.forEach(user => {
        this.Users.push(user);
        this.changeDetection.detectChanges();
        if (this.Users.length == 3) {
          this.getCurrentUser();
          this.changeDetection.detectChanges();
        }
      });
    })
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
        this.changeDetection.detectChanges();
      });
    })

  }

  getBookingsByDeskId(deskId: number) {
    let bookingReturn = false;

    this.bookingService.getBookingsByDeskId(this.currentUser.id).subscribe(res => {
      res.forEach(booking => {
        if (booking) {
          bookingReturn = true;
        }
        for (let i = 0; i < this.desks.length; i++) {
          if (this.desks[i].id == deskId) {
            this.desks[i].booking = bookingReturn;
            this.desks[i].bookings.push(booking);
          }
        }
        this.changeDetection.detectChanges();
      });
    })
  }

  getBookings(userId: number) {
    this.userBookings = [];
    this.bookingService.getBookingByEmployee(userId).subscribe(res => {
      res.forEach(booking => {
        const newBooking = {} as Booking;
        newBooking.id = booking.id;
        newBooking.deskId = booking.deskId;
        newBooking.startsAt = booking.startsAt;
        newBooking.endsAt = booking.endsAt;
        newBooking.employeeId = booking.employeeId;
        newBooking.desk = booking.desk;
        

        this.userBookings.push(newBooking);
        this.changeDetection.detectChanges();

      });
      this.changeDetection.detectChanges();
    })

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

  getDeskIdOfInvite(inviteId: number) : number {
  
    for (let i = 0; i < this.invites.length; i++) {
      // console.log(i)
      if (this.invites[i].id == inviteId) {
        console.log(this.invites[i].id);
        console.log(this.invites[i].Booking)
        return this.invites[i].Booking.deskId;
      }
    }

    return 0;
  }

  getCurrentUser() {
    const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
    this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
      this.currentUser = res;
      this.userNumb = this.currentUser.id;
      this.getRating();
      this.getBookings(this.currentUser.id);
      this.getInvites(this.currentUser.id);
      this.changeDetection.detectChanges();


    })
  }

  getRating() {
    this.bookingService.getRatings(this.currentUser.id).subscribe(res => {
      this.newRating = res;
      this.rating = this.newRating.currentRating / (this.newRating.ratingsReceived);
    });
  }


  deleteADeskBooking(bookingId: number) {
    this.bookingService.deleteBooking(bookingId).subscribe(res => {
      return res;
    });
    this.userBookings.forEach(user => {
      for (let d = 0; d < this.userBookings.length; d++) {
        if (this.userBookings[d].id == bookingId) {
          this.userBookings.splice(d, 1);
        }
      }
      this.changeDetection.detectChanges();
    });

  }



  //functions for invites

  inviteOthers(bookingId: number) {
    this.bookingService.createInvite(bookingId, this.inviteEmail).subscribe(res => {
      // console.log(res);
      // console.log(bookingId);
    });

  }

  acceptInvite(inviteId: number) {

    this.bookingService.acceptInvite(inviteId).subscribe(res => {
      res;
    });
    for (let i = 0; i < this.invites.length; i++) {
      if (this.invites[i].id == inviteId) {
        this.invites.splice(i, 1);
      }
    }
    // this.getBookings(this.currentUser.id);
    // location.reload();
    setTimeout(() => { this.getBookings(this.currentUser.id); }, 500);
    this.changeDetection.detectChanges();

  }

  declineInvite(inviteId: number) {

    this.bookingService.declineInvite(inviteId).subscribe(res => {
      res;
    });
    for (let i = 0; i < this.invites.length; i++) {
      if (this.invites[i].id == inviteId) {
        this.invites.splice(i, 1);
      }
    }
    // this.getBookings(this.currentUser.id);
    // location.reload();
    setTimeout(() => { this.getBookings(this.currentUser.id); }, 500);
    this.changeDetection.detectChanges();

  }

  getInvites(userId: number) {
    this.bookingService.getInvitesForUser(userId).subscribe(res => {
      res.forEach((Invite) => {
        console.log(Invite);
        this.invites.push(Invite);
        this.changeDetection.detectChanges();
      });
      this.changeDetection.detectChanges();
    })
  }




}