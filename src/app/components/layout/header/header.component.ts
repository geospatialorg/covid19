import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthenticationService} from 'src/app/services';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;
  menuItems: MenuItem[];

  displaySidebar = false;
  currentLang: string;

  constructor(
    private AuthSvc: AuthenticationService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.AuthSvc.currentUserValue;
    this.currentLang = this.translate.currentLang;

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });

    this.menuItems = [
      {
        label: 'COVID-19',
        icon: 'pi pi-home',
        routerLink: '',
        visible: true
      },

      {
        label: 'Hărți',
        icon: 'pi pi-compass',
        routerLink: '/harti/hospital-infrastructure',
        visible: true
      },
      {
        label: 'Statistici',
        icon: 'pi pi-chart-line',
        routerLink: '/statistici/statistici-generale',
        visible: true
      },
      {
        label: 'Impact',
        icon: 'fa fa-stethoscope',
        routerLink: '/impact',
        visible: true
      },
      {
        label: 'Jurnal aplicație',
        icon: 'pi pi-file',
        routerLink: '/jurnal-aplicatie',
        visible: true
      },
      {
        label: 'Manifest',
        icon: 'fa fa-fist-raised',
        routerLink: '/manifest',
        visible: true
      },
      // {
      //   label: 'Comunitate',
      //   icon: 'pi pi-users',
      //   routerLink: '/comunitate',
      //   visible: true
      // },
      {
        label: 'Despre',
        icon: 'pi pi-info-circle',
        routerLink: '/despre',
        visible: true
      },
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/login',
        // visible: !this.currentUser
        visible: false
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

  useLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.translate.onLangChange.unsubscribe();
  }

}
