import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardsGuard } from './auth-guards.guard';
import { LoginComponent } from './login/login.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    canActivate: [AuthGuardsGuard],
    canActivateChild: [AuthGuardsGuard],
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      { path: 'user/:id', component: UserComponent },
    ],
  },

  {
    path: 'topbar',
    component: TopBarComponent,
  },

  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
