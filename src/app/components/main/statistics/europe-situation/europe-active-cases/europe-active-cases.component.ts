import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-europe-active-cases',
  templateUrl: './europe-active-cases.component.html',
  styleUrls: ['./europe-active-cases.component.css']
})
export class EuropeActiveCasesComponent implements OnInit {
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
        title: this.translate.instant('europe-situation.Cazuri active raportate la 100k locuitori'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_ft/europe_ft_active_100k.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_ft/europe_ft_active_100k.html'),
        path: 'cazuri-active-100k-locuitori'
      },
      {
        id: 2,
        title: this.translate.instant('europe-situation.Cazuri active cumulate'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_ft/europe_ft_active.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_ft/europe_ft_active.html'),
        path: 'cazuri-active-cumulate'
      },
      {
        id: 3,
        title: this.translate.instant('europe-situation.Heatmap cazuri active raportate la 100k locuitori'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_heatmap/active_100k.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_heatmap/active_100k.html'),
        path: 'heatmap-cazuri-active-100k-locuitori'
      },
      {
        id: 4,
        title: this.translate.instant('europe-situation.Heatmap cazuri active cumulate'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_heatmap/active.html'),
        mobile_url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/new/europe_heatmap/active.html'),
        path: 'heatmap-cazuri-active-cumulate'
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
