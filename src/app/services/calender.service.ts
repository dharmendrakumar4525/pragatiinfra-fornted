import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  //baseUrl='http://localhost:3000/api'
  constructor(private http:HttpClient) { }
  cumutaleTotalData(subActivity:any,id): Observable<any> {
    
    return this.http.put(`${environment.local_connection}/subTasks/dailyTotalUpdate/${id}`, subActivity).pipe(
      catchError(this.handleError)
    );
  }

  addRemarks(subActivity:any,id): Observable<any> {
    
    return this.http.put(`${environment.local_connection}/subTasks/remarks/${id}`, subActivity).pipe(
      catchError(this.handleError)
    );
  }

  getProjectById(id): Observable<any> {
    
    return this.http.get(`${environment.local_connection}/projects/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
