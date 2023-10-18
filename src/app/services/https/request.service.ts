import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { isArray } from 'lodash';
import { Response } from '@services/https/response.model';
import { StorageCookieService } from '@services/cookie/storage-cookie.service';


@Injectable({
  providedIn: 'root'
})


export class RequestService {

  that: any;
  constructor(
    private http: HttpClient,
    private store: StorageCookieService,
  ) {
  }

  private handleError(error: HttpErrorResponse) {

    let that: any = this['that'];

    if (error.error instanceof ErrorEvent) {
      if (error.status && error.status == 403) {

        that.store.removeAll();

        setTimeout(() => {
          window.location.href = "/login";
        }, 500)
      }

      if (error.status && error.status == 402) {
        window.location.href = "/login";
      }

      if (error.status && error.status == 401) {
        that.store.removeAll();

        setTimeout(() => {
          window.location.href = "/login";
        }, 500)
      }


    } else {
      if (error.status && error.status == 403) {
        that.store.removeAll();

        setTimeout(() => {
          window.location.href = "/login";
        }, 500)
      }

      if (error.status && error.status == 401) {
        that.store.removeAll();

        setTimeout(() => {
          window.location.href = "/login";
        }, 500)
      }

      if (error.status && error.status == 402) {
        window.location.href = `/login`;
      }

      console.error(
        `Backend returned code ${error.status}, `, error);
    }


    // return an observable with a user-facing error message
    return throwError(() => error.error);
  }


  GET(URL: any, data: any) {

    URL = `${environment.api_path}${URL}`;
    let request: any, req: any = [];
    if (data) {
      const keys = Object.keys(data);
      if (keys && keys.length > 0) {
        req = keys.map(e => `${e}=${data[e]}`);
      }
      request = `${URL}?${req.join('&')}`;
    }
    else {
      request = URL
    }


    return this.http.get<Response>(request)
      .pipe(
        catchError(this.handleError.bind({ that: this, request: data })), // then handle the error

      );
  }

  POST(URL: any, request: any) {

    URL = `${environment.api_path}${URL}`;
    return this.http.post<Response>(URL, request).pipe(
      catchError(this.handleError.bind({ that: this, request: request })) // then handle the error
    );
  }

  PUT(URL: any, request: any) {
    console.log(request);

    URL = `${environment.api_path}${URL}`;
    return this.http.put<Response>(URL, request).pipe(
      catchError(this.handleError.bind({ that: this, request: request })) // then handle the error
    );
  }

  DELETE(URL: any, data: any) {

    URL = `${environment.api_path}${URL}`;
    let request: any, req: any = [];
    if (data) {
      const keys = Object.keys(data);

      if (keys && keys.length > 0) {
        req = keys.map((e) => {
          if (isArray(data[e])) {
            data[e] = JSON.stringify(data[e]);
          }
          return `${e}=${data[e]}`;

        });
      }

      request = `${URL}?${req.join('&')}`;
    }
    return this.http.delete<Response>(request)
      .pipe(
        catchError(this.handleError.bind({ that: this, request: data })) // then handle the error
      );
  }


  multipleRequests(URL: any, data: any) {
    return forkJoin(URL)
      .pipe(
        catchError(this.handleError.bind({ that: this, request: data })), // then handle the error

      );
  }



  GETPDF(URL: any, data: any) {
    URL = `${environment.api_base_path}/${URL}`;  

    if(data.isFile){
      return this.http.post(URL,data)
      .pipe(
        catchError(this.handleError.bind({ that: this, request: data }))
      );
    } else {
      return this.http.post(URL,data,{ responseType: 'arraybuffer' })
      .pipe(
        catchError(this.handleError.bind({ that: this, request: data }))
      );
    }
    
  }

}

