import { Component, OnInit, Input, Output, ViewChild, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AdministrationService } from 'src/app/services';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.scss'],
  providers: [ConfirmationService]
})
export class AddNewPatientComponent implements OnInit, OnDestroy {
  @Input() display: boolean;
  @Input() idPatient: number;
  @Input() modalTitle: string;
  @Output() displayChange = new EventEmitter();

  myForm: FormGroup;
  myFormSubmitted: boolean;
  myFormErrors: any;
  myFormHasErrors: boolean = false;

  genderList: any[] = [];
  symptomList: any[] = [];
  countyList: any[] = [];

  uatList: any[] = [];
  uatResultList: any[] = [];

  ro: any;
  yearsRange: string = '2000:' + new Date().getFullYear();
  defaultDate: Date = new Date();
  maxDate: Date = new Date();


  constructor(
    private fb: FormBuilder,
    private AdminSvc: AdministrationService,
    private ConfirmationSvc: ConfirmationService
  ) { }

  ngOnInit(): void {
    setTimeout( () => {
      document.getElementById('inputDigit1').addEventListener('keydown', function(e) {
        var key   = e.keyCode ? e.keyCode : e.which;

        if (!( [8, 9, 13, 27, 46].indexOf(key) !== -1 ||
             (key == 65 && ( e.ctrlKey || e.metaKey  ) ) ||
             (key >= 35 && key <= 40) ||
             (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
             (key >= 96 && key <= 105)
           )) e.preventDefault();
      });

      document.getElementById('inputDigit2').addEventListener('keydown', function(e) {
        var key   = e.keyCode ? e.keyCode : e.which;

        if (!( [8, 9, 13, 27, 46].indexOf(key) !== -1 ||
             (key == 65 && ( e.ctrlKey || e.metaKey  ) ) ||
             (key >= 35 && key <= 40) ||
             (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
             (key >= 96 && key <= 105)
           )) e.preventDefault();
      });

      document.getElementById('inputDigit3').addEventListener('keydown', function(e) {
        var key   = e.keyCode ? e.keyCode : e.which;

        if (!( [8, 9, 13, 27, 46].indexOf(key) !== -1 ||
             (key == 65 && ( e.ctrlKey || e.metaKey  ) ) ||
             (key >= 35 && key <= 40) ||
             (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
             (key >= 96 && key <= 105)
           )) e.preventDefault();
      });
    }, 100)

    this.ro = {
      firstDayOfWeek: 1,
      dayNames: ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"],
      dayNamesShort: ["D", "L", "M", "M", "J", "V", "S"],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      monthNames: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octobrie", "Noiembrie", "Decembrie"],
      monthNamesShort: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dateFormat: 'dd-mm-yy',
      today: 'Astăzi',
      clear: 'Curăță',
      weekHeader: 'Wk',
    };

    this.myForm = this.fb.group({
      'case_no': ['', Validators.required],
      'source_no': [''],
      'diagnostic_date': [null, Validators.required],
      'healing_date': [null],
      'death_date': [null],
      'gender': [null],
      'age': [''],
      'county_code': [null],
      'siruta': [null],
      'reference': [''],
      'healed_reference': [''],
      'symptoms_flag': [null],
      'other_info': [''],
      'country_of_infection': [''],
      'volunteer': ['']
    })

    if(!this.idPatient) {
      let dd = this.defaultDate.getDate();
      let mm = this.defaultDate.getMonth()+1;
      let yyyy = this.defaultDate.getFullYear();

      let day;
      let month;
      if(dd<10)  {
        day = String('0'+dd);
      } else {
        day = dd;
      }

      if(mm<10) {
         month =String('0'+mm);
      } else {
        month = mm;
      }
      let today = day+'-'+month+'-'+yyyy;

      this.myForm.patchValue({
        'diagnostic_date': today
      })
    }


    this.loadCombos();
    this.loadData();
  }


  loadCombos() {
    this.AdminSvc.getCountyCombo().subscribe(res => {
      if(res && res.data && res.data.data) {
        this.countyList = res.data.data;
      }
    })

    this.genderList = [
      {
        gender_name: 'Masculin',
        gender: 'M'
      },
      {
        gender_name: 'Feminin',
        gender: 'F'
      }
    ]

    this.symptomList = [
      {
        symptoms_flag: 1,
        symptoms_flag_name: 'DA'
      },
      {
        symptoms_flag: 0,
        symptoms_flag_name: 'NU'
      }
    ]
  }

  loadData() {
    if(!this.idPatient) return;
    let detailsPatient = null;

    this.AdminSvc.getCaseDetails({ case_id: this.idPatient }).subscribe(res => {
      if(res && res.data && res.data.data) {
        detailsPatient = res.data.data;
      }

      let gender = this.genderList.find(item => {
        return item.gender == detailsPatient.gender;
      });
      let symptom = this.symptomList.find(item => {
        return item.symptoms_flag == detailsPatient.symptoms_flag;
      });

      this.AdminSvc.getUatCombo({ county_code: detailsPatient.county_code }).subscribe(res => {
        if(res && res.data && res.data.data) {
          this.uatList = res.data.data;

          this.myForm.patchValue({
            'case_no': detailsPatient.case_no,
            'source_no': detailsPatient.source_no,
            'diagnostic_date': detailsPatient.diagnostic_date,
            'healing_date': detailsPatient.healing_date,
            'death_date': detailsPatient.death_date,
            'gender': gender,
            'age': detailsPatient.age,
            'county_code': {
              county_code: detailsPatient.county_code,
              county: detailsPatient.county
            },
            'siruta': {
              siruta: detailsPatient.siruta,
              uat: detailsPatient.uat
            },
            'reference': detailsPatient.reference,
            'healed_reference': detailsPatient.healed_reference,
            'symptoms_flag': symptom,
            'other_info': detailsPatient.other_info,
            'country_of_infection': detailsPatient.country_of_infection,
            'volunteer': detailsPatient.volunteer
          })
        }
      })


    })
  }

  loadUatCombo() {
    if(!this.myForm.value['county_code']) {
      this.myForm.controls['siruta'].setValue(null);
      return;
    }

    this.AdminSvc.getUatCombo({ county_code: this.myForm.value['county_code'].county_code }).subscribe(res => {
      if(res && res.data && res.data.data) {
        this.uatList = res.data.data;
      }
    })
  }

  closeModal() {
    this.displayChange.emit();
    this.display = false;
  }

  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }


  saveForm() {
    this.myFormSubmitted = true;
    this.myFormHasErrors = false;

    this.myFormErrors = {
      noCaseNoSelected: this.myForm.controls['case_no'].errors &&
        this.myForm.controls['case_no'].errors['required'] || false,

      noDateSelected: this.myForm.controls['diagnostic_date'].errors &&
        this.myForm.controls['diagnostic_date'].errors['required'] || false,
    }

    for(let key in this.myFormErrors) {
      if(this.myFormErrors[key]){
        this.myFormHasErrors = true;
        return;
      }
    }

    let params = this.myForm.value;
    if(params.gender) params.gender = params.gender.gender;
    if(params.county_code) params.county_code = params.county_code.county_code;
    if(params.siruta) params.siruta = params.siruta.siruta;
    if(params.symptoms_flag) params.symptoms_flag = params.symptoms_flag.symptoms_flag;
    if(this.idPatient) params.case_id = this.idPatient;

    this.AdminSvc.setCase(params).subscribe(res => {
      if(res && res.data && res.data.success) {
        this.closeModal();
      } else if (!res.data.success) {
        this.showMessage(res.data.message)
      }
    })
  }


// FILTER FUNCTIONS FOR UAT
  filterUatCombo(event) {
    this.AdminSvc.getUatCombo({ county_code: this.myForm.value['county_code'].county_code, search_uat: event.query }).subscribe(res => {
      if (res && res.data.data) {
        this.uatList = res.data.data;
        this.uatResultList = [...this.uatList];

        if(this.uatResultList.length === 0) {
          this.myForm.controls['siruta'].setValue(null);
        }
      }
    });
  }


  showMessage(msg) {
    this.ConfirmationSvc.confirm({
      message: msg
    });
  }
}
