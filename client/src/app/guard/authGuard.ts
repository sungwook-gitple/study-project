import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { hasBeenAuthorized } from '../authenticated/util';
import { GlobalStateService } from '../global.state';

@Injectable()
export class AuthGuard implements CanActivate {

  isUnauthorized: boolean;

  constructor(
    private readonly router: Router,
    private readonly globalStateService: GlobalStateService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (!hasBeenAuthorized()) {
      this.router.navigateByUrl('/sign-up');
    }

    return true;

  }

}
