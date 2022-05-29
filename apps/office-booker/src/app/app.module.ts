import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { BookingDialogComponent } from './bookings/booking-dialog/booking-dialog.component';
import { MenuBarComponent } from './shared/menu-bar/menu-bar.component';
import { LoginComponent } from './authentication/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { PersonalBookingsComponent } from './bookings/personal-bookings/personal-bookings.component';
import { MapBookingsComponent } from './bookings/map-bookings/map-bookings.component';

const routes: Routes = [
  { path: 'bookings', component: MapBookingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'personal-bookings', component: PersonalBookingsComponent},

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

//export const appRoutingModule = RouterModule.forRoot(routes);
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    MenuBarComponent,
    BookingDialogComponent,
    LoginComponent,
    PersonalBookingsComponent,
    MapBookingsComponent,
  ],
  entryComponents: [BookingDialogComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
    RouterModule,
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
