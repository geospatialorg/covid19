import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { Chart } from 'chart.js';
import * as regression from 'regression';
import * as palette from 'google-palette';
import * as pluginPiechartOutlabels from 'chartjs-plugin-piechart-outlabels';
import * as pluginAnnotation from 'chartjs-plugin-annotation';
import {SharedService} from '../../../../services/shared.service';
import {environment} from '../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-general-statistics',
  templateUrl: './general-statistics.component.html',
  styleUrls: ['./general-statistics.component.scss']
})
export class GeneralStatisticsComponent implements OnInit {
  @ViewChild('canvasDailyCases', {static: true}) canvasDailyCases: ElementRef;
  @ViewChild('canvasGrowthRate', {static: true}) canvasGrowthRate: ElementRef;
  @ViewChild('canvasDistributionBySex', {static: true}) canvasDistributionBySex: ElementRef;
  @ViewChild('canvasFreqByAge', {static: true}) canvasFreqByAge: ElementRef;
  @ViewChild('canvasTrendline', {static: true}) canvasTrendline: ElementRef;
  @ViewChild('mainGrid', {static: true}) mainGrid: ElementRef;
  @HostListener('window:resize', ['$event'])
    onResize(event?) {
    this.isMobile = window.innerWidth < 450;

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    }

  chartColors : any = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  }

  list: any[];
  activeChart: any;

  isMobile: boolean = window.innerWidth < 450;

  screenHeight: number;
  screenWidth: number;

  constructor(
      private sharedService: SharedService,
      private sanitizer: DomSanitizer,
      private route: ActivatedRoute,
      private router: Router,
      private translate: TranslateService
    ) {
    this.sharedService.setMeta(
      'Statistici generale',
      'statistici, covid',
      `Corona virus în Europa`
    );

    
  }

  ngOnInit(): void {

    this.translateValues();

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.translateValues();
    });

    this.route.queryParams.subscribe(params => {
        let entry = params.chart ? this.list.find(e => e.path === params.chart) : undefined;
  
        if (!entry) entry = this.list[0];

        this.activeChart = entry;
        this.updateQueryParams();
      });
  }

  translateValues(){
    this.list = [
        {
            id: 1,
            title: this.translate.instant('statistics.Ziua fata de cazuri cumulative'),
            path: 'ziua-fata-de-cazuri-cumulative'
        },
        {
            id: 2,
            title: this.translate.instant('statistics.Cazuri pe zile'),
            path: 'cazuri-pe-zile'
        },
        {
            id: 3,
            title: this.translate.instant('statistics.Ziua fata de numarul de cazuri noi / numar de cazuri totale'),
            path: 'ziua-fata-de-cazuri-noi-cazuri-totale'
        },
        {
            id: 4,
            title: this.translate.instant('statistics.Frecventa pe grupe de varsta'),
            path: 'frecventa-grupe-varsta'
        },
        {
            id: 5,
            title: this.translate.instant('statistics.Numarul de reproductie R a virusului Covid-19 in Romania'),
            path: 'r-reproductie-covid'
        },
        {
            id: 6,
            title: this.translate.instant('statistics.Media numărului de cazuri noi pe județe'),
            path: 'medie-cazuri-noi-judete'
        }
    ];

    this.route.queryParams.subscribe(params => {
        let entry = params.chart ? this.list.find(e => e.path === params.chart) : undefined;
  
        if (!entry) entry = this.list[0];
  
        this.activeChart = entry;
    });
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  updateQueryParams(){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        chart: this.activeChart.path
      },
      queryParamsHandling: 'merge',
      skipLocationChange: true
    });
  }

  onGraphChange(){
    this.updateQueryParams();
  }
}
