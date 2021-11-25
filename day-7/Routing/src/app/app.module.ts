import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UserComponent } from './users/user/user.component';
// import { AppRoutingModule } from './app-routing.module';
// import { CanActivateRouteGuard } from './can-activate-route.guard';
// import { AuthService } from './auth.service';

@NgModule({
  declarations: [AppComponent, UsersComponent, LoginComponent, TopBarComponent, UserComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
