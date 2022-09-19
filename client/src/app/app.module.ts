import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './authenticated/sign-in.component';
import { ChatModule } from './chat/chat.module';
import { GlobalErrorHandler } from './common/globalErrorHandler';
import { GlobalStateService } from './global.state';
import { AuthGuard } from './guard/authGuard';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomCreationComponent } from './room/room-creation.component';
import { GlobalState } from './types';
import { SignUpComponent } from './user/sign-up/sign-up.component';

const mqttOptions: IMqttServiceOptions = {
  host: environment.mqtt.HOST,
  port: environment.mqtt.WS_PORT,
};

const globalStateInitValue: GlobalState = {
  currentRoomId: undefined,
  isUnauthorized: true,
};

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RoomListComponent,
    RoomCreationComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChatModule,
    MqttModule.forRoot(mqttOptions),
  ],
  providers: [
    GlobalStateService,
    AuthGuard,
    { provide: 'initState', useValue: globalStateInitValue },
    { provide: ErrorHandler, useClass: GlobalErrorHandler  }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
