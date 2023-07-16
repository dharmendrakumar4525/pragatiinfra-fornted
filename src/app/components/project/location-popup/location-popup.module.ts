import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationPopupComponent } from './location-popup.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
    declarations: [
        LocationPopupComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        MatIconModule,
        MatCheckboxModule
    ]
})
export class LocationPopupModule { }
