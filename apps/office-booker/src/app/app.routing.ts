import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
    { path: 'bookings', component: BookingsComponent },
    { path: 'login', component: LoginComponent},

    { path: '', redirectTo: '/login', pathMatch: 'full' },
];


export const appRoutingModule = RouterModule.forRoot(routes);