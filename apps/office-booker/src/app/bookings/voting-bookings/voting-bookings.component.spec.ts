import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VotingBookingsComponent } from './voting-bookings.component';
import { RouterTestingModule } from '@angular/router/testing'
import { MatCardModule } from '@angular/material/card'
import { MatSliderModule } from '@angular/material/slider'; 
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('VotingBookingsComponent', () => {
  let component: VotingBookingsComponent;
  let fixture: ComponentFixture<VotingBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VotingBookingsComponent],
      imports: [RouterTestingModule, MatCardModule, MatSnackBarModule, MatSliderModule , HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
