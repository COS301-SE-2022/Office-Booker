import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapBookingsComponent } from './map-bookings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { MatGridListModule } from '@angular/material/grid-list';
import { Desk } from '../../services/booking-service.service';
import { BookingCardComponent } from '../personal-bookings/booking-card/booking-card.component';
import { MatCardModule } from '@angular/material/card'
import { FormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { CognitoService } from '../../cognito.service';
import { OverlayModule } from '@angular/cdk/overlay';
//imports for Popup Dialog
import { PopupDialogService } from '../../shared/popup-dialog/popup-dialog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as exp from 'constants';
import { environment } from '../../../environments/environment';


describe('BookingsComponent Unit Tests', () => {
  let component: MapBookingsComponent;
  let fixture: ComponentFixture<MapBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatGridListModule, MatDialogModule, HttpClientTestingModule, MatCardModule, FormsModule,
        MatCheckboxModule, MatSnackBarModule, OverlayModule, MatMenuModule, MatFormFieldModule, MatSelectModule
        , BrowserAnimationsModule],
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

  it('should call printRooms method', () => {
    component.getDesksByRoomId = jest.fn();
    component.getWallsByRoomId = jest.fn();
    component.printRooms(1);
    expect(component.desks.length).toEqual(0);
    expect(component.walls.length).toEqual(0);
    expect(component.getDesksByRoomId).toHaveBeenLastCalledWith(1);
    expect(component.getWallsByRoomId).toHaveBeenLastCalledWith(1);
  });

  it('should call changeOpen method', () => {
    component.isOpen = false;
    component.getFacilitiesForDesk = jest.fn();
    component.changeOpen(5, true);
    expect(component.getFacilitiesForDesk).toHaveBeenCalledWith(5);
    expect(component.hoveredItemName).toEqual("Meeting Room 5");
    expect(component.hoveredItemId).toEqual(5);
    expect(component.hoveredItemType).toEqual("Meeting Room");
  });

  it('should call getFacilitiesForDesk method', () => {
    component.getFacilitiesForDesk(0);
    expect(component.numPlugs).toEqual(0);
    expect(component.numMonitors).toEqual(0);
    expect(component.numProjectors).toEqual(0);
  });

  it('should call selectToBook method', () => {
    component.openDialog = jest.fn();
    component.selectToBook(1, true);
    expect(component.selectedItemBookings).toEqual([]);
    expect(component.selected).toEqual(true);
    expect(component.selectedItemName).toEqual("Meeting Room 1");
    expect(component.selectedItemId).toEqual(1);
    expect(component.selectedItemType).toEqual("Meeting Room");
    expect(component.openDialog).toHaveBeenCalled();
  });

  it('should call deleteBooking method', () => {
    component.deleteADeskBooking = jest.fn();
    component.deleteBooking(5);
    expect(component.deleteADeskBooking).toHaveBeenCalledWith(5);
  });

  it('should call filterBookings method', () => {
    component.validateDate = jest.fn().mockReturnValue(true);
    component.openFailSnackBar = jest.fn();
    component.getBookingsByDeskId = jest.fn();
    component.filterBookings();
    expect(component.validateDate).toHaveBeenCalled();
    component.validateDate = jest.fn().mockReturnValue(false);
    component.filterBookings();
    expect(component.openFailSnackBar).toHaveBeenCalled();
  });
});

describe('BookingsComponent Integration Tests', () => {
  let component: MapBookingsComponent;
  let fixture: ComponentFixture<MapBookingsComponent>;
  let httpMock: HttpTestingController;
  const baseURL = environment.API_URL + "/api/";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatGridListModule, MatDialogModule, HttpClientTestingModule, MatCardModule, FormsModule,
        MatCheckboxModule, MatSnackBarModule, OverlayModule, MatMenuModule, MatFormFieldModule, MatSelectModule
        , BrowserAnimationsModule],
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
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController);
    fixture.detectChanges();
  });

  it('should test getFacilitiesForDesk http calls', () => {
    component.getFacilitiesForDesk(3);
    const url = baseURL + 'facilities/desk/' + 3;
    const req = httpMock.expectOne(`${url}`);
    expect(req.request.method).toBe('GET');
  });

  it('should test getWallsByRoomId http calls', () => {
    component.getWallsByRoomId(5);
    const url = baseURL + 'walls/room/' + 5;
    const req = httpMock.expectOne(`${url}`);
    expect(req.request.method).toBe('GET');
  });

  it('should test getBookingsByDeskId http calls', () => {
    component.getBookingsByDeskId(5);
    const url = baseURL + 'bookings/desk/' + 5;
    const req = httpMock.expectOne(`${url}`);
    expect(req.request.method).toBe('GET');
  });

  it('should test deleteADeskBooking http calls', () => {
    component.deleteADeskBooking(1);
    const url = baseURL + 'bookings/' + 1;
    const req = httpMock.expectOne(`${url}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should test getRooms http calls', () => {
    component.getRooms(1);
    const url = baseURL + 'rooms/company/' + 1;
    const req = httpMock.expectOne(`${url}`);
    expect(req.request.method).toBe('GET');
  });
});
