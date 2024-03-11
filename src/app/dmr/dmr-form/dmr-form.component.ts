import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { RecentActivityService } from '@services/recent-activity.service';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { RequestService } from '@services/https/request.service';
import { SnackbarService } from '@services/snackbar/snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { isEmpty } from 'lodash';
import { ToastService } from '@services/toast.service';
import { DMRPURCHASE_ORDER_API,DmrEntryList,CREATE_DMR_ENTRY } from '@env/api_path';
import { BehaviorSubject } from 'rxjs';
import { DmrService } from '@services/dmr.service';
import { forkJoin } from 'rxjs';
import { startWith } from 'rxjs/operators';
import {SITE_API} from '@env/api_path';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-dmr-form',
  templateUrl: './dmr-form.component.html',
  styleUrls: ['./dmr-form.component.scss']
})
export class DMRFormComponent implements OnInit{
  @ViewChild('fileInput') fileInput: ElementRef;
  recentActivities: any;
  dataReadySubject = new BehaviorSubject<boolean>(false);
  recentActivitiesLen: any;
  purchaseOrderList:any;
  PurchaseId:any;
  DmrEntryList:any;
  dmrForm: FormGroup;
  PurchaseRequestList:any=[];
  RateApprovalList:any=[];
  site:any;
  DMRPermissionsView:any;
  permissions:any;

  userChoice: string="ChallanNumber"; // This variable will hold the user's choice
  constructor(private recentActivityService: RecentActivityService,
    private httpService:RequestService,
    private snack:SnackbarService,
    private formBuilder: FormBuilder,
    private route:ActivatedRoute,
    private router:Router,
    private toast:ToastService,
    private dmrService:DmrService) { 
      this.route.params.subscribe((params:any)=>{
        this.PurchaseId=params.id;
    })
    this.dmrForm = this.formBuilder.group({
      userChoice: ['ChallanNumber'],
      DMR_No: ['', Validators.required],
      PRNumber:['', Validators.required],
      PONumber:['', Validators.required],
      NameOfOrg:['', Validators.required],
      Site:['', Validators.required],
      VendorName:['', Validators.required],
      FinalDeliveryDate:['', Validators.required],
      InvoiceOrChallanDoc:['', Validators.required],
      GateRegisterEntry: ['', Validators.required],
      VehicleNumber: ['', Validators.required],
      ChallanNumber: [''],
      InvoiceNumber: [''],
      // dmrRemarks: [''],
      Freight: ['', [Validators.required,this.onlyNumbers]],
      TotalAmount: ['', [Validators.required,this.onlyNumbers]],
      dmrdate: ['', Validators.required],
      dmritem: this.formBuilder.array([]),
    });
    this.getAllLocation()
}
     onlyNumbers(control: AbstractControl) {
      const value = control.value;
      const isNumeric = !isNaN(value) && isFinite(value);
      return isNumeric ? null : { notNumeric: true };
    }
  
