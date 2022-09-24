import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapBookingsComponent } from './map-bookings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatGridListModule } from '@angular/material/grid-list';
import { Desk } from '../../services/booking-service.service';
import { BookingCardComponent } from '../personal-bookings/booking-card/booking-card.component';
import { MatCardModule } from '@angular/material/card'
import { FormsModule } from '@angular/forms'

import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import { CognitoService } from '../../cognito.service';

import { OverlayModule } from '@angular/cdk/overlay';

//imports for Popup Dialog
import { PopupDialogService } from '../../shared/popup-dialog/popup-dialog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatCheckboxModule } from '@angular/material/checkbox';


describe('BookingsComponent', () => {
  let component: MapBookingsComponent;
  let fixture: ComponentFixture<MapBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatGridListModule, MatDialogModule, HttpClientTestingModule, MatCardModule, FormsModule, 
                MatCheckboxModule, MatSnackBarModule, OverlayModule, MatMenuModule],
      declarations: [MapBookingsComponent],
      providers: [
        CognitoService,
        PopupDialogService, 
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
