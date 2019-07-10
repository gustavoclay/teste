import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
    if (req.url.includes('/oauth/token')) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError(error => {
        console.log(error);
        if (error.status === 401 && error.error.error_description.includes('Access token expired')) {
          console.log('Renovar token');
          return this.authService.refreshToken().pipe(
            mergeMap((newToken: string) => {
              req = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
              return next.handle(req);
            })
          );
        }

        return throwError(error);

      })
    );

  }
}
