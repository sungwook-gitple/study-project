import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './authenticated/signIn.component';
import { ChatModule } from './chat/chat.module';
import { RoomListComponent } from './room-list/room-list.component';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';

const mqttOptions: IMqttServiceOptions = {
  host: environment.mqtt.HOST,
  port: environment.mqtt.WS_PORT,
};

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RoomListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChatModule,
    MqttModule.forRoot(mqttOptions)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
