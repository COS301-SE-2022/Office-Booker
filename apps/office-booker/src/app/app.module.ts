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

import { RegistrationComponent } from './registration/registration.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonalBookingsComponent } from './bookings/personal-bookings/personal-bookings.component';
import { MapBookingsComponent } from './bookings/map-bookings/map-bookings.component';
import { MatButtonModule } from '@angular/material/button';
import { BookingCardComponent } from './bookings/personal-bookings/booking-card/booking-card.component';



const routes: Routes = [
  { path: 'bookings', component: BookingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'personal-bookings', component: PersonalBookingsComponent },


];

//export const appRoutingModule = RouterModule.forRoot(routes);
@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    MenuBarComponent,
    BookingDialogComponent,
    LoginComponent,
    RegistrationComponent,
    PersonalBookingsComponent,
    MapBookingsComponent,
    BookingCardComponent,
    
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
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
