import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddReservationsComponent } from './AddEntities/add-reservations/add-reservations.component';
import { AddUsersComponent } from './AddEntities/add-users/add-users.component';
import { AddVehiclesComponent } from './AddEntities/add-vehicles/add-vehicles.component';
import { EditReservationsComponent } from './EditEntities/edit-reservations/edit-reservations.component';
import { EditUsersComponent } from './EditEntities/edit-users/edit-users.component';
import { EditVehiclesComponent } from './EditEntities/edit-vehicles/edit-vehicles.component';
import { ReservationComponent } from './Entities/reservation/reservation.component';
import { UserComponent } from './Entities/user/user.component';
import { VehicleComponent } from './Entities/vehicle/vehicle.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  // { path: '**', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UserComponent },
  { path: 'add/user', component: AddUsersComponent },
  { path: 'edit/users/:id', component: EditUsersComponent },
  { path: 'vehicles', component: VehicleComponent },
  { path: 'add/vehicle', component: AddVehiclesComponent },
  { path: 'edit/vehicles/:id', component: EditVehiclesComponent },
  { path: 'reservations', component: ReservationComponent },
  { path: 'add/reservation', component: AddReservationsComponent },
  { path: 'edit/reservations/:id', component: EditReservationsComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
