import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalBookingsComponent } from './personal-bookings.component';
import { RouterTestingModule } from '@angular/router/testing'
import { MatCardModule } from '@angular/material/card'
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';



describe('PersonalBookingsComponent', () => {
  let component: PersonalBookingsComponent;
  let fixture: ComponentFixture<PersonalBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalBookingsComponent, InviteDialogComponent],
      imports: [RouterTestingModule, MatCardModule, HttpClientTestingModule],

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
