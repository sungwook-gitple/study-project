import { NgModule } from '@angular/core';
import config from 'src/config';
// import { chattingMqttClient } from 'src/mqtt';
import { MyMqttClientImpl } from 'src/mqtt/mqtt';
import { MyMqttClientOption } from 'src/mqtt/types';
import { RoomComponent } from './room.component';

@NgModule({
  declarations: [
    RoomComponent
  ],
  providers: [
    MyMqttClientImpl,
    { provide: 'mqttOptions', useValue: config.mqtt as MyMqttClientOption }
  ],
  exports: [RoomComponent],
})
export class ChatModule {

}
