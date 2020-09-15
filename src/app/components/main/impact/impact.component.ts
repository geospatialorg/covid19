import { Component, OnInit, HostListener } from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-impact',
  templateUrl: './impact.component.html',
  styleUrls: ['./impact.component.scss']
})
export class ImpactComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
    onResize(event?) {
    this.isMobile = window.innerWidth < 550;

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  
  links: any[];

  activeLink: any = null;

  subscription$ = null;
  
  submenuVisible: boolean = false;
  isMobile: boolean = window.innerWidth < 550;

  screenHeight: number;
  screenWidth: number;

  mobilitySubmenuVisible: boolean = false;


  activeSubmenu: any =  null;
  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {
    this.sharedService.setMeta(
      'Impact',
      'impact, covid, românia',
      ``
    );
  }

  ngOnInit(): void {
    if ( window.location !== window.parent.location ) { 
      this.isMobile = true;
    }

    this.links = [
      {
        label: 'Mobilitate',
        routerLink: '/impact/mobilitate',
        classes: 'ui-button-secondary',
        hidden: false,
        children: [
          {
            label: 'Apple',
            routerLink: '/impact/mobilitate/apple',
            hidden: false
          },
          {
            label: 'Google',
            routerLink: '/impact/mobilitate/google',
            hidden: false
          },
          {
            label: 'Frontieră',
            routerLink: '/impact/mobilitate/frontiera',
            hidden: false
          },
          {
            label: 'Trafic aerian',
            routerLink: '/impact/mobilitate/trafic-aerian',
            hidden: false
          },
          {
            label: 'Waze',
            routerLink: '/impact/mobilitate/waze',
            hidden: false
          }
        ]
      },
      {
        label: 'Agricultură',
        routerLink: '/impact/agricultura',
        classes: 'ui-button-secondary',
        hidden: false,
        children: [
          {
            label: 'Sacrificări animale',
            routerLink: '/impact/agricultura/sacrificari-animale',
            hidden: false
          }
        ]
      },
      {
        label: 'Media',
        routerLink: '/impact/media',
        classes: 'ui-button-secondary',
        hidden: false,
        children: [
          {
            label: 'Audiențe TV',
            routerLink: '/impact/media/audiente-tv',
            hidden: false
          }
        ]
      },
      {
        label: 'Turism',
        routerLink: '/impact/turism',
        classes: 'ui-button-secondary',
        hidden: false,
        children: [
          {
            label: 'Structuri primire turistică',
            routerLink: '/impact/turism/structuri-primire-turistica',
            hidden: false
          }
        ]
      },
      {
        label: 'Populație',
        routerLink: '/impact/populatie',
        classes: 'ui-button-secondary',
        hidden: false,
        children: [
          {
            label: 'Mișcarea naturală',
            routerLink: '/impact/populatie/miscarea-naturala',
            hidden: false
          },
          {
            label: 'Forța de muncă',
            routerLink: '/impact/populatie/forta-munca',
            hidden: false
          }
        ]
      },
      {
        label: 'Imobiliare',
        routerLink: '/impact/imobiliare',
        classes: 'ui-button-secondary',
        hidden: false,
        children: [
          {
            label: 'Autorizații',
            routerLink: '/impact/imobiliare/autorizatii',
            hidden: false
          },
          {
            label: 'Dinamica',
            routerLink: '/impact/imobiliare/dinamica',
            hidden: false
          },
          {
            label: 'Prețuri',
            routerLink: '/impact/imobiliare/preturi',
            hidden: false
          }
        ]
      },
      {
        label: 'Auto',
        routerLink: '/impact/auto',
        classes: 'ui-button-secondary',
        hidden: false,
        children: [
          {
            label: 'Înmatriculare',
            routerLink: '/impact/auto/inmatriculare',
            hidden: false
          },
          {
            label: 'Preț combustibili',
            routerLink: '/impact/auto/pret-combustibili',
            hidden: false
          }
        ]
      },
      {
        label: 'Economie',
        routerLink: '/impact/economie',
        classes: 'ui-button-secondary',
        hidden: false,
        children: [
          {
            label: 'Curs valutar',
            routerLink: '/impact/economie/curs-valutar',
            hidden: false
          },
          {
            label: 'Indici',
            routerLink: '/impact/economie/indici',
            hidden: false
          },
          {
            label: 'Comerț și servicii',
            routerLink: '/impact/economie/comert-servicii',
            hidden: false
          },
          {
            label: 'Indicatori monetari',
            routerLink: '/impact/economie/indicatori-monetari',
            hidden: false
          }
        ]
      }
    ];

    let current_url = this.router.url.split('?')[0];

    if(current_url.includes('/impact/mobilitate')) current_url = '/impact/mobilitate';
    if(current_url.includes('/impact/agricultura')) current_url = '/impact/agricultura';
    if(current_url.includes('/impact/media')) current_url = '/impact/media';
    if(current_url.includes('/impact/turism')) current_url = '/impact/turism';
    if(current_url.includes('/impact/populatie')) current_url = '/impact/populatie';
    if(current_url.includes('/impact/imobiliare')) current_url = '/impact/imobiliare';
    if(current_url.includes('/impact/auto')) current_url = '/impact/auto';
    if(current_url.includes('/impact/economie')) current_url = '/impact/economie';

    this.activeLink = this.links.find(e => e.routerLink === current_url);

    this.subscription$ = this.router.events.subscribe(event => {
      if( event instanceof  NavigationEnd ){
        current_url = event.url.split('?')[0];

        if(current_url.includes('/impact/mobilitate')) current_url = '/impact/mobilitate';
        if(current_url.includes('/impact/agricultura')) current_url = '/impact/agricultura';
        if(current_url.includes('/impact/media')) current_url = '/impact/media';
        if(current_url.includes('/impact/turism')) current_url = '/impact/turism';
        if(current_url.includes('/impact/populatie')) current_url = '/impact/populatie';
        if(current_url.includes('/impact/imobiliare')) current_url = '/impact/imobiliare';
        if(current_url.includes('/impact/auto')) current_url = '/impact/auto';
        if(current_url.includes('/impact/economie')) current_url = '/impact/economie';
        
        this.activeLink = this.links.find(e => e.routerLink === current_url);
      }
    });
  }

  showSubmenu(){
    this.submenuVisible = !this.submenuVisible;
  }

  changeRoute(item){
    this.activeSubmenu = item.label;
    this.submenuVisible = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscription$) this.subscription$.unsubscribe();
  }
}
