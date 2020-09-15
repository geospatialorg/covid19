import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, HostListener} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatisticsComponent implements OnInit {
  @ViewChild('container', { static: true }) container: ElementRef
  @ViewChild('containerContent', { static: true }) containerContent: ElementRef
  @HostListener('window:resize', ['$event'])
    onResize(event?) {
    this.isMobile = window.innerWidth < 550;

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  links: any[];

  showArrows: boolean = false
  activeLink: any = null;

  subscription$ = null;
  submenuVisible: boolean = false;

  isMobile: boolean = window.innerWidth < 550;

  screenHeight: number;
  screenWidth: number;

  mobilitySubmenuVisible: boolean = false;
  casesSubmenuVisible: boolean = false;
  mediuSubmenuVisible: boolean = false;
  europaSubmenuVisible: boolean = false;

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {
    this.sharedService.setMeta(
      'Statistici',
      'statistici, covid, românia',
      `Staistici informative despre diferite aspecte privind COVID`
    );
  }

  ngOnInit(): void {

    if ( window.location !== window.parent.location ) { 
      this.isMobile = true;
    }
    
    // console.log(this.container.nativeElement.offsetWidth, this.containerContent.nativeElement.scrollWidth)
    // console.log(this.containerContent.nativeElement.scrollLeft)
    this.links = [
      {
        routerLink: '/statistici/statistici-generale',
        label: 'Cazuri',
        classes: 'ui-button-secondary'
      },
      {
        routerLink: '/statistici/decese',
        label: 'Decese',
        classes: 'ui-button-secondary'
      },
      {
        routerLink: '/statistici/relationare-cazuri',
        label: 'Relaționare cazuri',
        classes: 'ui-button-secondary',
        hidden: true
      },
      {
        routerLink: '/statistici/repartitie-cazuri-judete',
        label: 'Repartiția cazurilor pe județe',
        classes: 'ui-button-secondary',
        hidden: true
      },
      // {
      //   routerLink: '/statistici/situatie-europa',
      //   label: 'Cazuri în Europa (heatmap)',
      //   classes: 'ui-button-secondary'
      // },
      // {
      //   routerLink: '/statistici/situatie-europa-grafic',
      //   label: 'Cazuri în Europa (grafic)',
      //   classes: 'ui-button-secondary'
      // },
      
      {
        routerLink: '/statistici/teste-efectuate',
        label: 'Teste efectuate',
        classes: 'ui-button-secondary'
      },
      // {
      //   routerLink: '/statistici/mobilitate',
      //   label: 'Mobilitate',
      //   classes: 'ui-button-secondary'
      // },
      {
        routerLink: '/statistici/calitate-aer',
        label: 'Mediu',
        classes: 'ui-button-secondary'
      },
      {
        routerLink: '/statistici/temperatura-apa-mare',
        label: 'Temperatura apei mării',
        classes: 'ui-button-secondary',
        hidden: true
      },
      {
        routerLink: '/statistici/interes-public',
        label: 'Interes public',
        classes: 'ui-button-secondary'
      },
      {
        routerLink: '/statistici/situatie-europa',
        label: 'Europa',
        classes: 'ui-button-secondary'
      },
      {
        routerLink: '/statistici/situatie-europa/cazuri-active',
        label: 'Cazuri active',
        classes: 'ui-button-secondary',
        hidden: true
      },
      {
        routerLink: '/statistici/situatie-europa/cazuri-confirmate',
        label: 'Cazuri confirmate',
        classes: 'ui-button-secondary',
        hidden: true
      },
      {
        routerLink: '/statistici/situatie-europa/decese',
        label: 'Decese',
        classes: 'ui-button-secondary',
        hidden: true
      }
    ];

    let current_url = this.router.url.split('?')[0];
    // if(current_url.includes('/statistici/statistici-generale')) current_url = '/statistici';
    if(current_url.includes('/statistici/mobilitate')) current_url = '/statistici/mobilitate';
    if(current_url.includes('/statistici/temperatura-apa-mare')) current_url = '/statistici/temperatura-apa-mare';

    this.activeLink = this.links.find(e => e.routerLink === current_url);

    this.subscription$ = this.router.events.subscribe(event => {
      if( event instanceof  NavigationEnd ){
        current_url = event.url.split('?')[0];

        // if(current_url.includes('/statistici/statistici-generale')) current_url = '/statistici';
        if(current_url.includes('/statistici/mobilitate')) current_url = '/statistici/mobilitate';
        if(current_url.includes('/statistici/temperatura-apa-mare')) current_url = '/statistici/temperatura-apa-mare';
        
        this.activeLink = this.links.find(e => e.routerLink === current_url);
      }
    });
  }

  moveScroll(direction){
    if(direction === 'r'){
      this.containerContent.nativeElement.scrollLeft += 100;
    } else {
      this.containerContent.nativeElement.scrollLeft -= 100;
    }
    
    console.log(this.containerContent.nativeElement.scrollLeft)
  }

  showSubmenu(){
    this.submenuVisible = !this.submenuVisible;
  }

  changeRoute(item){
    if(item.label === 'Mobilitate') {
      this.mobilitySubmenuVisible = !this.mobilitySubmenuVisible;
      return;
    }

    if(item.label === 'Cazuri') {
      this.casesSubmenuVisible = !this.casesSubmenuVisible;
      return;
    }

    if(item.label === 'Mediu') {
      this.mediuSubmenuVisible = !this.mediuSubmenuVisible;
      return;
    }
    
    if(item.label === 'Europa') {
      this.europaSubmenuVisible = !this.europaSubmenuVisible;
      return;
    }

    this.submenuVisible = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.subscription$) this.subscription$.unsubscribe();
  }

//   $('.scrollleft').click(function () {
//     console.log('ok')
//     $('#scrollbar').animate({
//         scrollLeft: '-=153'
//     }, 1000, 'easeOutQuad');
// });
// $('.scrollright').click(function () {
//     console.log('ok')
//     $('#scrollbar').animate({
//         scrollLeft: '+=153'
//     }, 1000, 'easeOutQuad');
// });
}
