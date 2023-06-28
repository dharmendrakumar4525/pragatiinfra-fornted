import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent} from './snackbar-component/snackbar.component';
@Injectable({
  providedIn: 'root'
})


export class SnackbarService {

  pageDir = 'ltr';
  directionClass="";
  constructor(
    private snackBar: MatSnackBar
    ) { 

    }

  notify(msg: any, type: number) {

    let className = '';
    if (type === 1) {
      className = 'snack-success';
    }
    if (type === 2) {
      className = 'snack-error';
    }
    if(this.pageDir == 'rtl'){
      this.directionClass="dir-rtl";
    } else {
      this.directionClass="dir-ltr";
      
    }
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['snackStyle',className,this.directionClass]
    });
  }

  notifyHtml(html: any, type: number) {

    let className = '';
    if (type === 1) {
      className = 'snack-success';
    }
    if (type === 2) {
      className = 'snack-error';
    }
    if(this.pageDir == 'rtl'){
      this.directionClass="dir-rtl";
    } else {

      this.directionClass="dir-ltr";
      
    }
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      data: html,
      panelClass: ['snackbar', className,this.directionClass]
    });
  }
}
