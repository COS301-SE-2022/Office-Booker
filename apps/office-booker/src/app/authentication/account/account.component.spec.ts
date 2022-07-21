import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';

import { HttpClientTestingModule } from '@angular/common/http/testing'

import { MatCardModule } from '@angular/material/card';


describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [HttpClientTestingModule, MatCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
