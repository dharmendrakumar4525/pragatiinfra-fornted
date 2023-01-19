import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  obj = [{
    link_name: "Users",
    link: "/users",
  }, {
    link_name: "Roles",
    link: "/roles",
  }, {
    link_name: "Permissions",
    link: "/permissions",
  }]
  menuSidebar = [
     {
      link_name: "User Management",
      link: null,
      icon: "bx bx-collection",
      sub_menu: [
        
      ]
    }
  ]
  private _subscriptionsSubject$: Subject<void>;
  public currentPanelState: SidePanelState;
  public SidePanelState = SidePanelState;

  constructor(private _sidePanelService: SidePanelService) {
    this._subscriptionsSubject$ = new Subject<void>();
  }

  ngOnInit(): void {
    this._sidePanelService.panelStateChanges
      .pipe(takeUntil(this._subscriptionsSubject$))
      .subscribe((state: SidePanelState) => (this.currentPanelState = state));
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

  addSubItems(){
    this.openSidebar = !this.openSidebar
    if(this.openSidebar){
      this.menuSidebar = [
        {
         link_name: "User Management",
         link: null,
         icon: "bx bx-collection",
         sub_menu: [
           ...this.obj
         ]
       }
     ]
    }else{
      this.menuSidebar = [
        {
         link_name: "User Management",
         link: null,
         icon: "bx bx-collection",
         sub_menu: [
           //...this.obj
         ]
       }
     ]
    }
    
  }
}
