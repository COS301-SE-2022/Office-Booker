import { Component, Output, OnInit, Inject, HostListener } from '@angular/core';


import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';



export interface data {
  cancelText: string,
  confirmText: string,
  message: string,
  title: string}
@Component({
  selector: 'office-booker-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css'],
})

export class PopupDialogComponent {

  options = {
    title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
    message: 'CONFIRM.DOWNLOAD.JOB.MESSAGE',
    cancelText: 'CONFIRM.DOWNLOAD.JOB.CANCELTEXT',
    confirmText: 'CONFIRM.DOWNLOAD.JOB.CONFIRMTEXT'
  };
  
  constructor(@Inject(MAT_DIALOG_DATA) public option: {
                  cancelText: string,
                  confirmText: string,
                  message: string,
                  title: string
              }, private mdDialogRef: MatDialogRef<PopupDialogComponent>)
  {
    
  }

  public cancel() {
    this.close();
  }
  public close() {
    this.mdDialogRef.close();
  }

  @HostListener("enter.esc") 
  public confirm() {
    this.close();
  }
  
  @HostListener("keydown.esc") 
  public onEsc() {
    this.close();
  }

  // ngOnInit(): void {}

  // onNoClick() : void {
  //   this.dialogRef.close();
  // }
}
