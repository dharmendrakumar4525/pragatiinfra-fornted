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
  masterManagementObj = [{
    link_name: "Site Master",
    link: "/site",
    img: '../../../assets/images/icons/Buser.svg',
  }, {
    link_name: "Vendor Master",
    link: "/vendor",
    img: '../../../assets/images/icons/Broles.svg',
  }, {
    link_name: "Category Manager",
    link: "/category",
    img: '../../../assets/images/icons/Bpermission.svg',
  },
  {
    link_name: "Sub Category Manager",
    link: '/sub-category',
    icon: "bx bx-collection",
    img: '../../../assets/images/icons/Bactivity.svg',
  },

  {
    link_name: "UOM Manager",
    link: '/uom',
    icon: "bx bx-collection",
    img: '../../../assets/images/icons/Bsubactivity.svg',
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


    // {
    //   link_name: "Activities",
    //   link: '/activities',
    //   icon: "bx bx-collection",
    //   img:'../../../assets/images/icons/Bactivity.svg',
    // },
    // {
    //   link_name: "Sub Activities",
    //   link: '/sub-activities',
    //   icon: "bx bx-collection",
    //   img:'../../../assets/images/icons/Bsubactivity.svg',
    //   //img:'../../../assets/images/icons/sub activity (1).svg',
    // },


    {
      link_name: "User Management",
      link: null,
      icon: "bx bx-collection",
      img: '../../../assets/images/icons/usercirlceadd.svg',
      sub_menu: [

      ]
    },
    // {
    //   link_name: "Support",
    //   link: null,
    //   icon: "bx bx-collection",
    //   img:'../../../assets/images/icons/PR.svg',
    // },

  ]
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

    if (this.permissions.user.role === 'superadmin') {

      this.obj = [{
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
      {
        link_name: "Activities",
        link: '/activities',
        icon: "bx bx-collection",
        img: '../../../assets/images/icons/Bactivity.svg',
      },

      {
        link_name: "sub Activities",
        link: '/sub-activities',
        icon: "bx bx-collection",
        img: '../../../assets/images/icons/Bsubactivity.svg',
        //img:'../../../assets/images/icons/activity.svg',
      },
      ]

    }





    if (this.permissions.user.role !== 'superadmin' && this.userPermissionsView?.isSelected) {

      this.obj = [{
        link_name: "Users",
        link: "/users",
        img: '../../../assets/images/icons/Buser.svg'
      }]



    }

    if (this.permissions.user.role !== 'superadmin' && this.rolePermissionsView?.isSelected) {

      this.obj = [{
        link_name: "Roles",
        link: "/roles",
        img: '../../../assets/images/icons/Broles.svg'
      }]

    }

    if (this.permissions.user.role !== 'superadmin' && (this.rolePermissionsView?.isSelected && this.userPermissionsView?.isSelected)) {

      this.obj = [{
        link_name: "Users",
        link: "/users",
        img: '../../../assets/images/icons/Buser.svg'
      }, {
        link_name: "Roles",
        link: "/roles",
        img: '../../../assets/images/icons/Broles.svg'
      }]

    }



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


  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  addSubItems(item) {
    console.log(item)
    if (!item?.sub_menu) {
      console.log("subb1")
      this.router.navigate([item.link]);
    } else {
      console.log("subb2")

      this.openSidebar = !this.openSidebar
      if (this.openSidebar) {
        this.menuSidebar = [
          {
            link_name: "dpr",
            link: '/dpr',
            icon: "bx bx-collection",
            img: '../../../assets/images/icons/dpr.svg',

          }, {
            link_name: "dmr",
            link: null,
            icon: "bx bx-collection",
            img: '../../../assets/images/icons/dmr.svg',
          },



          {
            link_name: "Procurements",
            link: '/purchaserequest',
            icon: "bx bx-collection",
            img: '../../../assets/images/icons/procure.svg',
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
              ...this.obj
            ]
          },
          //  {
          //   link_name: "Support",
          //   link: null,
          //   icon: "bx bx-collection",
          //   img:'../../../assets/images/icons/PR.svg',
          // },



        ]
      } else {
        this.menuSidebar = [
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
            link: '/purchaserequest',
            icon: "bx bx-collection",
            img: '../../../assets/images/icons/procure.svg',
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
              //...this.obj
            ]
          },
          //  {
          //   link_name: "Support",
          //   link: null,
          //   icon: "bx bx-collection",
          //   img:'../../../assets/images/icons/PR.svg',
          // },


          //  {
          //   link_name: "Activities",
          //   link: '/activities',
          //   icon: "bx bx-collection",
          //   img:'../../../assets/images/icons/Bactivity.svg',
          // },
          // {
          //   link_name: "sub Activities",
          //   link: '/sub-activities',
          //   icon: "bx bx-collection",
          //   img:'../../../assets/images/icons/Bsubactivity.svg',
          // },
        ]
      }

    }


  }


  logout() {
    localStorage.removeItem('loginData')
    this.userService.updateLogin('logout');
    this.router.navigate(['/login']);
  }
}
