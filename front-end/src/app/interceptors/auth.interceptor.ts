import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { GlobalService } from '../global.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
      private globalService :GlobalService
  ){}
  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ) : Observable<HttpEvent<any>> {
    if (this.globalService.isAuth()) {
        request = request.clone({
            headers: request.headers.set(
              'authorization',
              this.globalService.getToken()
            )
        });
      }
    return next.handle(request).pipe(
      catchError(e => {
          if(e && e.status && e.status === 401) {
            this.globalService.logOut();
          }
          return throwError(e);
      })
    )
  }
} 