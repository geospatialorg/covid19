import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {AuthenticationService} from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;
  items: MenuItem[];

  displaySidebar = false;

  constructor(
    private AuthSvc: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.AuthSvc.currentUserValue;

    this.items =  [
      {
        label: 'COVID-19',
        icon: 'pi pi-home',
        routerLink: '/dashboard/main',
        visible: true
      },

      {
        label: 'Hărți',
        icon: 'pi pi-compass',
        routerLink: '/dashboard/maps',
        visible: true
      },
      {
        label: 'Statistici',
        icon: 'pi pi-chart-line',
        routerLink: '/dashboard/statistics',
        visible: true
      },
      {
        label: 'Manifest',
        icon: 'pi pi-users',
        routerLink: '/dashboard/manifest',
        visible: true
      },
      {
        label: 'Despre',
        icon: 'pi pi-info-circle',
        routerLink: '/dashboard/about',
        visible: true
      },
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/login',
        visible: !this.currentUser
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-in',
        routerLink: '/logout',
        visible: this.currentUser
      }

    ];
  }

  doLogout(ev) {
    ev.preventDefault();
    this.AuthSvc.logout().subscribe(res => {
      this.AuthSvc.clearSession();
      this.displaySidebar = false;
    });
  }

  showSidebar(val) {
    this.displaySidebar = val;
  }

}
