import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/_services';
import { environment as appConfig } from '../../../../environments/environment';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  tableData: any[] = [];
  totalCases: number = 0;
  interval:any = null;
  appConfig:any = appConfig;

  constructor(
    private DashboardSvc: DashboardService
  ) { }

  ngOnInit(): void {
    this.DashboardSvc.getCasesByCounty().subscribe( res => {
      if(res &&  res.data && res.data.data) {
        this.tableData = res.data.data;
        this.totalCases = res.data.total;
      }
    });

    this.interval = setInterval(()=> {
      this.DashboardSvc.getCasesByCounty().subscribe( res => {
        if(res &&  res.data && res.data.data) {
          this.tableData = res.data.data;
          this.totalCases = res.data.total;
        }
      });
    }, this.appConfig.data_refresh);

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.interval) clearInterval(this.interval);
  }

}
