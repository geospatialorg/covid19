import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  lastUpdate: any;

  constructor(
    private DashboardSvc: DashboardService
  ) { }

  ngOnInit(): void {
    this.DashboardSvc.getGlobalStat().subscribe(res => {
      if(res && res.data && res.data.data) this.lastUpdate = res.data.data[0].to_char;
    });
  }

}
