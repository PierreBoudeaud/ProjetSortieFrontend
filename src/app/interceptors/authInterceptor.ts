import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../models/token.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq;
        if (!(req.url.includes('/api/session') && req.method === 'POST')) {
            const token: Token = JSON.parse(localStorage.getItem('token'));
            let headers = req.headers.append('X-Authorization', token.token);
            headers = headers.append('Content-Type', 'application/json');
            authReq = req.clone({
                headers: headers
            });
        } else {
            authReq = req;
        }

        return next.handle(authReq);
    }
}