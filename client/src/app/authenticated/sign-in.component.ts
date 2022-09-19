import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { requestSignIn } from './request';
import { setAuthorizationData } from './util';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class SignInComponent {

  @ViewChild('username', { static: true })
  usernameElm: ElementRef;
  @ViewChild('password', { static: true })
  passwordElm: ElementRef;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  async handleInput(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      await this.signIn(this.usernameElm.nativeElement.value, this.passwordElm.nativeElement.value);
      return;
    }
  }

  async handleClickSignIn(event: KeyboardEvent) {
    await this.signIn(this.usernameElm.nativeElement.value, this.passwordElm.nativeElement.value);
  }

  async signIn(username, password) {

    const result = await requestSignIn(username, password);

    if (!result) {
      return;
    }

    await setAuthorizationData({
      token: result.token,
      userId: result.userId,
      name: result.name,
    });
    this.router.navigateByUrl('/rooms');
  }
}
