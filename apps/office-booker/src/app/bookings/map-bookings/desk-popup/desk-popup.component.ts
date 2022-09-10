import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';

import { MapBookingsComponent } from '../map-bookings.component';
import { Booking, employee } from '../../../services/booking-service.service';

export default interface DialogData {
  currentUser: employee;
  selectedItemBookings: Array<Booking>;
  selectedItemType: string;
  deskId: number;
  selectedItemName: string;
  selectedItemId: number;
  
}



@Component({
  selector: 'office-booker-desk-popup',
  templateUrl: './desk-popup.component.html',
  styleUrls: ['./desk-popup.component.css'],
})

export class DeskPopupComponent {
  constructor(public dialogRef: MatDialogRef<DeskPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog) {
    }

  // ngOnInit(): void {}

  bookItem(id: number){
    this.dialogRef.close();
  }
}
