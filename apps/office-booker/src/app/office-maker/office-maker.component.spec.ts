import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { OfficeMakerComponent } from './office-maker.component';
import { PopupDialogService } from '../shared/popup-dialog/popup-dialog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('OfficeMakerComponent', () => {
  let component: OfficeMakerComponent;
  let fixture: ComponentFixture<OfficeMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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
