import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../../_services/shared-service.svc';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatisticsComponent implements OnInit {
  constructor(private sharedService: SharedService) {
    this.sharedService.setMeta(
      'Statistici',
      'statistici, covid, românia',
      `Staistici informative despre diferite aspecte privind COVID`
    );
  }

  ngOnInit(): void {
  }
}
