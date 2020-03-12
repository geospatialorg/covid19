import { Component, OnInit } from '@angular/core';
import { AdministrationService } from 'src/app/_services';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {
  tableData: any[] = [];
  tableParams: any;
  display: boolean = false;
  idPatient: number;
  modalTitle: string;
  countyList: any[] = [];
  myForm: FormGroup;

  constructor(
    private AdministrationSvc: AdministrationService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.tableParams = {
      limit: 10,
      offset: 0,
      page: 1,
      lastPage: 1,
      total: 0,
      sort_column: '',
      order_type: '',
      filter: ''
    }

    this.myForm = this.fb.group({
      'county_code': [null],
    });

    this.AdministrationSvc.getCountyCombo().subscribe(res => {
      if(res && res.data && res.data.data) {
        this.countyList = res.data.data;
      }
    })

    this.loadData();
  }

  filterTable() {
    let appliedFilters = {};

    if(this.myForm.value['county_code'])  {
      appliedFilters['county_code'] = this.myForm.value['county_code'].county_code;
    }

    this.tableParams.filter = JSON.stringify(appliedFilters);
    this.tableParams.page = 1;
    this.loadData();
  }

  loadData() {
    this.tableParams.offset = (this.tableParams.page - 1) * this.tableParams.limit;
    this.AdministrationSvc.getCaseList(this.tableParams).subscribe(res => {
      if (res && res.data && res.data.success) {
        this.tableData = res.data.data;
      }

      if (res.data.total >= 0) {
        this.tableParams.total = res.data.total;
        if (res.data.total == 0) this.tableParams.lastPage = 1;
      }

      if (res.data.total > 0) {
        this.tableParams.lastPage = Math.ceil(res.data.total / this.tableParams.limit);
      }
    });
  }

  changePage(val): void {
    switch (val) {
      case 'first':
        this.tableParams.page = 1;
        break;
      case 'prev':
        if (this.tableParams.page > 1) this.tableParams.page--;
        break;

      case 'next':
        if (this.tableParams.page < this.tableParams.lastPage) this.tableParams.page++;
        break;

      case 'last':
        this.tableParams.page = this.tableParams.lastPage;
        break;
    }

    this.loadData();
  }

  openAddModal(item, isEdit) {
    if(isEdit) {
      this.modalTitle = 'Editare pacient';
      this.idPatient = item.case_id;
    } else {
      this.modalTitle = 'Adăugare pacient';
    }

    this.display = true;
  }

  onDialogClose(event) {
    this.display = event;
    this.idPatient = null;
    this.loadData();
  }
}
