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

  // it('should populate grid', () => {
  //   jest.spyOn(component, "generateGrid");
  //   component.generateGrid();
  //   for (let i = 0; i < 12; i++) {
  //     for (let j = 0; j < 12; j++) {
  //       expect(component.deskGrid[i][j]).toEqual(false);
  //       expect(component.bookedGrid[i][j]).toEqual(false);
  //       expect(component.bookingIDGrid[i][j]).toEqual(-1);
  //     }
  //   }
  // });

  // it('should return -1 when no desk at location', () => {
  //   jest.spyOn(component, "getDeskIdAtLocation");
  //   expect(component.getDeskIdAtLocation(5, 5)).toEqual(-1);
  // });

  // it('should return desk when desk at location', () => {
  //   jest.spyOn(component, "getDeskIdAtLocation");
  //   const desk: Desk = {
  //     roomId: 1,
  //     id: 2,
  //     LocationRow: 5,
  //     LocationCol: 5    
  //   }
  //   component.desks[0] = desk;
  //   component.desks[1] = desk;
  //   expect(component.getDeskIdAtLocation(5, 5)).toEqual(2);
  // });

  // it('should mark correct coords in bookedGrid', () => {
  //   jest.spyOn(component, "markBooking");
  //   const desk: Desk = {
  //     roomId: 1,
  //     id: 2,
  //     LocationRow: 3,
  //     LocationCol: 5    
  //   }
  //   const desk2: Desk = {
  //     roomId: 1,
  //     id: 1,
  //     LocationRow: 2,
  //     LocationCol: 2    
  //   }
  //   const desk3: Desk = {
  //     roomId: 1,
  //     id: 3,
  //     LocationRow: 1,
  //     LocationCol: 4    
  //   }
  //   const desk4: Desk = {
  //     roomId: 1,
  //     id: 4,
  //     LocationRow: 8,
  //     LocationCol: 9    
  //   }

  //   for (let i = 0; i < 12; i++) {
  //     component.deskGrid.push([]);
  //     component.bookedGrid.push([]);
  //     component.bookingIDGrid.push([]);
  //     for (let j = 0; j < 12; j++) {
  //       component.deskGrid[i].push(false);
  //       component.bookedGrid[i].push(false);
  //       component.bookingIDGrid[i].push(-1);
  //     }
  //   }

  //   component.desks[0] = desk;
  //   component.desks[1] = desk2;
  //   component.desks[2] = desk3;
  //   component.desks[3] = desk4;
  //   component.markBooking(3);
  //   expect(component.bookedGrid[1][4]).toEqual(true);
  // });

  // it('should add correct ID in bookingIDGrid', () => {
  //   jest.spyOn(component, "addBooking");
  //   const desk: Desk = {
  //     roomId: 1,
  //     id: 2,
  //     LocationRow: 3,
  //     LocationCol: 5    
  //   }
  //   const desk2: Desk = {
  //     roomId: 1,
  //     id: 1,
  //     LocationRow: 2,
  //     LocationCol: 2    
  //   }
  //   const desk3: Desk = {
  //     roomId: 1,
  //     id: 3,
  //     LocationRow: 1,
  //     LocationCol: 4    
  //   }
  //   const desk4: Desk = {
  //     roomId: 1,
  //     id: 4,
  //     LocationRow: 8,
  //     LocationCol: 9    
  //   }

  //   for (let i = 0; i < 12; i++) {
  //     component.deskGrid.push([]);
  //     component.bookedGrid.push([]);
  //     component.bookingIDGrid.push([]);
  //     for (let j = 0; j < 12; j++) {
  //       component.deskGrid[i].push(false);
  //       component.bookedGrid[i].push(false);
  //       component.bookingIDGrid[i].push(-1);
  //     }
  //   }

  //   component.desks[0] = desk;
  //   component.desks[1] = desk2;
  //   component.desks[2] = desk3;
  //   component.desks[3] = desk4;
  //   component.addBooking(3, 4);
  //   expect(component.bookingIDGrid[1][4]).toEqual(4);
  // });

  // it('should remove correct ID from bookingIDGrid', () => {
  //   jest.spyOn(component, "removeBooking");
  //   const desk: Desk = {
  //     roomId: 1,
  //     id: 2,
  //     LocationRow: 3,
  //     LocationCol: 5    
  //   }
  //   const desk2: Desk = {
  //     roomId: 1,
  //     id: 1,
  //     LocationRow: 2,
  //     LocationCol: 2    
  //   }
  //   const desk3: Desk = {
  //     roomId: 1,
  //     id: 3,
  //     LocationRow: 1,
  //     LocationCol: 4    
  //   }
  //   const desk4: Desk = {
  //     roomId: 1,
  //     id: 4,
  //     LocationRow: 8,
  //     LocationCol: 9    
  //   }

  //   for (let i = 0; i < 12; i++) {
  //     component.deskGrid.push([]);
  //     component.bookedGrid.push([]);
  //     component.bookingIDGrid.push([]);
  //     for (let j = 0; j < 12; j++) {
  //       component.deskGrid[i].push(false);
  //       component.bookedGrid[i].push(false);
  //       component.bookingIDGrid[i].push(-1);
  //     }
  //   }

  //   component.desks[0] = desk;
  //   component.desks[1] = desk2;
  //   component.desks[2] = desk3;
  //   component.desks[3] = desk4;
  //   component.removeBooking(3);
  //   expect(component.bookingIDGrid[1][4]).toEqual(-1);
  // });

  // it('should get correct bookingID', () => {
  //   jest.spyOn(component, "getBookingID");
  //   const desk: Desk = {
  //     roomId: 1,
  //     id: 2,
  //     LocationRow: 3,
  //     LocationCol: 5    
  //   }
  //   const desk2: Desk = {
  //     roomId: 1,
  //     id: 1,
  //     LocationRow: 2,
  //     LocationCol: 2    
  //   }
  //   const desk3: Desk = {
  //     roomId: 1,
  //     id: 3,
  //     LocationRow: 1,
  //     LocationCol: 4    
  //   }
  //   const desk4: Desk = {
  //     roomId: 1,
  //     id: 4,
  //     LocationRow: 8,
  //     LocationCol: 9    
  //   }

  //   for (let i = 0; i < 12; i++) {
  //     component.deskGrid.push([]);
  //     component.bookedGrid.push([]);
  //     component.bookingIDGrid.push([]);
  //     for (let j = 0; j < 12; j++) {
  //       component.deskGrid[i].push(false);
  //       component.bookedGrid[i].push(false);
  //       component.bookingIDGrid[i].push(-1);
  //     }
  //   }

  //   component.desks[0] = desk;
  //   component.desks[1] = desk2;
  //   component.desks[2] = desk3;
  //   component.desks[3] = desk4;
  //   component.markBooking(3);
  //   component.addBooking(3, 4);
  //   expect(component.getBookingID(3)).toEqual(4);
  // });

  // it('should get return -1 if desk is not booked', () => {
  //   jest.spyOn(component, "getBookingID");
  //   const desk: Desk = {
  //     roomId: 1,
  //     id: 2,
  //     LocationRow: 3,
  //     LocationCol: 5    
  //   }
  //   const desk2: Desk = {
  //     roomId: 1,
  //     id: 1,
  //     LocationRow: 2,
  //     LocationCol: 2    
  //   }
  //   const desk3: Desk = {
  //     roomId: 1,
  //     id: 3,
  //     LocationRow: 1,
  //     LocationCol: 4    
  //   }
  //   const desk4: Desk = {
  //     roomId: 1,
  //     id: 4,
  //     LocationRow: 8,
  //     LocationCol: 9    
  //   }

  //   for (let i = 0; i < 12; i++) {
  //     component.deskGrid.push([]);
  //     component.bookedGrid.push([]);
  //     component.bookingIDGrid.push([]);
  //     for (let j = 0; j < 12; j++) {
  //       component.deskGrid[i].push(false);
  //       component.bookedGrid[i].push(false);
  //       component.bookingIDGrid[i].push(-1);
  //     }
  //   }

  //   component.desks[0] = desk;
  //   component.desks[1] = desk2;
  //   component.desks[2] = desk3;
  //   component.desks[3] = desk4;
  //   component.markBooking(3);
  //   component.addBooking(3, 4);
  //   expect(component.getBookingID(2)).toEqual(-1);
  // });

  // it('shouldunmark the correct grid', () => {
  //   jest.spyOn(component, "unMarkBooking");
  //   const desk: Desk = {
  //     roomId: 1,
  //     id: 2,
  //     LocationRow: 3,
  //     LocationCol: 5    
  //   }
  //   const desk2: Desk = {
  //     roomId: 1,
  //     id: 1,
  //     LocationRow: 2,
  //     LocationCol: 2    
  //   }
  //   const desk3: Desk = {
  //     roomId: 1,
  //     id: 3,
  //     LocationRow: 1,
  //     LocationCol: 4    
  //   }
  //   const desk4: Desk = {
  //     roomId: 1,
  //     id: 4,
  //     LocationRow: 8,
  //     LocationCol: 9    
  //   }

  //   for (let i = 0; i < 12; i++) {
  //     component.deskGrid.push([]);
  //     component.bookedGrid.push([]);
  //     component.bookingIDGrid.push([]);
  //     for (let j = 0; j < 12; j++) {
  //       component.deskGrid[i].push(false);
  //       component.bookedGrid[i].push(false);
  //       component.bookingIDGrid[i].push(-1);
  //     }
  //   }

  //   component.desks[0] = desk;
  //   component.desks[1] = desk2;
  //   component.desks[2] = desk3;
  //   component.desks[3] = desk4;
  //   component.markBooking(3);
  //   component.unMarkBooking(3);
  //   expect(component.bookedGrid[1][4]).toEqual(false);
  // });

  // it('should return true if booked', () => {
  //   jest.spyOn(component, "isBooked");
  //   const desk: Desk = {
  //     roomId: 1,
  //     id: 2,
  //     LocationRow: 3,
  //     LocationCol: 5    
  //   }
  //   const desk2: Desk = {
  //     roomId: 1,
  //     id: 1,
  //     LocationRow: 2,
  //     LocationCol: 2    
  //   }
  //   const desk3: Desk = {
  //     roomId: 1,
  //     id: 3,
  //     LocationRow: 1,
  //     LocationCol: 4    
  //   }
  //   const desk4: Desk = {
  //     roomId: 1,
  //     id: 4,
  //     LocationRow: 8,
  //     LocationCol: 9    
  //   }

  //   for (let i = 0; i < 12; i++) {
  //     component.deskGrid.push([]);
  //     component.bookedGrid.push([]);
  //     component.bookingIDGrid.push([]);
  //     for (let j = 0; j < 12; j++) {
  //       component.deskGrid[i].push(false);
  //       component.bookedGrid[i].push(false);
  //       component.bookingIDGrid[i].push(-1);
  //     }
  //   }

  //   component.desks[0] = desk;
  //   component.desks[1] = desk2;
  //   component.desks[2] = desk3;
  //   component.desks[3] = desk4;
  //   component.markBooking(3);
  //   component.addBooking(3, 4)
  //   expect(component.isBooked(3)).toEqual(true);
  // });

  // it('should return false if not booked', () => {
  //   jest.spyOn(component, "isBooked");
  //   const desk: Desk = {
  //     roomId: 1,
  //     id: 2,
  //     LocationRow: 3,
  //     LocationCol: 5    
  //   }
  //   const desk2: Desk = {
  //     roomId: 1,
  //     id: 1,
  //     LocationRow: 2,
  //     LocationCol: 2    
  //   }
  //   const desk3: Desk = {
  //     roomId: 1,
  //     id: 3,
  //     LocationRow: 1,
  //     LocationCol: 4    
  //   }
  //   const desk4: Desk = {
  //     roomId: 1,
  //     id: 4,
  //     LocationRow: 8,
  //     LocationCol: 9    
  //   }

  //   for (let i = 0; i < 12; i++) {
  //     component.deskGrid.push([]);
  //     component.bookedGrid.push([]);
  //     component.bookingIDGrid.push([]);
  //     for (let j = 0; j < 12; j++) {
  //       component.deskGrid[i].push(false);
  //       component.bookedGrid[i].push(false);
  //       component.bookingIDGrid[i].push(-1);
  //     }
  //   }

  //   component.desks[0] = desk;
  //   component.desks[1] = desk2;
  //   component.desks[2] = desk3;
  //   component.desks[3] = desk4;
  //   expect(component.isBooked(3)).toEqual(false);
  // });

});
