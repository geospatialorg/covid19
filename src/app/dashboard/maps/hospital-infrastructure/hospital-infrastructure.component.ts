import { Component, OnInit } from '@angular/core';
import {StatisticsService} from '../../../_services';
import {SharedService} from '../../../_services/shared-service.svc';

@Component({
  selector: 'app-hospital-infrastructure',
  templateUrl: './hospital-infrastructure.component.html',
  styleUrls: ['./hospital-infrastructure.component.css']
})
export class HospitalInfrastructureComponent implements OnInit {

  constructor(private StatisticsSvc: StatisticsService, private sharedService: SharedService) {
    this.sharedService.setMeta(
      'Infrastructura spitale',
      'infrastructura spitale romania',
      `Infrastructura spitale`
    );
  }

  ngOnInit(): void {
  }

}
