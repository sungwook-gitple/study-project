import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import config from 'src/config';
import { MyMqttClientImpl } from 'src/mqtt/mqtt';
import { MyMqttClientOption } from 'src/mqtt/types';
import { ChatComponent } from './chat.component';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    MyMqttClientImpl,
    { provide: 'mqttOptions', useValue: config.mqtt as MyMqttClientOption }
  ],
  exports: [ChatComponent]
})
export class ChatModule {

}
