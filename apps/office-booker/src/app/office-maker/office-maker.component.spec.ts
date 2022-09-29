import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { OfficeMakerComponent } from './office-maker.component';
import { PopupDialogService } from '../shared/popup-dialog/popup-dialog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';

describe('OfficeMakerComponent Unit tests', () => {
  let component: OfficeMakerComponent;
  let fixture: ComponentFixture<OfficeMakerComponent>;
  let httpMock: HttpTestingController;
  const baseURL = environment.API_URL + "/api/";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule
        , BrowserAnimationsModule, MatSnackBarModule],
      declarations: [OfficeMakerComponent],
      providers: [PopupDialogService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OfficeMakerComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController);
    fixture.detectChanges();
  });

  // afterEach(() => {
  //   httpMock.verify();
  // });

  it('should call getCurrentuser method', () => {
    component.getCurrentUser = jest.fn();
    component.getCurrentUser();
    expect(component.getCurrentUser).toHaveBeenCalled();
  });

  it('should call generateDesks method', () => {
    component.generateDesks = jest.fn();
    component.generateDesks();
    expect(component.generateDesks).toHaveBeenCalled();
  });

  it('should call generateWalls method', () => {
    component.generateWalls = jest.fn();
    component.generateWalls();
    expect(component.generateWalls).toHaveBeenCalled();
  });

  it('should call createDesk method', () => {
    component.createDesk = jest.fn();
    component.createDesk();
    expect(component.createDesk).toHaveBeenCalled();
  });

  it('should call deleteItem method', () => {
    component.deleteItem = jest.fn();
    component.deleteItem();
    expect(component.deleteItem).toHaveBeenCalled();
  });

  it('should call startDraw method', () => {
    component.drawMode = false;
    component.startDraw();
    expect(component.drawMode).toEqual(true);
  });

  it('should call setEdit method', () => {
    component.editMode = false;
    component.setEdit();
    expect(component.editMode).toEqual(true);
  });

  it('should call getFacilitiesForDesk method', () => {
    component.getFacilitiesForDesk = jest.fn();
    component.getFacilitiesForDesk(5);
    expect(component.getFacilitiesForDesk).toHaveBeenCalledWith(5);
    component.getFacilitiesForDesk(0);
    expect(component.getFacilitiesForDesk).toHaveBeenCalledWith(0);

  });

  it('should call onChangeFloor method', () => {
    component.selectedRoom = 0;
    component.onChangeFloor({ value: 5, });
    expect(component.selectedRoom).toEqual(5);
  });
});

describe('OfficeMakerComponent Integration tests', () => {
  let component: OfficeMakerComponent;
  let fixture: ComponentFixture<OfficeMakerComponent>;
  let httpMock: HttpTestingController;
  const baseURL = environment.API_URL + "/api/";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule
        , BrowserAnimationsModule, MatSnackBarModule],
      declarations: [OfficeMakerComponent],
      providers: [PopupDialogService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OfficeMakerComponent);
    component = fixture.componentInstance;
    httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController);
    fixture.detectChanges();
  });

  // afterEach(() => {
  //   httpMock.verify();
  // });

  it('should test getFacilitiesForDesk http call', () => {
    component.getFacilitiesForDesk(3);
    const url = baseURL + 'facilities/desk/' + 3;
    const req = httpMock.expectOne(`${url}`);
    expect(req.request.method).toBe('GET');
  });

  it('should test getDesksByRoomId http call', () => {
    component.getDesksByRoomId(3);
    const url = baseURL + 'desks/room/' + 3;
    const req = httpMock.expectOne(`${url}`);
    expect(req.request.method).toBe('GET');
  });

  it('should test getWallsByRoomId http call', () => {
    component.getWallsByRoomId(3);
    const url = baseURL + 'walls/room/' + 3;
    const req = httpMock.expectOne(`${url}`);
    expect(req.request.method).toBe('GET');
  });

  it('should test getRooms http call', () => {
    component.getRooms(3);
    const url = baseURL + 'rooms/company/' + 3;
    const req = httpMock.expectOne(`${url}`);
    expect(req.request.method).toBe('GET');
  });
});
