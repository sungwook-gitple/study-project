import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { ChatComponent } from './chat/chat.component';
import { RoomListComponent } from './room-list/room-list.component';


const routes: Routes = [
  { path: '', component: AuthenticatedComponent },
  {
    path: 'rooms',
    component: RoomListComponent,
  },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
