import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFloorDialogComponent } from './new-floor-dialog.component';

describe('NewFloorDialogComponent', () => {
  let component: NewFloorDialogComponent;
  let fixture: ComponentFixture<NewFloorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewFloorDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewFloorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
