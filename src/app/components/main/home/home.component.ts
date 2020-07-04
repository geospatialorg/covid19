import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SharedService} from '../../../services/shared.service';
import {DashboardService} from '../../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private sharedService: SharedService, private dashboardService: DashboardService) {
    this.sharedService.setMeta(
      null,
      'main, covid, românia, cazuri confirmate',
      'Dashboard interactiv despre cazurile COVID19 confirmate în România'
    );
  }

  ngOnInit() { }

}
