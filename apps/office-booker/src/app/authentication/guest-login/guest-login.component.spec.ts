import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestLoginComponent } from './guest-login.component';

import { RouterTestingModule } from '@angular/router/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';

import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GuestLoginComponent', () => {
  let component: GuestLoginComponent;
  let fixture: ComponentFixture<GuestLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestLoginComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
