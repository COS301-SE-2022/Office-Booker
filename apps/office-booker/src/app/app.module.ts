import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookingsComponent } from './bookings/bookings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuBarComponent } from './menu-bar/menu-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    BookingsComponent,
    MenuBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
