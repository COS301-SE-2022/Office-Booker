import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InviteGuestComponent } from './invite-guest.component';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PopupDialogService } from '../../shared/popup-dialog/popup-dialog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../../../environments/environment';

describe('InviteGuestComponent Unit Tests', () => {
  let component: InviteGuestComponent;
  let fixture: ComponentFixture<InviteGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteGuestComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatCardModule, FormsModule, 
        MatFormFieldModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
      providers: [PopupDialogService,
        { provide: MatDialogRef, useValue: {}},
        { provide: MatDialog, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {}},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call invite method', () => {
    component.email = "test@email.com";
    component.validateEmail = jest.fn().mockReturnValue(true);
    component.invite();
    expect(component.validateEmail).toHaveBeenCalledWith("test@email.com");
    expect(component.beenRun).toEqual(true);
    expect(component.option.title).toEqual("This user has already been invited!");
    expect(component.option.message).toEqual(component.email);
  });

});

// describe('InviteGuestComponent Integration Tests', () => {
//   let component: InviteGuestComponent;
//   let fixture: ComponentFixture<InviteGuestComponent>;
//   let httpMock: HttpTestingController;
//   const baseURL = environment.API_URL + "/api/";

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [InviteGuestComponent],
//       imports: [RouterTestingModule, HttpClientTestingModule, MatCardModule, FormsModule, 
//         MatFormFieldModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
//       providers: [PopupDialogService,
//         { provide: MatDialogRef, useValue: {}},
//         { provide: MatDialog, useValue: {}},
//         { provide: MAT_DIALOG_DATA, useValue: {}},
//       ]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(InviteGuestComponent);
//     component = fixture.componentInstance;
//     httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController);
//     fixture.detectChanges();
//   });

//   // it('should test invite http', () => {
//   //   component.email = "test@email.com";
//   //   component.validateEmail = jest.fn().mockReturnValue(true);
//   //   component.invite();
//   //   const url = baseURL + 'users/email';
//   //   const req = httpMock.expectOne(`${url}`);
//   //   expect(req.request.method).toBe('POST');
//   // });

// });
