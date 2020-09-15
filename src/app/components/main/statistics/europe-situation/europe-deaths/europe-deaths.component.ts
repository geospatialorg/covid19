import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-europe-deaths',
  templateUrl: './europe-deaths.component.html',
  styleUrls: ['./europe-deaths.component.css']
})
export class EuropeDeathsComponent implements OnInit {
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
    private translate: TranslateService
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
        title: this.translate.instant('europe-situation.Decese raportate la 100k locuitori'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_ft/europe_ft_deaths_100k.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_ft/europe_ft_deaths_100k.html'),
        path: 'decese-100k-locuitori'
      },
      {
        id: 2,
        title: this.translate.instant('europe-situation.Decese cumulate'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_ft/europe_ft_deaths.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_ft/europe_ft_deaths.html'),
        path: 'decese-cumulate'
      },
      {
        id: 3,
        title: this.translate.instant('europe-situation.Heatmap decese raportate la 100k locuitori'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_heatmap/decese_100k.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_heatmap/decese_100k.html'),
        path: 'heatmap-decese-100k-locuitori'
      },
      {
        id: 4,
        title: this.translate.instant('europe-situation.Heatmap decese cumulate'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_heatmap/decese.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_heatmap/decese.html'),
        path: 'heatmap-decese-cumulate'
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
