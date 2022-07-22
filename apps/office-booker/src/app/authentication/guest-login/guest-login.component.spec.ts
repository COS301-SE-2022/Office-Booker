import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestLoginComponent } from './guest-login.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('GuestLoginComponent', () => {
  let component: GuestLoginComponent;
  let fixture: ComponentFixture<GuestLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestLoginComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
