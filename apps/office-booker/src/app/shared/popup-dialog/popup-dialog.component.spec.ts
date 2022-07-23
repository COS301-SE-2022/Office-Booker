import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDialogComponent } from './popup-dialog.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';

import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PopupDialogService } from './popup-dialog.service';
describe('PopupDialogComponent', () => {
  let component: PopupDialogComponent;
  let fixture: ComponentFixture<PopupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupDialogComponent],
      imports: [ MatFormFieldModule, MatCardModule, FormsModule, MatDialogModule, MatInputModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {}},
        { provide: MatDialog, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {}},
        PopupDialogComponent,
        PopupDialogService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
