import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { BookingsComponent } from './bookings/bookings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, MatGridListModule],
      declarations: [AppComponent, MenuBarComponent, BookingsComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
