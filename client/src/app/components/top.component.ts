import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { requestSignOut } from '../authenticated/request';
import { Router } from '@angular/router';

@Component({
  selector: 'top-bar',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopBarComponent {
  constructor(readonly router: Router) { }

  async signOut() {
    const result = await requestSignOut();
    this.router.navigateByUrl('/')
  }

}