  ngOnInit(): void {
    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    this.DMRPermissionsView = this.permissions.permissions[0]?.ParentChildchecklist[15]?.childList[1];
    
   // Define your observables
  const recentActivities$ = this.recentActivityService.getRecentAtivities();
  const purchaseOrderList$ = this.dmrService.GetpurchaseOrderList();
  const dmrEntryList$ = this.dmrService.GetDmrEntryList();

  const PurchaseRequestList$ = this.dmrService.getPurchaseRequestList();
  const RateApprovalList$ = this.dmrService.GetRateApprovalList();

  // Use forkJoin to wait for all observables to complete
  forkJoin([recentActivities$, purchaseOrderList$, dmrEntryList$,PurchaseRequestList$,RateApprovalList$]).subscribe(
    ([recentActivities, purchaseOrderList, dmrEntryList,PurchaseRequestList, RateApprovalList]) => {
      this.recentActivities = recentActivities;
      for (let single of this.recentActivities) {
        single.time = moment(single.createdAt).fromNow();
      }
      this.recentActivitiesLen = this.recentActivities.length;

      this.purchaseOrderList = purchaseOrderList.data.filter((item) => item._id === this.PurchaseId);
      console.log("--purchaseOrderList--");
      // // console.log( this.purchaseOrderList[0].items[0].item.item_name);
      // console.log( this.purchaseOrderList[0].items[0].item.uomDetail.uom_name);
      
      console.log( this.purchaseOrderList[0].items[0]);
      console.log("--purchaseOrderList--");

      this.DmrEntryList = dmrEntryList.filter((item) => item.PurchaseId === this.PurchaseId.toString());
      //console.log(this.DmrEntryList);
      console.log("--this.DmrEntryList--");
      console.log(dmrEntryList);
      console.log("--this.DmrEntryList--");

      this.PurchaseRequestList = PurchaseRequestList;
      this.PurchaseRequestList=this.PurchaseRequestList.data
      ///console.log(this.PurchaseRequestList);

      this.RateApprovalList = RateApprovalList//console.log(this.DmrEntryList);
      this.RateApprovalList=this.RateApprovalList.data;
     // console.log(this.RateApprovalList);
      this.dataReadySubject.next(true);
    },
    (error) => {
      // Handle errors if any of the observables fail
      console.error('Error:', error);
    }
  );
  this.once();
    
  }
  getAllLocation()
  {
    this.httpService.GET(SITE_API,{}).subscribe(res => {
      if (res && res.data) {
        this.site=res.data;
       // console.log(this.site)
      }
    },(err) => {
      if (err.errors && !isEmpty(err.errors)) {
        let errMessage = '<ul>';
        for (let e in err.errors) {
          let objData = err.errors[e];
          errMessage += `<li>${objData[0]}</li>`;
        }
        errMessage += '</ul>';
        this.snack.notifyHtml(errMessage, 2);
      } else {
        this.snack.notify(err.message, 2);
      }

    })
  }
  getSiteById(id:string)
  {
      const resultobj=this.site.find((item)=> item._id==id);
      if(resultobj)
        return resultobj.site_name;
      return;
  }
  getPurchaseRequestById(id:string){
    const resultobj=this.PurchaseRequestList.find((item)=> item._id===id);
    //console.log(resultobj);
    return resultobj;
  }
  getRateApprovalById(id:string){
    
    //console.log(this.RateApprovalList)
      let resultobj=this.RateApprovalList.find((item)=> item._id==id)||null;
      //console.log(resultobj);
      if(resultobj!=null)
        return this.getPurchaseRequestById(resultobj.purchase_request_id);
    
  }
  
