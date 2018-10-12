import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../models/token.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq;
        console.log(req.url);
        if (!(req.url.includes('/api/session') && req.method === 'POST')
            && !(req.url.includes('/api/participants') && req.method === 'POST')
            && !(req.url.includes('/api/sites') && req.method === 'GET')) {
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