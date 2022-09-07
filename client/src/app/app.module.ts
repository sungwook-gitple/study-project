import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';
import { XyzComponent } from './xyz/xyz.component';
import { HttpClientModule } from '@angular/common/http';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomComponent } from './chat/room.component';
import { ChatModule } from './chat/chat.module';
import { EventBus } from 'src/event/EventBus';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticatedComponent,
    XyzComponent,
    RoomListComponent,
    // RoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChatModule,
  ],
  providers: [
    RoomComponent,
    EventBus
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
