import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalBookingsComponent } from './personal-bookings.component';

describe('PersonalBookingsComponent', () => {
  let component: PersonalBookingsComponent;
  let fixture: ComponentFixture<PersonalBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalBookingsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
