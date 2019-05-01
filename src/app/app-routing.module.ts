import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'innovations',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },

  {
    path: 'innovations',
    loadChildren: './pages/innovations/innovations.module#InnovationsPageModule',
    canActivate: [AuthGuard]
  },

  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
  },

  { path: 'signin', loadChildren: './pages/signin/signin.module#SigninPageModule' },
  { path: 'room', loadChildren: './pages/room/room.module#RoomPageModule' },
  { path: 'add-room', loadChildren: './pages/add-room/add-room.module#AddRoomPageModule' },
  { path: 'account-add', loadChildren: './pages/account-add/account-add.module#AccountAddPageModule' },
  { path: 'account', loadChildren: './pages/account/account.module#AccountPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'add-innovation', loadChildren: './pages/add-innovation/add-innovation.module#AddInnovationPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
