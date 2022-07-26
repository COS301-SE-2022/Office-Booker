import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskPopupComponent } from './desk-popup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';

import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DeskPopupComponent', () => {
  let component: DeskPopupComponent;
  let fixture: ComponentFixture<DeskPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeskPopupComponent],
      imports: [MatFormFieldModule, MatCardModule, FormsModule, MatDialogModule, MatInputModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {}},
        { provide: MatDialog, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {}},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
