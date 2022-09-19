import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServerResponse } from 'http';
import { User } from 'src/app/authenticated/types';
import { ISignUp } from 'src/app/types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements ISignUp, OnInit {

  // email = new FormControl();
  @ViewChild('f', { static: false })
  f: any;

  // email;

  constructor(private readonly router: Router) { }

  handleSubmit(event) {
    console.log('=== form event', event);
    console.log('=== form', this.f);
    console.log('=== form value', this.f.value);
    console.log('=== valid', this.f.valid);
    console.log('=== get', this.f.email);
    console.log('=== get', typeof this.f.email);
    // this.router.navigateByUrl('/sign-in');
    return false;
  }

  signUp(user: User): Promise<ServerResponse> {
    throw new Error('Method not implemented.');
  }

  gotoSignIn(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }

}
