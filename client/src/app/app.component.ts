import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { setTheme } from 'ngx-bootstrap/utils';
import { getAuthorizationToken, getUser } from './authenticated/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';

  currentRoomId;

  constructor(
    private readonly router: Router
  ) {
    setTheme('bs4');
  }

  ngOnInit(): void {
    const token = getAuthorizationToken();
    const user = getUser();

    if (!token || !user.id || !user.name) {
      this.router.navigateByUrl('/sign-up');
    }

    this.router.navigateByUrl('/rooms');
  }

  setCurrentRoomId(event: { roomId: string }) {
    console.log('== testEvent', event);
    this.currentRoomId = event.roomId;
  }


}
