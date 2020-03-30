import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  currentUser: any = null;

  displaySidebar: boolean = false;

  constructor(
      private AuthSvc: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.AuthSvc.currentUserValue;
  }

  doLogout(ev){
    ev.preventDefault();
    this.AuthSvc.logout().subscribe( res => {
        this.AuthSvc.clearSession();
        this.displaySidebar = false;
    })
  }

  showSidebar(val){
    this.displaySidebar = val;
  }

}
