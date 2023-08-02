import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from '@services/users.service';
import { SidePanelService, SidePanelState } from '../../../core';
import { NavigationLink } from './navigation-link.model';

@Component({
  selector: 'app-navigation-side-panel',
  templateUrl: './navigation-side-panel.component.html',
  styleUrls: ['./navigation-side-panel.component.scss'],
})
export class NavigationSidePanelComponent implements OnInit, OnDestroy {
  @Input()
  public links: NavigationLink[];
  openSidebar: boolean = false;
  link_name = "";
  obj = [];
  masterManagementObj = [
    {
      link_name: "Sub Activity Master",
      link: "/activity",
      img: './assets/images/icons/Buser.svg',
    },
    {
      link_name: "UOM Manager",
      link: '/uom',
      icon: "bx bx-collection",
      img: './assets/images/icons/Bsubactivity.svg',
    },
    {
      link_name: "GST Master",
      link: "/gst",
      img: './assets/images/icons/Buser.svg',
    },
    {
      link_name: "Item Master",
      link: "/item",
      img: './assets/images/icons/Buser.svg',
    },
    
    {
      link_name: "Site Master",
      link: "/site",
      img: './assets/images/icons/Buser.svg',
    },
    {
      link_name: "Activity Master",
      link: "/structure",
      img: './assets/images/icons/Buser.svg',
    },

    {
      link_name: "Vendor Master",
      link: "/vendor",
      img: './assets/images/icons/Broles.svg',
    }, {
      link_name: "Category Manager",
      link: "/category",
      img: './assets/images/icons/Bpermission.svg',
    },
    {
      link_name: "Sub Category Manager",
      link: '/sub-category',
      icon: "bx bx-collection",
      img: './assets/images/icons/Bactivity.svg',
    },

    
  ]
  menuSidebar = [
    {
      link_name: "dpr",
      link: '/dpr',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/dpr.svg',

    },
    {
      link_name: "dmr",
      link: null,
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/dmr.svg',
    },

    {
      link_name: "Procurements",
      link: '/procurement',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/procure.svg',
    },

    {
      link_name: "Master Management",
      link: null,
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/usercirlceadd.svg',
      sub_menu: [
        ...this.masterManagementObj
      ]
    },

    {
      link_name: "Inventory",
      link: '/inventory',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/Inventory.svg',
    },

    {
      link_name: "PR status",
      link: '/prstatus',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/PR.svg',
    },

    {
      link_name: "User Management",
      link: null,
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/usercirlceadd.svg',
      sub_menu: [

      ]
    }

  ]


  sidebarMenu = [
    {
      link_name: "dpr",
      link: '/dpr',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/dpr.svg',

    },
    {
      link_name: "dmr",
      link: null,
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/dmr.svg',
    },

    {
      link_name: "Master Management",
      link: null,
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/usercirlceadd.svg',
      sub_menu: [
        ...this.masterManagementObj
      ]
    },
    {
      link_name: "Procurements",
      link: null,
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/procure.svg',
      sub_menu:[
        {
          link_name: "Add Procurement",
          link: "/procurement",
          img: './assets/images/icons/Buser.svg',
        },
        {
          link_name: "Procurements List",
          link: "/procurement/prlist",
          img: './assets/images/icons/Buser.svg',
        }
      ]
    },
    {
      link_name: "Inventory",
      link: '/inventory',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/Inventory.svg',
    },

    {
      link_name: "PR status",
      link: '/prstatus',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/PR.svg',
    },

    {
      link_name: "User Management",
      link: null,
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/usercirlceadd.svg',
      sub_menu: [{
        link_name: "Users",
        link: "/users",
        img: '../../../assets/images/icons/Buser.svg',
      }, {
        link_name: "Roles",
        link: "/roles",
        img: '../../../assets/images/icons/Broles.svg',
      }, {
        link_name: "manage Permissions",
        link: "/manage-permissions",
        img: '../../../assets/images/icons/Bpermission.svg',
      },
      // {
      //   link_name: "Activities",
      //   link: '/activities',
      //   icon: "bx bx-collection",
      //   img: '../../../assets/images/icons/Bactivity.svg',
      // },

      // {
      //   link_name: "sub Activities",
      //   link: '/sub-activities',
      //   icon: "bx bx-collection",
      //   img: '../../../assets/images/icons/Bsubactivity.svg',
      //   //img:'../../../assets/images/icons/activity.svg',
      // },
      ]
    }

  ]


  openMenu: Array<any> = [];






  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState: SidePanelState;
  public SidePanelState = SidePanelState;
  permissions: any;
  rolePermissionsView: any;
  userPermissionsView: any;
  constructor(private _sidePanelService: SidePanelService, private router: Router, private userService: UsersService) {
    this._subscriptionsSubject$ = new Subject<void>();
  }

  ngOnInit(): void {

    this.permissions = JSON.parse(localStorage.getItem('loginData'))

    this.rolePermissionsView = this.permissions.permissions[0]?.ParentChildchecklist[3]?.childList[4]
    this.userPermissionsView = this.permissions.permissions[0]?.ParentChildchecklist[4]?.childList[4]

    this._sidePanelService.panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: SidePanelState) => (this.currentPanelState = state));


  }
  caseconverter(value: any) {
    if (value == 'dpr' || value == 'dmr') {
      value = value.toUpperCase()
    }
    else {
      value = value;
    }
    //console.log(value);
    return value;
  }
  ngOnDestroy(): void {
    this._subscriptionsSubject$.next();
    this._subscriptionsSubject$.complete();
  }

  public handleSingleClick(): void {
    console.log('single click');
    if (
      this.currentPanelState === SidePanelState.CLOSE ||
      this.currentPanelState === SidePanelState.COLLAPSE
    ) {
      this._sidePanelService.changeState(SidePanelState.OPEN);
    } else {
      this._sidePanelService.changeState(SidePanelState.COLLAPSE);
    }
  }



  addSubItems(item, index: any) {
    console.log(item)
    if (!item?.sub_menu) {
      this.router.navigate([item.link]);
    } else {

      this.openSidebar = !this.openSidebar

      this.openMenu[index] = !this.openMenu[index];

    }


  }


  logout() {
    localStorage.removeItem('loginData')
    this.userService.updateLogin('logout');
    this.router.navigate(['/login']);
  }
}
