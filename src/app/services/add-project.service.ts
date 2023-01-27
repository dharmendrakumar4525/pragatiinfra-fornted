import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AddProjectService {

  baseUrl='http://localhost:3000/api'
  constructor(private http:HttpClient) { }
  getProjects(): Observable<any> {
    
    return this.http.get(`${this.baseUrl}/projects`).pipe(
      catchError(this.handleError)
    );
  }

  getAboutUs(): Observable<any> {
    
    return this.http.get(`${this.baseUrl}/aboutUs`).pipe(
      catchError(this.handleError)
    );
  }
  addProject(project:any): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/projects`, project).pipe(
      catchError(this.handleError)
    );
  }

  addProjectById(selection:any,id): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/projects/${id}`, selection).pipe(
      catchError(this.handleError)
    );
  }

  updateActivitiesToProject(selSectionsData:any,id): Observable<any> {
    let data = {sections:selSectionsData}
    return this.http.post(`${this.baseUrl}/projects/updateMoreActivities/${id}`, data).pipe(
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

  addAboutUs(about:any): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/aboutUs`, about).pipe(
      catchError(this.handleError)
    );
  }

  updateAboutUsById(selection:any,id): Observable<any> {
    
    return this.http.put(`${this.baseUrl}/aboutUs/${id}`, selection).pipe(
      catchError(this.handleError)
    );
  }
}
