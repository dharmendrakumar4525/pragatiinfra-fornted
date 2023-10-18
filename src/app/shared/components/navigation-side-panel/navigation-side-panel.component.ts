import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from '@services/users.service';
import { SidePanelService, SidePanelState } from '../../../core';
import { NavigationLink } from './navigation-link.model';
import { AuthService } from '@services/auth/auth.service';
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
      link_name: "Location Master",
      link: "/location",
      img: './assets/images/icons/Buser.svg',
      module_name: 'location'
    },

    {
      link_name: "UOM Manager",
      link: '/uom',
      icon: "bx bx-collection",
      img: './assets/images/icons/Bsubactivity.svg',
      module_name: ''
    },
    {
      link_name: "GST Master",
      link: "/gst",
      img: './assets/images/icons/Buser.svg',
      module_name: ''
    },
    {
      link_name: "Item Master",
      link: "/item",
      img: './assets/images/icons/Buser.svg',
      module_name: ''
    },

    {
      link_name: "Site Master",
      link: "/site",
      img: './assets/images/icons/Buser.svg',
      module_name: ''
    },
    {
      link_name: "Activity Master",
      link: "/structure",
      img: './assets/images/icons/Buser.svg',
      module_name: 'activities'
    },
    {
      link_name: "Sub Activity Master",
      link: "/activity",
      img: './assets/images/icons/Buser.svg',
      module_name: 'sub activities'
    },
    {
      link_name: "Vendor Master",
      link: "/vendor",
      img: './assets/images/icons/Broles.svg',
      module_name: ''
    }, {
      link_name: "Category Manager",
      link: "/category",
      img: './assets/images/icons/Bpermission.svg',
      module_name: ''
    },
    {
      link_name: "Sub Category Manager",
      link: '/sub-category',
      icon: "bx bx-collection",
      img: './assets/images/icons/Bactivity.svg',
      module_name: ''
    },


  ]
  sidebarMenu = [];

  sidebarAllMenu = [
    {
      link_name: "dpr",
      link: '/dpr',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/dpr.svg',
      module_name: ''

    },
    {
      link_name: "dmr",
      link: null,
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/dmr.svg',
      module_name: ''
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
      sub_menu: [
        {
          link_name: "Add Procurement",
          link: "/procurement",
          img: './assets/images/icons/Buser.svg',
          module_name: 'Add_Procurement'
        },
        {
          link_name: "Procurements List",
          link: "/procurement/prlist",
          img: './assets/images/icons/Buser.svg',
          module_name: 'Procurement_Approval'
        }
      ]
    },
    {
      link_name: "Rate Comparative",
      link: '/rate-comparative',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/Inventory.svg',
      module_name: 'Rate_Comparitive'
    },
    {
      link_name: "Rate Approval",
      link: '/rate-approval',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/Inventory.svg',
      module_name: 'Rate_Approval'
    },
    {
      link_name: "Purchase Order",
      link: '/purchase-order',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/Inventory.svg',
      module_name: 'Purchase_Order'
    },
    {
      link_name: "Inventory",
      link: '/inventory',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/Inventory.svg',
      module_name: 'Inventory'
    },

    {
      link_name: "PR status",
      link: '/prstatus',
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/PR.svg',
      module_name: ''
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
        module_name: 'users'
      }, {
        link_name: "Roles",
        link: "/roles",
        img: '../../../assets/images/icons/Broles.svg',
        module_name: 'roles'
      }, {
        link_name: "manage Permissions",
        link: "/manage-permissions",
        img: '../../../assets/images/icons/Bpermission.svg',
        module_name: 'roles'
      }
      ]
    }

  ]


  openMenu: Array<any> = [];
  modulesPermissions = [];





  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState: SidePanelState;
  public SidePanelState = SidePanelState;
  permissions: any;
  rolePermissionsView: any;
  userPermissionsView: any;
  public sideNavOpen;
  constructor(private _sidePanelService: SidePanelService, private router: Router,
    private userService: UsersService,
    private auth: AuthService,
  ) {
    this._subscriptionsSubject$ = new Subject<void>();

    this.modulesPermissions = this.auth.getPermission();


    this.sidebarMenu = this.sidebarAllMenu.filter((o: any) => {
      if (o.module_name) {
        if (this.modulesPermissions[o.module_name] && this.modulesPermissions[o.module_name].length > 0 && this.modulesPermissions[o.module_name].includes('view')) {
          return o;
        }
      } else {

        if (o.sub_menu && o.sub_menu.length > 0) {
          o.sub_menu = o.sub_menu.filter((subMenu: any) => {
            if (subMenu.module_name) {
              if (this.modulesPermissions[subMenu.module_name] && this.modulesPermissions[subMenu.module_name].length > 0 && this.modulesPermissions[subMenu.module_name].includes('view')) {
                return subMenu;
              }
            } else {
              return subMenu;
            }
          });

          if(o.sub_menu && o.sub_menu.length>0){
            return o;
          }
        } else {
          return o;
        }

      }
    });


  }

  ngOnInit(): void {

    this.permissions = JSON.parse(localStorage.getItem('loginData'))
    this.sideNavOpen = false;
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
  public isCollapse(): void {
    // console.log("hi sameer");
    this.sideNavOpen = !this.sideNavOpen;
    // console.log(this.SidePanelCollapse);
    if (this.sideNavOpen) {
      this._sidePanelService.changeState(SidePanelState.OPEN);
    }
    else {
      this._sidePanelService.changeState(SidePanelState.CLOSE);
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
    this.auth.removeUser();
    this.userService.updateLogin('logout');
    this.router.navigate(['/login']);
  }
}
