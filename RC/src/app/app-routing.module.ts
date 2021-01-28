import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './Entities/reservation/reservation.component';
import { UserComponent } from './Entities/user/user.component';
import { VehicleComponent } from './Entities/vehicle/vehicle.component';
import { AddComponent } from './add/add.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appRoutes: Routes = [
    // { path: '**', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path:'welcome/:username', component : WelcomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'users', component: UserComponent},
    { path: 'add/user', component: AddComponent},
    { path: 'edit/users/:id', component: EditComponent},
    { path: 'vehicles', component: VehicleComponent },
    { path: 'add/vehicle', component: AddComponent},
    { path: 'edit/vehicles/:id', component: EditComponent},
    { path: 'reservations', component: ReservationComponent},
    { path: 'add/reservation', component: AddComponent},
    { path: 'edit/reservations/:id', component: EditComponent},
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
