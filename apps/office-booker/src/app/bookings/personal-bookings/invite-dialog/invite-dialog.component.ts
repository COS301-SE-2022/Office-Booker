import { Component, Inject, OnInit } from '@angular/core';

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


export interface DialogData {
  inviteEmail: string;
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
  invitesToDelete: Invite[];

  constructor(
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog, private bookingService: BookingServiceService) {

      this.inviteEmail = "";
      this.invites = data.Invites;
      this.invitesToDelete = [];
    }
   

  // ngOnInit(): void {}

  onNoClick() : void {
    this.dialogRef.close(this.invitesToDelete);
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
  
}
