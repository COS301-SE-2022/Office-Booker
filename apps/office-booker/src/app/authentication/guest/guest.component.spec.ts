import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestComponent } from './guest.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('GuestComponent', () => {
  let component: GuestComponent;
  let fixture: ComponentFixture<GuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
