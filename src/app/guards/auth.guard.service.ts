import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authSvc: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (route.queryParams.token) {
      return new Promise((resolve, reject) => {
        this.authSvc.checkToken({ token: route.queryParams.token }).subscribe(res => {

          if (!res.success) {
            reject(this.router.navigate([''], {}));
            return false;
          }

          if (res.user) {
            return this.authSvc.setToken(res.user).subscribe(r => {
              resolve(true);
            });
          }

          reject(this.router.navigate([''], {}));
          return false;
        });
      });
    }
    else {
      const currentUser = this.authSvc.currentUserValue;

      if (currentUser) {
        return true;
      }

      this.router.navigate([''], {});
      return false;
    }
  }
}
