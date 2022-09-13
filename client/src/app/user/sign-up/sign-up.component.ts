import { Component, OnInit } from '@angular/core';
import { ServerResponse } from 'http';
import { User } from 'src/app/authenticated/types';
import { ISignUp } from 'src/app/types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements ISignUp, OnInit {

  constructor() { }
  signUp(user: User): Promise<ServerResponse> {
    throw new Error('Method not implemented.');
  }
  gotoSignIn(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }

}
