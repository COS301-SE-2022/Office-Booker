import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
    { path: '', component: BookingsComponent },
    { path: 'login', component: LoginComponent},

    { path: '**', redirectTo: ''}
];

export const appRoutingModule = RouterModule.forRoot(routes);