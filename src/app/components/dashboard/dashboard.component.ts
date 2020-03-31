import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {SharedService} from '../../services/shared.service';
import {DashboardService} from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  constructor(private sharedService: SharedService, private dashboardService: DashboardService) {
    this.sharedService.setMeta(
      null,
      'dashboard, covid, românia',
      `Dashboard COVID`
    );
  }

  ngOnInit(): void {
  }
}
