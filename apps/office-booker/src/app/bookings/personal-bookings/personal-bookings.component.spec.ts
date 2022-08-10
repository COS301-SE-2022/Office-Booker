import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalBookingsComponent } from './personal-bookings.component';
import { RouterTestingModule } from '@angular/router/testing'
import { MatCardModule } from '@angular/material/card'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatFormField } from '@angular/material/form-field';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { MatTreeModule } from '@angular/material/tree';



describe('PersonalBookingsComponent', () => {
  let component: PersonalBookingsComponent;
  let fixture: ComponentFixture<PersonalBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalBookingsComponent, InviteDialogComponent],
      imports: [RouterTestingModule, MatCardModule, HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {}},
        { provide: MatDialog, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {}},
      ]

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
