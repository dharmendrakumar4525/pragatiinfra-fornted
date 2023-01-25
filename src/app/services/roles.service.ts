import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  baseUrl='http://localhost:3000/api'
  constructor(private http:HttpClient) { }

  getRoles(): Observable<any> {
    
    return this.http.get(`${this.baseUrl}/roles`).pipe(
      catchError(this.handleError)
    );
  }

  getByRole(role): Observable<any> {
    
    return this.http.get(`${this.baseUrl}/roles/role/${role}`).pipe(
      catchError(this.handleError)
    );
  }


  addRole(role:any): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/roles`, role).pipe(
      catchError(this.handleError)
    );
  }

  deleteRole(id:any): Observable<any> {
    
    return this.http.delete(`${this.baseUrl}/roles/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addPermissionsToRoles(role,permissionsObj): Observable<any> {
    console.log(permissionsObj)
    let data = {dashboard_permissions:permissionsObj}
    //let data = {role,permissionsObj}
    return this.http.put(`${this.baseUrl}/roles/update-perm/${role}`, data).pipe(
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
