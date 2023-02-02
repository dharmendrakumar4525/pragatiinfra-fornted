import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  //baseUrl='http://localhost:3000/api'
  constructor(private http:HttpClient) { }

  getTasks(): Observable<any> {
    
    return this.http.get(`${environment.aws_connection}/masterTasks`).pipe(
      catchError(this.handleError)
    );
  }

  getOnlyTasks(): Observable<any> {
    
    return this.http.get(`${environment.aws_connection}/tasks`).pipe(
      catchError(this.handleError)
    );
  }

  addTask(task:any): Observable<any> {
    
    return this.http.post(`${environment.aws_connection}/masterTasks`, task).pipe(
      catchError(this.handleError)
    );
  }

  addSubTask(task:any): Observable<any> {
    
    return this.http.post(`${environment.aws_connection}/masterSubTasks`, task).pipe(
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
