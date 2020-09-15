import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from 'src/app/services';
import {environment as appConfig} from '../../../../../environments/environment';
import {combineLatest, forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';
import {SharedService} from '../../../../services/shared.service';
import {AllCasesByCountyResponse} from '../../../../interfaces/all-cases-by-county-response';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit, OnDestroy, AfterViewInit {
  tableDataDeath: any[] = [];
  tableDataRecovered: any[] = [];
  totalDeaths = 0;
  totalHealed = 0;
  externari_gcs = 0;
  vindecari_gcs = 0;

  dataReady = false;

  constructor(private dashboardService: DashboardService) {}


  ngOnInit(): void {
    setTimeout(() => {
      this.dashboardService.currentCases.subscribe((response: AllCasesByCountyResponse) => {
        if (response.deaths && response.deaths.data) {
          this.tableDataDeath = response.deaths.data;
          this.totalDeaths = response.deaths.total;
        }
        if (response.healed && response.healed.data) {
          this.tableDataRecovered = response.healed.data;
          this.totalHealed = response.healed.total;
        }

        this.dataReady = true;
      });
    }, 10);

    this.dashboardService.getHealthCasesByCounty().subscribe(res => {
      this.externari_gcs = res.data.externari_gcs || 0;
      this.vindecari_gcs = res.data.vindecari_gcs || 0;
    });
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}

}
