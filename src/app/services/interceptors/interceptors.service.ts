import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { AuthService } from '@services/auth/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private auth: AuthService
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
  
        let authToken = this.auth.getToken();

        let request;
        if (authToken) {
            let requestparam:any = {
                'Authorization': `Bearer ${authToken}`,
                "X-Requested-With": 'XMLHttpRequest'
            }
            request = req.clone({ setHeaders: requestparam });
        } else {
            let requestparam: any = {
                "X-Requested-With": 'XMLHttpRequest'
            }

            request = req.clone({ setHeaders: requestparam });
        }
        return next.handle(request);
    }
}
