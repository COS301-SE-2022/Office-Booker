import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
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
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { MatChipsModule } from '@angular/material/chips';

import { PersonalBookingsComponent } from './bookings/personal-bookings/personal-bookings.component';
import { MapBookingsComponent } from './bookings/map-bookings/map-bookings.component';
import { MatButtonModule } from '@angular/material/button';
import { BookingCardComponent } from './bookings/personal-bookings/booking-card/booking-card.component';
import { SignOutComponent } from './authentication/sign-out/sign-out.component';
import { AdminBookingsComponent } from './bookings/admin-bookings/admin-bookings.component';
import { GuestComponent } from './authentication/guest/guest.component';
import { GuestLoginComponent } from './authentication/guest-login/guest-login.component';
import { InviteGuestComponent } from './authentication/invite-guest/invite-guest.component';
import { AccountComponent } from './authentication/account/account.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { InviteDialogComponent } from './bookings/personal-bookings/invite-dialog/invite-dialog.component';
import { OverlayModule } from '@angular/cdk/overlay';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { VotingBookingsComponent } from './bookings/voting-bookings/voting-bookings.component';
import { PopupDialogComponent } from './shared/popup-dialog/popup-dialog.component';
import { PopupDialogService } from './shared/popup-dialog/popup-dialog.service';
import { DeskPopupComponent } from './bookings/map-bookings/desk-popup/desk-popup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { OfficeMakerComponent } from './office-maker/office-maker.component';
import { DraggableDirective } from './directives/draggable.directive';
import { DroppableDirective } from './directives/droppable.directive';

const routes: Routes = [
  { path: 'bookings', component: MapBookingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'personal-bookings', component: PersonalBookingsComponent },
  { path: 'sign-out', component: SignOutComponent },
  { path: 'admin-bookings', component: AdminBookingsComponent },
  { path: 'guest-registration', component: GuestComponent },
  { path: 'guest-login', component: GuestLoginComponent },
  { path: 'invite-guest', component: InviteGuestComponent },
  { path: 'account', component: AccountComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'voting-bookings', component: VotingBookingsComponent },
  { path: 'office-maker', component: OfficeMakerComponent},
  { path: 'landing-page', component: LandingPageComponent },
  { path: '', component: LandingPageComponent },
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
    GuestComponent,
    GuestLoginComponent,
    InviteGuestComponent,
    AccountComponent,
    ForgotPasswordComponent,
    InviteDialogComponent,
    VotingBookingsComponent,
    PopupDialogComponent,
    DeskPopupComponent,
    LandingPageComponent,
    OfficeMakerComponent,
    DraggableDirective,
    DroppableDirective,
  ],
  imports: [
    OverlayModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
    RouterModule,
    MatSliderModule,
    MatCardModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTreeModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatChipsModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [
          'localhost:3333',
          'api.officebooker.co.za',
          'backend:3333',
          'officebooker.co.za',
        ],
        // disallowedRoutes: ["http://example.com/examplebadroute/"],
        authScheme: 'Bearer ', // Default value
      },
    }),
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    // { provide: MatDialog, useValue: {}},
    // { provide: MAT_DIALOG_DATA, useValue: {}},
    PopupDialogService,
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
