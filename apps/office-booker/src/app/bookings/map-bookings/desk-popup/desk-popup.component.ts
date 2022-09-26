import { ChangeDetectorRef, Component, HostListener, Inject, OnInit } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';

import { MapBookingsComponent } from '../map-bookings.component';
import { Booking, BookingServiceService, Desk, employee } from '../../../services/booking-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export default interface DialogData {
  currentUser: employee;
  selectedItemBookings: Array<Booking>;
  selectedItemType: string;
  deskId: number;
  selectedItemName: string;
  selectedItemId: number;
  hoveredItemName: string;
  numPlugs: number,
  numMonitors: number,
  numProjectors: number,
  desks: Array<Desk>;
  
}




@Component({
  selector: 'office-booker-desk-popup',
  templateUrl: './desk-popup.component.html',
  styleUrls: ['./desk-popup.component.css'],
})


export class DeskPopupComponent {

  
  constructor(public dialogRef: MatDialogRef<DeskPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,     
    private changeDetection: ChangeDetectorRef,
    public dialog: MatDialog, private bookingService: BookingServiceService, 
    public snackBar: MatSnackBar,) {
    }

  bookItem(id: number){
    this.dialogRef.close();
  }
  deleteBooking(itemId: number) {        //function when delete booking is called from a button
    this.deleteADeskBooking(itemId);        //calls the function with the api function

    this.changeDetection.detectChanges();
  }

  deleteADeskBooking(bookingId: number) {         //does the api call in the function
    this.bookingService.deleteBooking(bookingId).subscribe(res => {     //deletes the booking
      this.openFailSnackBar("Booking has been deleted");
      return res;
    });
    this.data.desks.forEach(desk => {        //goes through desk to get the matching desk with id
      for (let d = 0; d < desk.bookings.length; d++) {
        if (desk.bookings[d].id == bookingId) {
          desk.bookings.splice(d, 1);        //when found removes the booking from the bookings array for the correct desk
        }
        if (desk.bookings.length < 1) {       //if the booking array is empty boolean needs to be set to false
          desk.booking = false;
        }
        desk.ownBooking = false;
      }
    })

    this.changeDetection.detectChanges();
  }

  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 5000,
      panelClass: "success-snack"
    });
  }

  openFailSnackBar(message: string) {
    this.snackBar.open(message, "Ok", {
      duration: 5000,
      panelClass: "fail-snack"
    });
  }

  @HostListener("enter.esc") 
  public confirm() {
    this.close();
  }
  
  @HostListener("keydown.esc") 
  public onEsc() {
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }


}
