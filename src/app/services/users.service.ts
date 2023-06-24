import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //baseUrl='http://awshost:3000/api'
  private subject = new Subject<any>();
  data = this.subject.asObservable();
  dataOpen = this.subject.asObservable();
  ffff:any;
  constructor(private http:HttpClient) { }

  updateLogin(data){
    this.subject.next(data);
  }

  updateDashboard(dataOpen){
    this.subject.next(dataOpen);
  }
  getUserss(): Observable<any> {
    
    return this.http.get(`${environment.api_path}/users`).pipe(
      catchError(this.handleError)
    );
  }

 

  addUser(user:any): Observable<any> {
    
    return this.http.post(`${environment.api_path}/users/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  loginWithEmailPassword(login) : Observable<any> {
    return this.http.post(`${environment.api_path}/users/login`, login).pipe(
      catchError(this.handleError)
    );

  }

  addMemberData(membersData:any,id): Observable<any> {
    let members= {members:membersData}
    return this.http.put(`${environment.api_path}/projects/members/${id}`, members).pipe(
      catchError(this.handleError)
    );
  }

  editUser(user:any,id): Observable<any> {
    
    return this.http.put(`${environment.api_path}/users/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }


  // deleteMultipleUsers(userIds){
  //   let dem= "ooo"
  //   // const options = {
  //   //   headers: new HttpHeaders({
  //   //     'Content-Type': 'application/json',
  //   //   }),
  //   //   body: {
  //   //     selUsers:userIds
  //   //   },
  //   // };
  //   //let deleteMultipleUsers = {selUsers:userIds}
  //   return this.http.delete(`${this.baseUrl}/users/${dem}`).pipe(
  //     catchError(this.handleError)
  //   );

  deleteMultipleUsers(userIds){
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
    return this.http.delete(`${environment.api_path}/users`, options).pipe(
      catchError(this.handleError)
    );
  }
  deleteUser(id:any): Observable<any> {
    
    return this.http.delete(`${environment.api_path}/users/${id}`).pipe(
      catchError(this.handleError)
    );
  }



  getUserById(id): Observable<any> {
    
    return this.http.get(`${environment.api_path}/users/${id}`).pipe(
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
