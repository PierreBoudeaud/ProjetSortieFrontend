import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PathService } from './path.service';
import { Injectable } from '@angular/core';
import { TopMenuComponent } from '../top-menu-component/top-menu-component.component';
import { Token } from '../models/token.model';

@Injectable()
export class ConnexionService {

    static isAuth = localStorage.getItem('token') !== null;
    private static path: string = PathService.getAPIUrl() + 'session';

    constructor(private router: Router, private https: HttpClient) {

    }

    signIn(password: string, email: string = '', pseudo: string = '', remember: boolean = false) {
      let params: HttpParams = new HttpParams();
      params = params.set('email', email);
      params = params.set('pseudo', pseudo);
      params = params.set('password', password);
      params = params.set('remember', remember ? '1' : '0');

      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.https.post<Token>(ConnexionService.path, params, {headers: headers});
    }

    signOut() {
      this.https.delete<Token>(ConnexionService.path).toPromise().then(data => {
      });
      this.forceSignOut();
    }

    forceSignOut() {
      localStorage.removeItem('token');
      ConnexionService.isAuth = false;
      this.router.navigate(['/auth']);
    }
}
