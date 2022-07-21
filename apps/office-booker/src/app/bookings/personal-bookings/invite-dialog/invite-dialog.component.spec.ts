import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteDialogComponent } from './invite-dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


describe('InviteDialogComponent', () => {
  let component: InviteDialogComponent;
  let fixture: ComponentFixture<InviteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteDialogComponent],
      imports: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
