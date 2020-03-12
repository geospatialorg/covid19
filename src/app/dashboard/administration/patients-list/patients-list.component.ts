import { Component, OnInit } from '@angular/core';
import { AdministrationService } from 'src/app/_services';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css'],
  providers: [ConfirmationService]
})
export class PatientsListComponent implements OnInit {
  tableData: any[] = [];
  tableParams: any;
  display: boolean = false;
  idPatient: number;
  modalTitle: string;
  countyList: any[] = [];
  statusList: any[] = [];
  myForm: FormGroup;

  constructor(
    private AdministrationSvc: AdministrationService,
    private fb: FormBuilder,
    private ConfirmationSvc: ConfirmationService
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
      'case_no': [''],
      'status': [null],
      'source_no': ['']
    });

    this.statusList = [
      {
        status: 1,
        status_name: 'Confirmat'
      },
      {
        status: 2,
        status_name: 'Vindecat'
      },
      {
        status: 3,
        status_name: 'Decedat'
      }
    ]

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
    if(this.myForm.value['status'])  {
      appliedFilters['status'] = this.myForm.value['status'].status;
    }
    if(this.myForm.value['case_no'])  {
      appliedFilters['case_no'] = this.myForm.value['case_no'];
    }
    if(this.myForm.value['source_no'])  {
      appliedFilters['source_no'] = this.myForm.value['source_no'];
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

  deleteItem(caseNo) {
    this.ConfirmationSvc.confirm({
      key: 'deleteConfirm',
      message: 'Sunteți sigur(ă) că doriți să ștergeți definitiv înregistrarea?',
      accept: () => {
        this.AdministrationSvc.deleteCase({ case_id: caseNo }).subscribe(res => {
          if (res && res.data.success) {
            this.loadData();
          } else if (!res.data.success) {
            this.showMessage(res.data.message)
          }
        });
      }
    });
  }

  showMessage(msg) {
    this.ConfirmationSvc.confirm({
      key: 'warningConfirm',
      message: msg
    });
  }
}
