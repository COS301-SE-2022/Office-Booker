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
import { Booking, BookingServiceService, Invite, employee } from '../../services/booking-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InviteDialogComponent } from '../../bookings/personal-bookings/invite-dialog/invite-dialog.component';

export interface DialogData {
  newFloorName: string;
}

@Component({
  selector: 'office-booker-new-floor-dialog',
  templateUrl: './new-floor-dialog.component.html',
  styleUrls: ['./new-floor-dialog.component.css'],
})
export class NewFloorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog, private bookingService: BookingServiceService,
    public snackBar: MatSnackBar, private changeDetection: ChangeDetectorRef
  ) {}

  // ngOnInit(): void {}

  onNoClick() : void {
    this.dialogRef.close();
  }
}
