import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatisticsComponent implements OnInit {
  links: any[];

  constructor(private sharedService: SharedService) {
    this.sharedService.setMeta(
      'Statistici',
      'statistici, covid, românia',
      `Staistici informative despre diferite aspecte privind COVID`
    );
  }

  ngOnInit(): void {
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
      {
        routerLink: '/statistici/situatie-europa',
        label: 'Situația cazurilor în Europa',
        classes: 'ui-button-secondary'
      }
    ];
  }
}
