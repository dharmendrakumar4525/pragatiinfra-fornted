import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl='http://localhost:3000/api'
  private subject = new Subject<any>();
  data = this.subject.asObservable();
  dataOpen = this.subject.asObservable();
  constructor(private http:HttpClient) { }

  updateLogin(data){
    this.subject.next(data);
  }

  updateDashboard(dataOpen){
    this.subject.next(dataOpen);
  }
  getUserss(): Observable<any> {
    
    return this.http.get(`${this.baseUrl}/users`).pipe(
      catchError(this.handleError)
    );
  }

 

  addUser(user:any): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/users/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  loginWithEmailPassword(login) : Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, login).pipe(
      catchError(this.handleError)
    );

  }

  addMemberData(membersData:any,id): Observable<any> {
    let members= {members:membersData}
    return this.http.put(`${this.baseUrl}/projects/members/${id}`, members).pipe(
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
