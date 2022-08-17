import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MatCardModule } from '@angular/material/card'
import { AdminBookingsComponent } from './admin-bookings.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

describe('AdminBookingsComponent', () => {
  let component: AdminBookingsComponent;
  let fixture: ComponentFixture<AdminBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBookingsComponent],
      imports: [RouterTestingModule, MatCardModule, HttpClientTestingModule, MatSnackBarModule, 
        MatGridListModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
