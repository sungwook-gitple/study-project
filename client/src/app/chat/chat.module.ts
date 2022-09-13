import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import config from 'src/config';
import { MyMqttClientImplV2 } from 'src/mqtt/mqttV2';
import { MyMqttClientOption } from 'src/mqtt/types';
import { AppRoutingModule } from '../app-routing.module';
import { ChatComponent } from './chat.component';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    MyMqttClientImplV2,
    { provide: 'mqttOptions', useValue: config.mqtt as MyMqttClientOption }
  ],
  exports: [ChatComponent]
})
export class ChatModule {

}
