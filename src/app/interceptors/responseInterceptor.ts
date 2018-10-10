import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { TopMenuComponent } from "../top-menu-component/top-menu-component.component";

export class ResponseInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      return next.handle(request).pipe(
          tap( event => {

          },
          error => {
              if(error instanceof HttpErrorResponse) {
                const responseError: HttpErrorResponse = error;
                switch(responseError.status) {
                    case 401:
                        TopMenuComponent.logOut();
                        break;
                }
              }
          })  
      );
    }
  }