import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  editActivity(activity:any,id): Observable<any> {
    
    return this.http.put(`${environment.aws_connection}/masterTasks/${id}`, activity).pipe(
      catchError(this.handleError)
    );
  }

  getAllTasks(): Observable<any> {
    
    return this.http.get(`${environment.aws_connection}/masterTasks/all-tasks`).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(id:any): Observable<any> {
    console.log(id)
    return this.http.delete(`${environment.aws_connection}/masterTasks/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteMultipleActivities(roleIds){
    console.log(roleIds)

    // return this.http.delete(`${this.baseUrl}/users`, {ff:userIds}).pipe(
    //   catchError(this.handleError)
    // );
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        selUsers:roleIds
      },
    };
    //let deleteMultipleUsers = {selUsers:userIds}
    return this.http.delete(`${environment.aws_connection}/masterTasks`, options).pipe(
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

  deleteSubActivity(id:any): Observable<any> {
    
    return this.http.delete(`${environment.aws_connection}/masterSubTasks/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getSubActivities(): Observable<any> {
    
    return this.http.get(`${environment.aws_connection}/masterSubTasks/all-sub-activities`).pipe(
      catchError(this.handleError)
    );
  }

  getSubActivityById(id): Observable<any> {
    
    return this.http.get(`${environment.aws_connection}/masterSubTasks/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  editSubActivity(sa:any,id): Observable<any> {
    
    return this.http.put(`${environment.aws_connection}/masterSubTasks/${id}`, sa).pipe(
      catchError(this.handleError)
    );
  }

  getActivities(): Observable<any> {
    
    return this.http.get(`${environment.aws_connection}/masterTasks/all-tasks`).pipe(
      catchError(this.handleError)
    );
  }
  addSubActibity(sa:any): Observable<any> {
    
    return this.http.post(`${environment.aws_connection}/masterSubTasks`, sa).pipe(
      catchError(this.handleError)
    );
  }

  deleteMultipleSubActivities(userIds){
    console.log(userIds)

    // return this.http.delete(`${this.baseUrl}/users`, {ff:userIds}).pipe(
    //   catchError(this.handleError)
    // );
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        selUsers:userIds
      },
    };
    //let deleteMultipleUsers = {selUsers:userIds}
    return this.http.delete(`${environment.aws_connection}/masterSubTasks`, options).pipe(
      catchError(this.handleError)
    );
  }

}
