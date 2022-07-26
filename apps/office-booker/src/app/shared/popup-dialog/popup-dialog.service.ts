import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PopupDialogComponent } from './popup-dialog.component';


// export interface option {
//   title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
//   message: 'CONFIRM.DOWNLOAD.JOB.MESSAGE',
//   cancelText: 'CONFIRM.DOWNLOAD.JOB.CANCELTEXT',
//   confirmText: 'CONFIRM.DOWNLOAD.JOB.CONFIRMTEXT'
// }

@Injectable()
export class PopupDialogService {

  option = {
    title: 'CONFIRM.DOWNLOAD.JOB.TITLE',
    message: 'CONFIRM.DOWNLOAD.JOB.MESSAGE',
    
    cancelText: 'CONFIRM.DOWNLOAD.JOB.CANCELTEXT',
    confirmText: 'CONFIRM.DOWNLOAD.JOB.CONFIRMTEXT'
  };

  constructor(private dialog: MatDialog) {

  }
  dialogRef!: MatDialogRef<PopupDialogComponent>;
  
  public open(option : any): void {
    this.dialogRef = this.dialog.open(PopupDialogComponent, {    
         data: {
           title: option.title,
           message: option.message,
           cancelText: option.cancelText,
           confirmText: option.confirmText
         }
    });
  }
  public confirmed(): Observable<any> {
    
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        return res;
      }
    ));
  }
}