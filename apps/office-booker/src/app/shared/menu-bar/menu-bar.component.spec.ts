import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../../app.component';

import { MenuBarComponent } from './menu-bar.component';
import {HttpClientModule} from '@angular/common/http';




describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [MenuBarComponent, AppComponent],
      providers: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