  clearForm(){
    this.dmrForm.reset();
    this.once();
  }
  CreateDmr(){
    
    if (this.dmrForm.invalid) {
      this.toast.openSnackBar(
        'Enter Valid Details'
      );
      this.dmrForm.markAllAsTouched();
      return;
    }
    let flag=false; //to change the status

    //to update the total recived quantity
    for(let i=0;i<this.dmrForm.value.dmritem.length;i++)
    {
      this.purchaseOrderList[0].items[i].Totalrecived_qty= parseInt(this.purchaseOrderList[0].items[i].Totalrecived_qty, 10) +
      parseInt(this.dmrForm.value.dmritem[i].InvoiceQuantity, 10);

      if(this.purchaseOrderList[0].items[i].Totalrecived_qty<this.purchaseOrderList[0].items[i].qty)
        flag=true;
    }

    //updating status
    if(flag)
      this.purchaseOrderList[0].status="partial";
    else
      this.purchaseOrderList[0].status="completed"

    //combining the form data with its corresponding PO
    const combinedData = { ...this.dmrForm.value, ...this.purchaseOrderList};
    combinedData.PurchaseId=this.PurchaseId;
    delete combinedData['status'];
    // combinedData.status="pending"
    combinedData.InvoiceOrChallanDoc=this.imageUrl
    console.log(combinedData);

   // Creating a new DMR entry
  this.httpService.POST(CREATE_DMR_ENTRY, combinedData).pipe(
    switchMap((res) => {
      if (res) {
        // Updating the DMR purchase order
        return this.httpService.PUT(DMRPURCHASE_ORDER_API, this.purchaseOrderList);
      }
      return of(null);
    }),
    catchError((err) => {
      let errorMessage = 'An error occurred while processing the request.';
      if (err.errors && !isEmpty(err.errors)) {
        errorMessage = '<ul>';
        for (const e in err.errors) {
          const objData = err.errors[e];
          errorMessage += `<li>${objData[0]}</li>`;
        }
        errorMessage += '</ul>';
      }
      this.snack.notifyHtml(errorMessage, 2);
      return of(null);
      })).subscribe(
        () => {
        this.toast.openSnackBar('DMR Created Successfully');
        this.router.navigate(['/dmr/tableoverview']);
      }),(err) => {
      if (err.errors && !isEmpty(err.errors)) {
        let errMessage = '<ul>';
        for (let e in err.errors) {
          let objData = err.errors[e];
          errMessage += `<li>${objData[0]}</li>`;
        }
        errMessage += '</ul>';
        this.snack.notifyHtml(errMessage, 2);
      } else {
        this.snack.notify(err.message, 2);
      }
    }
  }
  once(){
    this.dataReadySubject.subscribe((dataReady) => {
        if(dataReady){
            //console.log("hi sameer"+this.dmrForm.get('InvoiceQuantity').value)
            let dmrsize=this.DmrEntryList.length+1
            this.dmrForm.get('DMR_No').setValue(this.purchaseOrderList[0].po_number+"/DMR/"+dmrsize)
            this.dmrForm.get('PONumber').setValue(this.purchaseOrderList[0].po_number)
            this.dmrForm.get('FinalDeliveryDate').setValue(moment(this.purchaseOrderList[0].due_date).format('DD-MM-YYYY'))
            this.dmrForm.get('NameOfOrg').setValue(this.purchaseOrderList[0].billing_address.company_name)
            this.dmrForm.get('VendorName').setValue(this.purchaseOrderList[0].vendor_detail.vendor_name)
            this.dmrForm.get('PRNumber').setValue(this.getRateApprovalById(this.purchaseOrderList[0].rate_approval_id).purchase_request_number);
            this.dmrForm.get('dmrdate').setValue(moment().format('DD-MM-YYYY'))
            this.dmrForm.get('Site').setValue(this.getSiteById(this.purchaseOrderList[0].site))
            this.dmrForm.get('userChoice').setValue("ChallanNumber");
            //this.dmrForm.get('TotalAmount').setValue(this.purchaseOrderList[0].vendors_total[0].total_amount);
            //console.log()
            for(let i=0;i<this.purchaseOrderList[0].items.length;i++)
            {
              const itemGroup = new FormGroup({
                InvoiceUOM:new FormControl('',Validators.required),
                InvoiceQuantity:new FormControl(0,Validators.required),
                InvoiceRate:new FormControl(0,Validators.required),
                // Freight:new FormControl(0,Validators.required),
                GST:new FormControl(0,Validators.required),
                Remarks:new FormControl(' ',Validators.required),
              });
                // Push the FormGroup to the "dmritem" FormArray
              (this.dmrForm.get('dmritem') as FormArray).push(itemGroup);
            }
            const challanNumberControl = this.dmrForm.get('ChallanNumber');
            //const invoiceNumberControl = this.dmrForm.get('InvoiceNumber');
            
            challanNumberControl.setValidators([Validators.required]);
            //invoiceNumberControl.clearValidators();
            //console.log("ChallanNumber")
            challanNumberControl.updateValueAndValidity();
            //invoiceNumberControl.updateValueAndValidity();
          }
    })
  }
  clearSearchField()
  {
      if(this.dmrForm.get('userChoice').value=="ChallanNumber")
        this.dmrForm.get('InvoiceNumber').setValue('');
      else
        this.dmrForm.get('ChallanNumber').setValue('');
      
  }
  setValidation(){
    this.dmrForm.get('userChoice').valueChanges
    .pipe(
      startWith(this.dmrForm.get('userChoice').value) // Emit the initial value
    )
    .subscribe((choice) => {

      const challanNumberControl = this.dmrForm.get('ChallanNumber');
      const invoiceNumberControl = this.dmrForm.get('InvoiceNumber');
      if (choice === 'ChallanNumber') {
        challanNumberControl.setValidators([Validators.required]);
        invoiceNumberControl.clearValidators();
      } else if (choice === 'InvoiceNumber') {
        challanNumberControl.clearValidators();
        invoiceNumberControl.setValidators([Validators.required]);
      }
      challanNumberControl.updateValueAndValidity();
      invoiceNumberControl.updateValueAndValidity();
    });
  }
  imageUrl = null
  errorMessage: string | null = null; // Initialize errorMessage to null
  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      // Check file type
      const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (allowedFileTypes.includes(file.type)) {
        // Check file size
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
        if (file.size <= maxSizeInBytes) {
          // File type and size are within the limits
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imageUrl = reader.result;
            //console.log(this.imageUrl)
            this.errorMessage = null; // Clear any previous error message
          }
        } else {
          this.fileInput.nativeElement.value = ''; // Reset the file input
          this.errorMessage = 'File size exceeds the maximum limit (5 MB).';
        }
      } else {
        this.fileInput.nativeElement.value = ''; // Reset the file input
        this.errorMessage = 'Invalid file type. Please upload a JPEG, PNG, or JPG file.';
      }
    }
  }
  
}
