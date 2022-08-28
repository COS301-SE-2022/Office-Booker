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
import { Invite } from '../../../services/booking-service.service';


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

  constructor(
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog) {

      this.inviteEmail = "";
      this.invites = data.Invites;
    }
   

  // ngOnInit(): void {}

  onNoClick() : void {
    
    this.dialogRef.close();
  }

  remove(invite: Invite): void {
    console.log(invite);
  }
  
}
