import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {StatisticsService} from '../../../_services';
import {SharedService} from '../../../_services/shared-service.svc';

@Component({
  selector: 'app-european-context',
  templateUrl: './european-context.component.html',
  styleUrls: ['./european-context.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EuropeanContextComponent implements OnInit {

  constructor(private StatisticsSvc: StatisticsService, private sharedService: SharedService) {
    this.sharedService.setMeta(
      'Context european',
      'harta context european',
      `Harta context european`
    );
  }

  ngOnInit(): void {
  }

}
