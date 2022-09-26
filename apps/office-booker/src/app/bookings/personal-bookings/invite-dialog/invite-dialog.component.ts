import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';

import { MatChipInputEvent } from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips'; 
import { Booking, BookingServiceService, Invite, employee } from '../../../services/booking-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';



export interface DialogData {
  inviteEmail: string;
  bookingId : number;
  Invites: Invite[];
}

@Component({
  selector: 'office-booker-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css'],
})
export class InviteDialogComponent {

  inviteEmail: string;
  invites: Invite[];
  bookingId : number;
  defaultBooking: Booking = {} as any;
  defaultEmployee: employee = {} as any;
  // newInvite: Invite = {
  //   id: -1, bookingId: -1, employeeId: -1, accepted: false, email: "null",
  //   deskId: 0,
  //   Booking: this.defaultBooking,
  //   invitedEmail: '',
  //   invitedEmployee: this.defaultEmployee
  // };


  
  readonly separatorKeysCodes = [ENTER] as const;

  constructor(
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog, private bookingService: BookingServiceService,
    public snackBar: MatSnackBar, private changeDetection: ChangeDetectorRef) {

      this.inviteEmail = "";
      this.invites = data.Invites;
      this.bookingId = data.bookingId;
    }
   

  // ngOnInit(): void {}

  onNoClick() : void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
      
      if (value != "") 
      {
        const  newInvite =  {
          id: -1, bookingId: -1, employeeId: -1, accepted: false, email: value,
          deskId: 0,
          Booking: this.defaultBooking,
          invitedEmail: value,
          invitedEmployee: this.defaultEmployee
        };

        this.bookingService.createInvite(this.bookingId, value).subscribe(res => {
          this.openJoinSnackBar("You have successfully sent an invite to " + value);
          if (this.invites.length > 0) {
            
            this.invites[this.invites.length] = newInvite;
            this.invites[this.invites.length].email = value;
            this.changeDetection.detectChanges();
          }
          else {
            this.invites[0] = newInvite;
            this.invites[0].email = value;
            this.changeDetection.detectChanges();
          }
        }, (error) => {
          this.openDeleteSnackBar("An error has occurred while inviiting: " + value);
        })
      };
        
        event.chipInput?.clear();
    

    // this.changeDetection.detectChanges();
    // this.invites[this.invites.length] = this.invites[0];
    // this.invites[this.invites.length - 1].email = value;
    this.changeDetection.detectChanges();

  }

  remove(invite: Invite): void {
    this.bookingService.deleteInvite(invite.id).subscribe(res => {
      res;
    });
    
    for (let i =0; i<this.invites.length; i++){
      if (this.invites[i].id == invite.id){
        this.invites.splice(i, 1);
      }
    }
  }

  openJoinSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 5000,
      panelClass: "success-snack",
    });
  }

  openDeleteSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 5000,
      panelClass: "fail-snack",
    });
  }
  
}
