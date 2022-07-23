import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteGuestComponent } from './invite-guest.component';

import { RouterTestingModule } from '@angular/router/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';

import {MatCardModule} from '@angular/material/card';

import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PopupDialogService } from '../../shared/popup-dialog/popup-dialog.service';

describe('InviteGuestComponent', () => {
  let component: InviteGuestComponent;
  let fixture: ComponentFixture<InviteGuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteGuestComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatCardModule, FormsModule, MatFormFieldModule],
      providers: [PopupDialogService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
