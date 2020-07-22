import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-air-quality',
  templateUrl: './air-quality.component.html',
  styleUrls: ['./air-quality.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AirQualityComponent implements OnInit {
  @ViewChild('canvasAirQ', {static: true}) canvasAirQ: ElementRef;
  @ViewChild('canvasNO2', {static: true}) canvasNO2: ElementRef;
  @ViewChild('mainGrid', {static: true}) mainGrid: ElementRef;

  list: any[];
  activeChart: any;

  @HostListener('window:resize', ['$event'])
    onResize(event?) {
    this.isMobile = window.innerWidth < 450;

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    }

  isMobile: boolean = window.innerWidth < 450;

  screenHeight: number;
  screenWidth: number;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
  ) { }

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
        title: this.translate.instant('air-quality.Dioxid de azot (NO2)'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-calitateaer-no2-bucuresti-desktop.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-calitateaer-no2-bucuresti-mobile.html'),
        path: 'dioxid-azot'
      },
      {
        id: 2,
        title: this.translate.instant('air-quality.Dioxid de sulf (SO2)'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-calitateaer-so2-bucuresti-desktop.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-calitateaer-no2-bucuresti-mobile.html'),
        path: 'dioxid-sulf'
      },
      {
        id: 3,
        title: this.translate.instant('air-quality.Monoxid de carbon (CO)'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-calitateaer-co-bucuresti-desktop.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-calitateaer-co-bucuresti-mobile.html'),
        path: 'monoxid-carbon'
      },
      {
        id: 4,
        title: this.translate.instant('air-quality.PM10'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-calitateaer-pm10-bucuresti-desktop.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-calitateaer-pm10-bucuresti-mobile.html'),
        path: 'pm-10'
      },
      {
        id: 5,
        title: this.translate.instant('air-quality.PM2.5'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-calitateaer-pm2.5-bucuresti-desktop.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-calitateaer-pm2.5-bucuresti-mobile.html'),
        path: 'pm-2.5'
      },
      {
        id: 6,
        title: this.translate.instant('air-quality.Indice calitate aer'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-calitateaer-indice-bucuresti-desktop.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/covid19-calitateaer-indice-bucuresti-mobile.html'),
        path: 'indice-calitate-aer'
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
