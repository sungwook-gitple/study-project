import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { requestSignIn } from './request';
import { setAuthorizationToken } from './util';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  async signIn() {

    const result = await requestSignIn();

    if (!result) {
      return;
    }

    await setAuthorizationToken(result.token);

    console.log('result');
  }
}
