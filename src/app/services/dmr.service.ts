import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import { RequestService } from '@services/https/request.service';
@Injectable({
  providedIn: 'root'
})
export class DmrService {

  constructor(private http:HttpClient,private httpService:RequestService) { }
  
  GetpurchaseOrderList(): Observable<any> {
    return this.http.get(`${environment.api_path}/dmr_purchase_order`).pipe(
      catchError(this.handleError)
    );
  }
  GetDmrEntryList(): Observable<any>{
    return this.http.get(`${environment.api_path}/dmr_list`).pipe(
      catchError(this.handleError)
    );
  }
  GetApprovedpurchaseOrderList(filterObj: any){
    return this.http.get(`${environment.api_path}/dmr_purchase_order`, filterObj).pipe(
      catchError(this.handleError)
    );
  }
  getPurchaseRequestList(){
    return this.http.get(`${environment.api_path}/purchase-request`).pipe(
      catchError(this.handleError)
    );
  }
  GetRateApprovalList(){
    return this.http.get(`${environment.api_path}/rate-approval`,{}).pipe(
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
