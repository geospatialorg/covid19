import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

import { AuthenticationService } from '../services';


@Injectable()

export class JwtInterceptor implements HttpInterceptor {
    constructor(private authSvc: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.authSvc.currentUserValue;

        if(currentUser && currentUser.token){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`,
                    'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
        }

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {

            if (event instanceof HttpResponse) {
                if(event.body.data && !event.body.data.success && event.body.data.code === 'E1'){
                    // sesiune expirata
                    this.authSvc.clearSession();
                    return;
                }

                let renewToken = event.headers.get('new-access-token');

                if(renewToken){
                    this.authSvc.updateToken(renewToken);
                }
            }

            return event;
        }));

        // if(currentUser && currentUser.token){
        //     request = request.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${currentUser.token}`
        //         }
        //     });
        // }

        // return next.handle(request);
    }
}
