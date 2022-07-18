import { NgModule } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
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

import { RegistrationComponent } from './authentication/registration/registration.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonalBookingsComponent } from './bookings/personal-bookings/personal-bookings.component';
import { MapBookingsComponent } from './bookings/map-bookings/map-bookings.component';
import { MatButtonModule } from '@angular/material/button';
import { BookingCardComponent } from './bookings/personal-bookings/booking-card/booking-card.component';
import { SignOutComponent } from './authentication/sign-out/sign-out.component';
import { AdminBookingsComponent } from './bookings/admin-bookings/admin-bookings.component';
import { AccountComponent } from './authentication/account/account.component';

const routes: Routes = [
  { path: 'bookings', component: MapBookingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'personal-bookings', component: PersonalBookingsComponent },
  { path: 'sign-out', component: SignOutComponent },
  { path: 'admin-bookings', component: AdminBookingsComponent },
  { path: 'account', component: AccountComponent },
  { path: '', component: LoginComponent },
];

export function tokenGetter() {
  const user = localStorage.getItem(
    'CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.LastAuthUser'
  );
  return localStorage.getItem(
    'CognitoIdentityServiceProvider.4fq13t0k4n7rrpuvjk6tua951c.' +
      user +
      '.accessToken'
  );
}

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
    SignOutComponent,
    AdminBookingsComponent,
    AccountComponent,
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
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3333', 'example.com'],
        // disallowedRoutes: ["http://example.com/examplebadroute/"],
        authScheme: 'Bearer ', // Default value
      },
    }),
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
