import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BookingsComponent } from './bookings.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatGridListModule } from '@angular/material/grid-list';

describe('BookingsComponent', () => {
  let component: BookingsComponent;
  let fixture: ComponentFixture<BookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatGridListModule, MatDialogModule, HttpClientTestingModule],
      declarations: [BookingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
