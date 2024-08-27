import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-rate-comparative-vendors',
  templateUrl: './rate-comparative-vendors.component.html',
  styleUrls: ['./rate-comparative-vendors.component.scss']
})
export class RateComparativeVendorsComponent implements OnInit {

  formSubmitted: boolean = false;
  firstItemFreight: number = 0;
  
  vendorsList: any;
  pageDetail: any;
  items: any;
  category: any;
  subCategory: any;
  VendorDetails: any;
  tempFilteredItems: any;
  vendorItemsForm: FormGroup;
  type: any;
  vendors: any;
  filledData: any;
  brandList: any;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private snack: SnackbarService,
    public dialogRef: MatDialogRef<RateComparativeVendorsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.brandList = data.brandList;
    if (data.type) {
      this.pageDetail = data.dataObj;
      this.vendorsList = data.vendorsList;
      this.items = data.items;
      this.type = data.type;
      this.filledData = data.filledData;
      this.VendorDetails = this.vendorsList.find(obj => obj._id == this.pageDetail);
    } else {
      this.pageDetail = data.dataObj;
      this.vendorsList = data.vendorsList;
      this.items = data.items;
      this.vendors = data.vendors;
      this.filledData = data.filledData;
      this.category = this.vendors.get('Item_category').value;
      this.subCategory = this.vendors.get('Item_subCategory').value;
      this.VendorDetails = this.vendorsList.find(obj => obj._id == this.pageDetail);
      this.tempFilteredItems = this.items.filter(obj => obj.categoryDetail._id == this.category._id && obj.subCategoryDetail._id == this.subCategory._id);

      this.vendorItemsForm = new FormGroup({
        Vendor: new FormControl(this.pageDetail, Validators.required),
        category: new FormControl(this.category._id, Validators.required),
        subCategory: new FormControl(this.subCategory._id, Validators.required),
        items: this.formBuilder.array([]),
      });

      for (let i = 0; i < this.tempFilteredItems.length; i++) {
        const itemGroup = this.formBuilder.group({
          item: new FormControl(this.tempFilteredItems[i]),
          RequiredQuantity: new FormControl('', Validators.required),
          Rate: new FormControl('', Validators.required),
          SubTotalAmount: new FormControl('', Validators.required),
          Freight: new FormControl(0, Validators.required),
          Total: new FormControl('', Validators.required),
        });
        (this.vendorItemsForm.get('items') as FormArray).push(itemGroup);
      }

      if (this.filledData) {
        this.fillPage(this.filledData);
      }
    }
  }

  ngOnInit(): void {
    // Update the freight value initially if there is any data
    this.updateFirstItemFreight();

    // Subscribe to value changes if needed (optional)
    const itemsControls = this.vendorItemsForm.get('items') as FormArray;
    itemsControls.at(0).get('Freight').valueChanges.subscribe(() => {
      this.updateFirstItemFreight();
    });
  }

  fillPage(filledData: any) {
    this.vendorItemsForm = filledData.data;
  }

  myBrandName(brandId: any) {
    let brand = this.brandList.filter(brand => brand._id == brandId);
    return brand[0].brand_name;
  }

  calculateSubTotalAmount(index: number): number {
    const rate = this.vendorItemsForm.get('items').get(index.toString()).get('Rate').value;
    const requiredQuantity = this.vendorItemsForm.get('items').get(index.toString()).get('RequiredQuantity').value;
   // const freight = this.vendorItemsForm.get('items').get(index.toString()).get('Freight').value;

    this.vendorItemsForm.get('items').get(index.toString()).get('SubTotalAmount').setValue((rate * requiredQuantity));
    return rate * requiredQuantity;
  }

  calculateTotalAmount(index: number): string {
    const totalAmount = this.vendorItemsForm.get('items').get(index.toString()).get('SubTotalAmount').value +
    (this.vendorItemsForm.get('items').get(index.toString()).get('SubTotalAmount').value * this.tempFilteredItems[index].tax.amount) / 100;
     const freight = this.vendorItemsForm.get('items').get(index.toString()).get('Freight').value;

     const totalAmountAsInt = parseInt(totalAmount.toString(), 10);

    const total = totalAmountAsInt + 0;
    this.vendorItemsForm.get('items').get(index.toString()).get('Total').setValue(total);
    return total.toString();
  }

  onFreightChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newFreightValue = parseFloat(input.value) || 0;
    this.firstItemFreight = newFreightValue;

    const itemsControls = this.vendorItemsForm.get('items') as FormArray;
    if (itemsControls.length > 0) {
      itemsControls.at(0).get('Freight').setValue(newFreightValue);
      this.calculateSubTotalAmount(0);
      this.calculateTotalAmount(0);
    }
  }

  updateFirstItemFreight(): void {
    const itemsControls = this.vendorItemsForm.get('items') as FormArray;
    if (itemsControls.length > 0) {
      this.firstItemFreight = itemsControls.at(0).get('Freight').value;
    } else {
      this.firstItemFreight = 0;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickSubmit() {
    this.formSubmitted = true;
    
    if (this.vendorItemsForm.valid) {
      const itemsControls = this.vendorItemsForm.get('items') as FormArray;
      
      for (let i = 0; i < itemsControls.length; i++) {
        const itemGroup = itemsControls.at(i) as FormGroup;
  
        const rateControl = itemGroup.get('Rate');
        if (!rateControl || rateControl.value === '') {
          this._snackBar.open('Please fill in the Rate field for all items', 'Close', { duration: 3000 });
          return;
        }
  
        const quantityControl = itemGroup.get('RequiredQuantity');
        if (!quantityControl || quantityControl.value === '') {
          this._snackBar.open('Please fill in the Quantity field for all items', 'Close', { duration: 3000 });
          return;
        }
      }
      
      this.dialogRef.close({ option: 1, data: this.vendorItemsForm.value });
    } else {
      this._snackBar.open('Please fill all the required fields', 'Close', { duration: 3000 });
    }
  }
  
}
