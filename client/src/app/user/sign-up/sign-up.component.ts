import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignUp } from 'src/app/types';
import { ServerResponse } from 'src/http/types';
import { requestSignUp } from './request';
import { SignUpRequest } from './type';

type SignUpNgForm = Omit<NgForm, 'value'> & {
  value: {
    email: string,
    name: string,
    password: string,
    passwordConfirm: string,
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements ISignUp, OnInit {

  // email = new FormControl();
  @ViewChild('f', { static: false })
  signUpForm: SignUpNgForm

  isPasswordDifferent: boolean;

  constructor(private readonly router: Router) { }

  async handleSubmit(event: Event) {
    console.log('=== form event', event);
    console.log('=== form', this.signUpForm);
    console.log('=== form value', this.signUpForm.value);
    console.log('=== valid', this.signUpForm.valid);
    console.log('=== get', this.signUpForm.value.email);

    const value = this.signUpForm.value

    const validateResult = this.validateForm(this.signUpForm)
    if (!validateResult) {
      alert('입력값을 확인해주세요.')
      return
    }

    const result = await this.signUp({
      name: value.name,
      username: value.email,
      password: value.password,
    })

    if (result.result !== 'success') {
      const errorMessage = result.message === 'already existed' ? '이미 존재하는 이메일입니다.' : '회원가입에 실패했습니다.'
      console.error(errorMessage);
      alert(errorMessage)
      return;
    }

    this.router.navigateByUrl('/sign-in')
  }

  validateForm(signUpForm: SignUpNgForm) {
    if (!signUpForm.valid) {
      return false
    }

    const value = signUpForm.value

    if (value.password !== value.passwordConfirm) {
      this.isPasswordDifferent = true
      return false
    }

    return true
  }

  async signUp(user: SignUpRequest): Promise<ServerResponse> {

    return requestSignUp(user)
  }

  gotoSignIn(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
  }

}
