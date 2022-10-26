import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { BookingServiceService, Room, Desk, Booking, Employee, Invite, rating } from '../../services/booking-service.service';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { NumberFormatStyle } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  inviteEmail: string;
  Invites: Invite[];  
  bookingId : number;
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
  Users: Array<Employee> = [];
  employeeName = "";
  userNumb = -1;

  deskIdInvite = -1;

  toDisplay: string;
  bookingOrInvite: string;

  isMeet = false;

  currentUser: Employee = { id: -1, email: "null", name: "null", companyId: -1, admin: false, guest: false, currentRating: 0, ratingsReceived: 0 };
  newRating: rating = { currentRating: -1, ratingsReceived: -1 };
  rating = 0;
  // bookingId = -1;

  constructor(private router: Router, private bookingService: BookingServiceService,
    private changeDetection: ChangeDetectorRef, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.inviteEmail = "";
    this.toDisplay = "all";
    this.bookingOrInvite = "booking";
    changeDetection.detach();
  }

  openDeleteSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 5000,
      panelClass: "fail-snack",
    });
  }

  openJoinSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 5000,
      panelClass: "success-snack",
    });
  }
  
  openDialog(bookingId: number, Invite: Invite[]): void {
    let canInvite = true;
    this.userBookings.forEach(user => {
      for (let d = 0; d < this.userBookings.length; d++) {
        if (this.userBookings[d].id == bookingId) {
          if (this.userBookings[d].isInvited == true) {
            canInvite = false;
          }
        }
      }
    });
    if (canInvite) {
      const dialogRef = this.dialog.open(InviteDialogComponent, {
        width: '550px',
        data: { inviteEmail: this.inviteEmail ,
                Invites: Invite,
                bookingId: bookingId,
              }
              
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getBookings(this.currentUser.id);
        this.inviteEmail = result;
        if (this.inviteEmail != null) {
          this.inviteOthers(bookingId);
        }
      });

    } else { this.openDeleteSnackBar("You have been invited to this meeting therefore you must contact the booking owner to invite others.") }


  }

  getInvitesByBookingId(bookingId: number) {
    for ( let i=0; i<this.userBookings.length; i++ ) {
      if (this.userBookings[i].id == bookingId) {
        this.invites = this.userBookings[i].Invite;
  }
}
  }
    


  ngOnInit() {
    this.getCurrentUser();
    this.getUsers();

    this.changeDetection.detectChanges();

    this.changeDetection.detectChanges();
  }


  getInvitesForBooking(bookingId : number) { 
    this.bookingService.getInvitesForBooking(bookingId).subscribe(res => { 
      res.forEach(Invite => { 
        let newInvite = {} as Invite;
        for (let i=0; i<this.userBookings.length; i++) {
          if (this.userBookings[i].id == bookingId) {
            for (let j=0; j<this.Users.length; j++) {
              if (this.Users[j].id == Invite.employeeId) {
                newInvite = Invite;
                newInvite.invitedEmail = this.Users[j].email;
              }

            }
            this.userBookings[i].Invite.push(newInvite);
          }
        }
        this.changeDetection.detectChanges();
      });
    })
    this.changeDetection.detectChanges();
  }

  getUsers() {
    this.bookingService.getAllEmployees().subscribe(res => {
      res.forEach(user => {
        this.Users.push(user);
        this.changeDetection.detectChanges();
      });
    })

  }

  getBookings(userId: number) {
    this.userBookings = [];
    this.bookingService.getBookingByEmployee(userId).subscribe(res => {
      res.forEach(booking => {

        const compareDate = new Date();
        const bookingDate = new Date(booking.endsAt);
        bookingDate.setHours(bookingDate.getHours() - 2);

        const sameDay = (d1: Date, d2: Date) => {
          return d1 < d2;
        };
        
        if (sameDay(compareDate, bookingDate)) {     
        const newBooking = {} as Booking;
        newBooking.Invite = new Array<Invite>();
        this.getInvitesForBooking(booking.id);
        newBooking.id = booking.id;
        newBooking.deskId = booking.deskId;
        newBooking.startsAt = booking.startsAt;
        newBooking.endsAt = booking.endsAt;
        newBooking.employeeId = booking.employeeId;
        newBooking.desk = booking.desk;
        newBooking.isInvited = booking.isInvited;
        // newBooking.Invite = this.invites;

        this.userBookings.push(newBooking);
        this.invites = [];
        this.changeDetection.detectChanges();
        this.getMeetingRoom(booking.deskId, booking.id);
        }

      });
      this.changeDetection.detectChanges();
    })



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
    }

    );


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

  isInvite(bookingId:number) : string {
    let isInvite = false;
    for (let i = 0; i < this.userBookings.length; i++) {
      if (this.userBookings[i].id == bookingId) {
        isInvite = this.userBookings[i].isInvited;
      }
    }

    if (isInvite == false){
      return "Your Booking";

    }
    else if (isInvite==true){
      return "Invited";
    }
    return "Error";
  }



  //gets current user information
  getCurrentUser() {
    const userData = JSON.stringify(localStorage.getItem("CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser"));
    this.bookingService.getEmployeeByEmail(userData.replace(/['"]+/g, '')).subscribe(res => {
      this.currentUser = res;
      this.userNumb = this.currentUser.id;
      this.getRating();
      this.getInvites(this.currentUser.id);
      this.getBookings(this.currentUser.id);

      this.changeDetection.detectChanges();


    })
  }

  getRating() {
    this.bookingService.getRatings(this.currentUser.id).subscribe(res => {
      this.newRating = res;
      this.rating = this.newRating.currentRating / (this.newRating.ratingsReceived);
      this.changeDetection.detectChanges();
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


  //functions for invites ----------------------------------------------------------------------------------------------------------------------


  getInvites(userId: number) {
    this.bookingService.getInvitesForUser(userId).subscribe(res => {
      res.forEach((Invite) => {

        const newInvite = {} as Invite;
        newInvite.id = Invite.id;
        newInvite.Booking = Invite.Booking;
        newInvite.bookingId = Invite.bookingId;

        newInvite.email = Invite.email;

        this.getDeskID(Invite.bookingId);

        this.invites.push(newInvite);
        this.changeDetection.detectChanges();
      });
      this.changeDetection.detectChanges();
    })
  }

  getDeskID(bookingId: number) {
    this.bookingService.getBookingByBookingId(bookingId).subscribe(res => {
      for (let i = 0; i < this.invites.length; i++){
        if (this.invites[i].bookingId == bookingId){
          this.invites[i].deskId = res.deskId;
          this.invites[i].Booking = res;
        }
      }

      for (let i = 0; i < this.invites.length; i++){
        for (let p = 0; p < this.Users.length; p++){
          if (this.invites[i].Booking.employeeId == this.Users[p].id){
            this.invites[i].email = this.Users[p].email;
          }
        this.changeDetection.detectChanges();
        }
      }
    });
  }


  inviteOthers(bookingId: number) {
    if (this.inviteEmail != "") {
      this.bookingService.createInvite(bookingId, this.inviteEmail).subscribe(res => {
        //
        this.openJoinSnackBar("You have successfully sent the invite.");
      });
      }
    }
  

  acceptInvite(inviteId: number) {

    this.bookingService.acceptInvite(inviteId).subscribe(res => {
      //
    });
    for (let i = 0; i < this.invites.length; i++) {
      if (this.invites[i].id == inviteId) {
        this.invites.splice(i, 1);
      }
    }
    // this.getBookings(this.currentUser.id);
    // setTimeout(() => { this.getBookings(this.currentUser.id); }, 500);
    this.changeDetection.detectChanges();

  }

  declineInvite(inviteId: number) {

    this.bookingService.declineInvite(inviteId).subscribe(res => {
      //
    });
    for (let i = 0; i < this.invites.length; i++) {
      if (this.invites[i].id == inviteId) {
        this.invites.splice(i, 1);
        this.changeDetection.detectChanges();

      }
    }
    // this.getBookings(this.currentUser.id);
    // setTimeout(() => { this.getBookings(this.currentUser.id); }, 500);
    this.changeDetection.detectChanges();

  }

  getDeskIdOfInvite(inviteId: number) : number {

    for (let i = 0; i < this.invites.length; i++) {
      if (this.invites[i].id == inviteId) {
        return this.invites[i].deskId;
      }
    }

    return 0;
  }

  // methods for filter buttons
  setFilter(filter: string) : void{
    this.toDisplay = filter;
    this.changeDetection.detectChanges();
  }

  setBookingOrInvite(filter: string) : void {
    this.userBookings = [];
    this.getBookings(this.currentUser.id);

    this.invites = [];
    this.getInvites(this.currentUser.id);
    
    this.bookingOrInvite = filter;
    this.changeDetection.detectChanges();
  }



}
