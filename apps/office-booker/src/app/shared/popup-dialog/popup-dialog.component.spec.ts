import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDialogComponent } from './popup-dialog.component';

describe('PopupDialogComponent', () => {
  let component: PopupDialogComponent;
  let fixture: ComponentFixture<PopupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
