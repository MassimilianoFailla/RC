import { SortVehiclesPipe } from './Pipes/sort-vehicle.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablesComponent } from './tables/tables.component';
import { PaginationPipe } from './Pipes/pagination.pipe';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortUsersPipe } from './Pipes/sort-user.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './Entities/user/user.component';
import { VehicleComponent } from './Entities/vehicle/vehicle.component';
import { ReservationComponent } from './Entities/reservation/reservation.component';
import { ButtonComponent } from './button/button.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthenticationService } from './Services/authentication.service';
import { BasicAuthHttpInterceptorService } from './Services/basic-auth-http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    TablesComponent,
    PaginationPipe,
    FilterPipe,
    SortUsersPipe,
    SortVehiclesPipe,
    UserComponent,
    VehicleComponent,
    ReservationComponent,
    LoginComponent,
    FooterComponent,
    HomeComponent,
    JumbotronComponent,
    NavbarComponent,
    ButtonComponent,
    AddComponent,
    EditComponent,
    RegisterComponent,
    WelcomeComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: BasicAuthHttpInterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }