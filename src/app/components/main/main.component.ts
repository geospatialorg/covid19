import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {SharedService} from '../../services/shared.service';
import {DashboardService} from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  constructor(private sharedService: SharedService, private dashboardService: DashboardService) {
    this.sharedService.setMeta(
      null,
      'main, covid, românia',
      `Dashboard COVID`
    );
  }

  ngOnInit(): void {
  }
}
