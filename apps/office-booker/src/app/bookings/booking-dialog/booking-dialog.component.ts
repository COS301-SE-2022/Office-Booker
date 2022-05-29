import { inject } from '@angular/core';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'office-booker-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.css'],
})
export class BookingDialogComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {}

  // ngOnInit(): void {}
}
