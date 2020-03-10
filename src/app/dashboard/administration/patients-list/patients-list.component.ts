import { Component, OnInit } from '@angular/core';
import { AdministrationService } from 'src/app/_services';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {
  tableData: any[] = [];
  tableParams: any;

  constructor(
    private AdministrationSvc: AdministrationService
  ) { }

  ngOnInit(): void {
    this.tableParams = {
      limit: 15,
      offset: 0,
      page: 1,
      lastPage: 1,
      total: 0,
      sort_column: '',
      order_type: '',
      filter: ''
    }

    this.AdministrationSvc.getCaseList(this.tableParams).subscribe( res => {
      console.log(res)
    })
  }

}
