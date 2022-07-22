import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestComponent } from './guest.component';

import { RouterTestingModule } from '@angular/router/testing';

import {HttpClientTestingModule} from '@angular/common/http/testing';

import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

describe('GuestComponent', () => {
  let component: GuestComponent;
  let fixture: ComponentFixture<GuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatCardModule, FormsModule, MatFormFieldModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
