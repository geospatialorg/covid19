import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {StatisticsService} from '../../../_services';
import {SharedService} from '../../../_services/shared-service.svc';

@Component({
  selector: 'app-social-interest-points',
  templateUrl: './social-interest-points.component.html',
  styleUrls: ['./social-interest-points.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SocialInterestPointsComponent implements OnInit {

  constructor(private StatisticsSvc: StatisticsService, private sharedService: SharedService) {
    this.sharedService.setMeta(
      'Puncte de interes social',
      'puncte de interes, bancomate, farmacii, cabinate veterinare',
      `Puncte de interes social`
    );
  }

  ngOnInit(): void {
  }

}
