import {Component, OnInit, ViewEncapsulation, HostListener} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapsComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
    onResize(event?) {
    this.isMobile = window.innerWidth < 550;

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  activeLink: any = null;

  subscription$ = null;
  submenuVisible: boolean = false;

  isMobile: boolean = window.innerWidth < 550;

  screenHeight: number;
  screenWidth: number;

  submenuItems = [
    {
      routerLink: '/harti/hospital-infrastructure',
      label: 'Infrastructura spitalicească',
    },
    {
      routerLink: '/harti/comunitati-marginalizate',
      label: 'Comunități marginalizate',
    },
    {
      routerLink: '/harti/europe',
      label: 'Context european',
    },
    {
      routerLink: '/harti/social-interest-points',
      routerLinkActive: 'ui-button-info',
      routerLinkActiveOptions: {exact: true},
      label: 'Puncte de interes social',
    },
    {
      routerLink: '/harti/frontier-situation',
      label: 'Situația la frontieră',
    },
    {
      routerLink: '/harti/no2-emission',
      label: 'Concentrații NO2',
    }
  ];

  constructor(
    private sharedService: SharedService,
    private router: Router
    ) {
    this.sharedService.setMeta(
      'Hărți',
      'hărți, covid, românia',
      `Hărți informative despre diferite aspecte privind COVID, noxe, puncte de interes social, infrastructura spitaliceasca`
    );
  }

  ngOnInit(): void {
    let current_url = this.router.url.split('?')[0];
    this.activeLink = this.submenuItems.find(e => e.routerLink === current_url);

    this.subscription$ = this.router.events.subscribe(event => {
      if( event instanceof  NavigationEnd ){
        current_url = event.url.split('?')[0];
        this.activeLink = this.submenuItems.find(e => e.routerLink === current_url);
      }
    });
  }

  showSubmenu(){
    this.submenuVisible = !this.submenuVisible;
  }

  changeRoute(){
    this.submenuVisible = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription$.unsubscribe();
  }

}
