import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from 'src/app/services';
import {environment as appConfig} from '../../../../../environments/environment';
import {combineLatest, forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.scss']
})
export class RightMenuComponent implements OnInit, OnDestroy {
  tableDataDeath: any[] = [];
  tableDataRecovered: any[] = [];
  totalDeads = 0;
  totalHealed = 0;

  interval: any = null;
  appConfig: any = appConfig;

  getDeadCasesByCounty$ = this.DashboardSvc.getDeadCasesByCounty();
  getHealthCasesByCounty$ = this.DashboardSvc.getHealthCasesByCounty();

  dataReady = false;

  constructor(private DashboardSvc: DashboardService) {}


  ngOnInit(): void {
    this.loadData();
    // this.interval = setInterval(() => {
    //   this.loadData();
    // }, this.appConfig.data_refresh);
  }

  private loadData() {
    combineLatest([this.getDeadCasesByCounty$, this.getHealthCasesByCounty$])
      .pipe(map(([deadCasesByCounty, healthCasesByCounty]) => ({deadCasesByCounty, healthCasesByCounty})))
      .subscribe(pair => {
        if (pair.deadCasesByCounty && pair.deadCasesByCounty.data && pair.deadCasesByCounty.data.data) {
          this.tableDataDeath = pair.deadCasesByCounty.data.data;
          this.totalDeads = pair.deadCasesByCounty.data.total;
        }
        if (pair.healthCasesByCounty && pair.healthCasesByCounty.data && pair.healthCasesByCounty.data.data) {
          this.tableDataRecovered = pair.healthCasesByCounty.data.data;
          this.totalHealed = pair.healthCasesByCounty.data.total;
        }

        this.dataReady = true;
      });
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

}
