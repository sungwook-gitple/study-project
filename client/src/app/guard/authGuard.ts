import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalStateService } from '../global.state';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  isUnauthorized: boolean;

  constructor(
    private readonly router: Router,
    private readonly globalStateService: GlobalStateService,
  ) {
    this.globalStateService.subscribe(value => {
      console.log('auth value', value);
      this.isUnauthorized = value.isUnauthorized;
    });
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Promise<boolean> | Observable<boolean> {
    console.log('=== canload');
    throw new Error('Method not implemented.');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('=== can activate');

    if (this.isUnauthorized) {
      this.router.navigateByUrl('/sign-up');
    }

    return true;

  }

}
