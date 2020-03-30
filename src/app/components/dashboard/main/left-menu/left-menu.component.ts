import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/services';
import { environment as appConfig } from '../../../../../environments/environment';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftMenuComponent implements OnInit {
  @ViewChild(Dialog, {static: true}) dialog;

  tableData: any[] = [];
  totalCases: number = 0;
  interval:any = null;
  appConfig:any = appConfig;
  displayDisclaimer: boolean = false;

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

    // this.interval = setInterval(()=> {
    //   this.DashboardSvc.getCasesByCounty().subscribe( res => {
    //     if(res &&  res.data && res.data.data) {
    //       this.tableData = res.data.data;
    //       this.totalCases = res.data.total;
    //     }
    //   });
    // }, this.appConfig.data_refresh);

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.interval) clearInterval(this.interval);
  }

  showDisclaimer(val){
    this.displayDisclaimer = val;
    if(val) this.centerModal();
  }

  centerModal() {
    let modal = this.dialog;
    setTimeout(function () {
      modal.center();
    });
  }

}
