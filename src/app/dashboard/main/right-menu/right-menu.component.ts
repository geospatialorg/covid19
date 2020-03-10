import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/_services';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html',
  styleUrls: ['./right-menu.component.css']
})
export class RightMenuComponent implements OnInit {
  tableDataDeath: any[] = [];
  tableDataRecovered: any[] = [];
  totalDeads: number = 0;
  totalHealed: number = 0;

  constructor(
    private DashboardSvc: DashboardService
  ) { }

  ngOnInit(): void {
    this.DashboardSvc.getDeadCasesByCounty().subscribe( res => {
      if(res && res.data && res.data.data) {
        this.tableDataDeath = res.data.data;
        this.totalDeads = res.data.total;
      }
    })

    this.DashboardSvc.getHealthCasesByCounty().subscribe( res => {
      if(res && res.data && res.data.data) {
        this.tableDataRecovered = res.data.data;
        this.totalHealed = res.data.total;
      }
    })
  }

}
