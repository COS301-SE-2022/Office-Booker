import { ComponentFixture, TestBed } from '@angular/core/testing';


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';

import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatChipList } from '@angular/material/chips';
import { MatChip } from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar';



import { EditDialogComponent } from './edit-dialog.component';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDialogComponent],
      imports: [MatFormFieldModule, MatCardModule, FormsModule, MatDialogModule, MatInputModule, 
        BrowserAnimationsModule, HttpClientTestingModule, MatSnackBarModule, MatChipsModule],
      providers: [
          { provide: MatDialogRef, useValue: {}},
          { provide: MatDialog, useValue: {}},
          { provide: MAT_DIALOG_DATA, useValue: {}},
        ]

    }).compileComponents();

    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
