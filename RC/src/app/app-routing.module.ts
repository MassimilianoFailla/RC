import { RouteGuardService } from './Services/route-guard.service';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
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
import { HomeUserComponent } from './home-user/home-user.component';
import { LogoutComponent } from './logout/logout.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'logout', component: LogoutComponent},
    { path: 'home', component: HomeComponent},
    { path:'home/:username', component : HomeUserComponent, canActivate: [RouteGuardService], data: {roles: ['Super', 'User']}},
    { path: 'register', component: RegisterComponent },
    { path: 'users', component: UserComponent, canActivate: [RouteGuardService], data: {roles: ['Super']}},
    { path: 'add/user', component: AddComponent, canActivate: [RouteGuardService], data: {roles: ['Super']}},
    { path: 'edit/users/:id', component: EditComponent, canActivate: [RouteGuardService], data: {roles: ['Super']}},
    { path: 'vehicles', component: VehicleComponent, canActivate: [RouteGuardService], data: {roles: ['Super', 'User']}},
    { path: 'add/vehicle', component: AddComponent, canActivate: [RouteGuardService], data: {roles: ['Super']}},
    { path: 'edit/vehicles/:id', component: EditComponent, canActivate: [RouteGuardService], data: {roles: ['Super']}},
    { path: 'reservations', component: ReservationComponent, canActivate: [RouteGuardService], data: {roles: ['Super']}},
    { path: 'add/reservation', component: AddComponent, canActivate: [RouteGuardService], data: {roles: ['User']}},
    { path: 'edit/reservations/:id', component: EditComponent, canActivate: [RouteGuardService], data: {roles: ['Super']}},
    { path: 'forbidden', component: ForbiddenComponent},
    
    // { path: 'vehicles', component: VehicleComponent},
    // { path: 'users', component: UserComponent},
    // { path: 'reservations', component: ReservationComponent},
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
