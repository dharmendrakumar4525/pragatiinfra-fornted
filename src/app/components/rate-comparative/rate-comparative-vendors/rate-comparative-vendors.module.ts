import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateComparativeVendorsComponent } from './rate-comparative-vendors.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [
        RateComparativeVendorsComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatDialogModule,
        MatNativeDateModule,
        FormsModule,
        MatIconModule,
        MatSelectModule,
    ]
})
export class RateComparativeVendorsModule { }
