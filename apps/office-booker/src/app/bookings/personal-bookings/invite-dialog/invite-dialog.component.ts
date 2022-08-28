import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';

import {MatChipInputEvent} from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips'; 
import { BookingServiceService, Invite } from '../../../services/booking-service.service';
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
    
      if (value != "") {
        console.log('value: ' + value);
        this.bookingService.createInvite(this.bookingId, value).subscribe(res => {
          console.log(res);
          this.openJoinSnackBar("You have successfully sent an invite to " + value);
          this.invites[this.invites.length] = this.invites[0];
          this.invites[this.invites.length - 1].email = value;
        }, (error) => {
          console.log(error);
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
    console.log(invite);
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
