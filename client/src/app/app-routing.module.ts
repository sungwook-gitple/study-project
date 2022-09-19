import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './authenticated/signIn.component';
import { ChatComponent } from './chat/chat.component';
import { AuthGuard } from './guard/authGuard';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomCreationComponent } from './room/room-creation.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';


const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'rooms',
    component: RoomListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'room-creation',
    component: RoomCreationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
