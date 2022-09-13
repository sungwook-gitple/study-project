import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { requestSignIn } from './request';
import { setAuthorizationToken } from './util';

@Component({
  selector: 'app-sign-in',
  templateUrl: './signIn.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class SignInComponent implements OnInit {

  @ViewChild('username', { static: true })
  usernameElm: ElementRef;
  @ViewChild('password', { static: true })
  passwordElm: ElementRef;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {

  }

  ngOnInit() {}

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

    await setAuthorizationToken(result.token);
    this.router.navigateByUrl('/rooms');
  }
}
