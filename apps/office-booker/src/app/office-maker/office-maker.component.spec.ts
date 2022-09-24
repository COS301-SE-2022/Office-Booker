import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { OfficeMakerComponent } from './office-maker.component';
import { PopupDialogService } from '../shared/popup-dialog/popup-dialog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OfficeMakerComponent', () => {
  let component: OfficeMakerComponent;
  let fixture: ComponentFixture<OfficeMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule
                , BrowserAnimationsModule],
      declarations: [OfficeMakerComponent],
      providers: [PopupDialogService,
        { provide: MatDialogRef, useValue: {}},
        { provide: MatDialog, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {}},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OfficeMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
