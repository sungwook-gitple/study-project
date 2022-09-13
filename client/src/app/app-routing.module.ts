import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './authenticated/signIn.component';
import { ChatComponent } from './chat/chat.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomCreationComponent } from './room/room-creation.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';


const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'rooms',
    component: RoomListComponent,
  },
  {
    path: 'room-creation',
    component: RoomCreationComponent,
  },
  { path: 'chat/:id', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
