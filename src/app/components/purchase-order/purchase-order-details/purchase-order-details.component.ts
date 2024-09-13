import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { GET_BRAND_API, PURCHASE_ORDER_API, ITEM_API } from '@env/api_path';
import { RequestService } from '@services/https/request.service';
import { saveAs } from 'file-saver';
import { MailPopupComponent } from '../mail-popup/mail-popup.component';

@Component({
  selector: 'app-purchase-order-details',
  templateUrl: './purchase-order-details.component.html',
  styleUrls: ['./purchase-order-details.component.scss']
})
export class PurchaseOrderDetailsComponent implements OnInit {
  term_condition = new FormControl();
  mail_section = new FormControl();
  validityDate = new FormControl();
  minDate = new Date();
  maxDate = new Date(new Date().setMonth(new Date().getMonth() + 12));
  poDetails: any;
  load: boolean = false;  // Page load flag
  downloadLoading = false;
  pageId: any;
  esignImage: any;
  brandList: any;

  constructor(
    private route: ActivatedRoute,
    private httpService: RequestService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pageId = params['id'];
      if (this.pageId) {
        // Fetch all necessary data in sequence
        this.fetchPurchaseOrderDetails(this.pageId);
      }
    });
  }

  fetchPurchaseOrderDetails(pageId: any) {
    this.httpService.GET(`${PURCHASE_ORDER_API}/detail`, { _id: pageId }).subscribe(res => {
      this.poDetails = res.data;
      this.esignImage = this.poDetails.sign;
      this.validityDate.patchValue(this.poDetails.due_date);
      this.term_condition.patchValue(this.poDetails.terms_condition);
      this.mail_section.patchValue(this.poDetails.vendor_message);
      this.mail_section.disable();
      this.term_condition.disable();
      this.validityDate.disable();

      // After fetching PO details, call getBrandList and getItemList
      this.loadData();
    });
  }

  async loadData() {
    try {
      // Call getItemList and getBrandList concurrently
      const [itemList, brandList] = await Promise.all([
        this.getItemList(),
        this.getBrandList()
      ]);

      // Update the poDetails items with the fetched item list
      this.updateItemsWithDetails(itemList);
      this.brandList = brandList;

      // After all data is loaded and processed, set load to true
      this.load = true;
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  getItemList() {
    return this.httpService.GET(ITEM_API, {}).toPromise().then(res => res.data);
  }

  getBrandList() {
    return this.httpService.GET(GET_BRAND_API, {}).toPromise().then(res => res.data);
  }

  updateItemsWithDetails(itemList) {
    console.log(itemList);
    const itemIds = this.poDetails.items.map(item => item.item.item_id);
    const itemDetailsMap = itemList.reduce((map, item) => {
      map[item._id] = item;
      return map;
    }, {});

    this.poDetails.items = this.poDetails.items.map(item => {
      const itemId = item.item.item_id;
      const details = itemDetailsMap[itemId] || {};

      return {
        ...item,
        item: {
          ...item.item,
          categoryDetail: details.categoryDetail || {},
          subCategoryDetail: details.subCategoryDetail || {},
          uomDetail: details.uomDetail || {},
          item_name: details.item_name || item.item.item_name,
          brandName: details.brandName || item.item.brandName,
          attachment: details.attachment || item.item.attachment
        }
      };
    });
    console.log("Updated Items", this.poDetails);
  }

  // Other methods remain the same...
  downloadPdf() {
    this.downloadLoading = true;
    this.httpService.GETPDF('generate/pdf', {
      template: "po",
      id: this.pageId,
    }).subscribe((res: any) => {
      this.downloadLoading = false;
      var blob = new Blob([res], { type: 'application/pdf' });
      let id = new Date().getTime();
      saveAs(blob, `po-${id}.pdf`);
    });
  }

  isBrandArray(brandName: any): string {
    // Check if brandName is an array
    if (Array.isArray(brandName)) {
      return this.getBrandNamesByIds(brandName);
    }
    // Otherwise, return the brandName as a string
    return brandName;
  }
  

 getUomName(item: any): string {
    // Check if the item and uomDetail exist
    if (item && item.uomDetail && item.uomDetail.uom_name) {
      return item.uomDetail.uom_name;
    }
    // Return a default value if uom_name is not present
    return 'Unknown UOM';
  }

  sendEmail(data) {
    this.downloadLoading = true;
    this.httpService.POST('/mail/template', {
      template: "po",
      id: this.pageId,
      mails: data
    }).subscribe(() => {
      this.downloadLoading = false;
    });
  }

  enterMail() {
    const esignPopup = this.dialog.open(MailPopupComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      autoFocus: false,
      data: this.poDetails
    });
    esignPopup.afterClosed().subscribe((result: any) => {
      if (result && result.option === 1) {
        this.sendEmail(result.data);
      }
    });
  }

  getBrandNamesByIds(brandIds): string {
    const brandMap = this.brandList.reduce((map, brand) => {
      map[brand._id] = brand.brand_name;
      return map;
    }, {} as Record<string, string>);

    return brandIds
      .map(id => brandMap[id])
      .filter(name => name)
      .join(' / ');
  }
}
