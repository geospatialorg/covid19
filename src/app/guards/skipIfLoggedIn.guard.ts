import { Injectable } from "@angular/core";
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SkipIfLoggedIn implements Resolve<any> {
    constructor( private router: Router ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any> {
        const promise = new Promise((resolve, reject) => {
            if(localStorage.getItem('currentUser')){
                resolve(this.router.navigate(['/']));
            }

            resolve(true);
        });

        return promise;
    }
}