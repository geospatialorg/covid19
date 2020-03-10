import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/_services';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  tableData: any[] = [];
  totalCases: number = 0;

  constructor(
    private DashboardSvc: DashboardService
  ) { }

  ngOnInit(): void {
    this.DashboardSvc.getCasesByCounty().subscribe( res => {
      if(res &&  res.data && res.data.data) {
        this.tableData = res.data.data;
        this.totalCases = res.data.total;
      }
    })
  }

}
