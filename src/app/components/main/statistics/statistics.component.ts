import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatisticsComponent implements OnInit {
  @ViewChild('container', { static: true }) container: ElementRef
  @ViewChild('containerContent', { static: true }) containerContent: ElementRef
  links: any[];

  showArrows: boolean = false

  constructor(private sharedService: SharedService) {
    this.sharedService.setMeta(
      'Statistici',
      'statistici, covid, românia',
      `Staistici informative despre diferite aspecte privind COVID`
    );
  }

  ngOnInit(): void {
    // console.log(this.container.nativeElement.offsetWidth, this.containerContent.nativeElement.scrollWidth)
    // console.log(this.containerContent.nativeElement.scrollLeft)
    this.links = [
      {
        routerLink: '/statistici/statistici-generale',
        label: 'Statistici generale',
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
        routerLink: '/statistici/situatie-europa',
        label: 'Europa',
        classes: 'ui-button-secondary'
      },
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
      {
        routerLink: '/statistici/calitate-aer',
        label: 'Calitate aer',
        classes: 'ui-button-secondary'
      }
    ];
  }

  moveScroll(direction){
    if(direction === 'r'){
      this.containerContent.nativeElement.scrollLeft += 100;
    } else {
      this.containerContent.nativeElement.scrollLeft -= 100;
    }
    
    console.log(this.containerContent.nativeElement.scrollLeft)
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
