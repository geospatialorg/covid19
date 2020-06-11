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
        label: 'Statistici generale',
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
        classes: 'ui-button-secondary'
      },
      {
        routerLink: '/statistici/repartitie-cazuri-judete',
        label: 'Repartiția cazurilor pe județe',
        classes: 'ui-button-secondary'
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
      {
        routerLink: '/statistici/mobilitate',
        label: 'Mobilitate',
        classes: 'ui-button-secondary'
      },
      // {
      //   routerLink: '/statistici/mobilitate/waze',
      //   label: 'Waze',
      //   classes: 'ui-button-secondary'
      // },
      // {
      //   routerLink: '/statistici/mobilitate/apple',
      //   label: 'Apple',
      //   classes: 'ui-button-secondary'
      // },
      // {
      //   routerLink: '/statistici/mobilitate/google',
      //   label: 'Google',
      //   classes: 'ui-button-secondary'
      // },
      {
        routerLink: '/statistici/calitate-aer',
        label: 'Calitate aer',
        classes: 'ui-button-secondary'
      },
      {
        routerLink: '/statistici/situatie-europa',
        label: 'Europa',
        classes: 'ui-button-secondary'
      }
    ];

    let current_url = this.router.url.split('?')[0];
    if(current_url.includes('/statistici/mobilitate')) current_url = '/statistici/mobilitate';
    this.activeLink = this.links.find(e => e.routerLink === current_url);

    this.subscription$ = this.router.events.subscribe(event => {
      if( event instanceof  NavigationEnd ){
        current_url = event.url.split('?')[0];

        if(current_url.includes('/statistici/mobilitate')) current_url = '/statistici/mobilitate';
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
