import {Component, OnInit} from '@angular/core';
import { DashboardService, SharedService } from 'src/app/services';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  colaborators: any[] = [];
  projects: any[] = [];
  apiLinks: any[] = [];

  pageData: any;

  constructor(private sharedService: SharedService, private dashboardService: DashboardService, private domSanitizer: DomSanitizer) {
    this.sharedService.setMeta(
      'Despre proiect',
      'despre proiect, covid, românia',
      `Detalii despre proiectul COVID 19 România`
    );
  }

  ngOnInit(): void {
    this.dashboardService.getJsonData({ file: 'despre.json' }).toPromise().then(res => {
      this.pageData = this.domSanitizer.bypassSecurityTrustHtml((res.data[0].data));
    });

    this.colaborators = [
      'Cristina Alexa',
      'Bogdan Antonescu',
      'Cristi Boboc',
      'Octavian Borcan',
      'Marius Budileanu',
      'Andrei Cipu',
      'Mihai Dumitru',
      'Bogdan Grama',
      'Claudia Ifrim',
      'Codrina Ilie',
      'Robert Ille',
      'Iulian Iuga',
      'Gabriel Iuhasz',
      'Răzvan Moldovan',
      'Marian Neagul',
      'Ion Nedelcu',
      'Silviu Panica',
      'Gabriela Stancu',
      'Daniel Urdă',
      'Ruxandra Vâlcu',
      'Cristina Vrînceanu',
      'Ionelia Drăgoi',
      'Vasile Crăciunescu'
    ].sort((a, b) => {
      let nameA: any = a.split(' ');
      nameA = nameA[nameA.length - 1].toLowerCase();

      let nameB: any = b.split(' ');
      nameB = nameB[nameB.length - 1].toLowerCase();

      return nameA.localeCompare(nameB);
    });

    this.projects = [
      {
        url: 'https://coronavirus.casajurnalistului.ro/',
        title: 'Monitorizare Coronavirus Casa Jurnalistului'
      },
      {
        url: 'https://instnsp.maps.arcgis.com/apps/opsdashboard/index.html#/5eced796595b4ee585bcdba03e30c127',
        title: 'Harta INSP'
      },
      {
        url: 'https://www.hartacoronavirus.ro',
        title: 'https://www.hartacoronavirus.ro'
      },
      {
        url: 'https://covid19-romania.appspot.com',
        title: 'https://covid19-romania.appspot.com'
      },
      {
        url: 'https://covid19ro.org',
        title: 'https://covid19ro.org'
      },
      {
        url: 'https://coronavirus-esriro.hub.arcgis.com',
        title: 'Esri Romania COVID - 19 Hub'
      },
      {
        url: 'https://datelazi.ro',
        title: 'COVID-19: Date la Zi'
      }
    ];

    this.apiLinks = [
      {
        url: 'https://covid19.geo-spatial.org/api/dashboard/getCasesByCounty',
        title: 'https://covid19.geo-spatial.org/api/dashboard/getCasesByCounty'
      },
      {
        url: 'https://covid19.geo-spatial.org/api/dashboard/getDeadCasesByCounty',
        title: 'https://covid19.geo-spatial.org/api/dashboard/getDeadCasesByCounty'
      },
      {
        url: 'https://covid19.geo-spatial.org/api/dashboard/getHealthCasesByCounty',
        title: 'https://covid19.geo-spatial.org/api/dashboard/getHealthCasesByCounty'
      },
      {
        url: 'https://covid19.geo-spatial.org/api/dashboard/getDailyCaseReport',
        title: 'https://covid19.geo-spatial.org/api/dashboard/getDailyCaseReport'
      },
      {
        url: 'https://covid19.geo-spatial.org/api/dashboard/getCaseRelations',
        title: 'https://covid19.geo-spatial.org/api/dashboard/getCaseRelations'
      },
      {
        url: 'https://covid19.geo-spatial.org/api/dashboard/getPercentageByGender',
        title: 'https://covid19.geo-spatial.org/api/dashboard/getPercentageByGender'
      },
      {
        url: 'https://covid19.geo-spatial.org/api/dashboard/getCasesByAgeGroup',
        title: 'https://covid19.geo-spatial.org/api/dashboard/getCasesByAgeGroup'
      }
    ];
  }

}
