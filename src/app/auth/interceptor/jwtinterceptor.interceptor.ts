import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const loginData = sessionStorage.getItem("token");
    if(loginData) {
        request = request.clone({
            setHeaders: {
                Authorization: `${loginData}`
            }
        })
    }
    return next.handle(request)
  }
}
