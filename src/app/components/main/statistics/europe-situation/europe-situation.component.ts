import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


@Component({
  selector: 'app-europe-situation',
  templateUrl: './europe-situation.component.html',
  styleUrls: ['./europe-situation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EuropeSituationComponent implements OnInit {
  list: any[];
  activeChart: any;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
  ) { 

  };

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
        title: this.translate.instant('statistics.Evoluția cazurilor în Europa (heatmap)'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/index.html'),
        path: 'evolutie-cazuri-confirmate-europa-heatmap'
      },
      {
        id: 2,
        title: this.translate.instant('statistics.Evoluția cazurilor în Europa'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/europe_ft_confirmed.html'),
        path: 'evolutie-cazuri-confirmate-europa'
      },
      {
        id: 3,
        title: this.translate.instant('statistics.Evoluția cazurilor în Europa (raportate la 100k locuitori)'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/europe_ft_confirmed_100k.html'),
        path: 'evolutie-cazuri-confirmate-europa-100k'
      },
      {
        id: 4,
        title: this.translate.instant('statistics.Evoluția deceselor în Europa'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/europe_ft_deaths.html'),
        path: 'evolutie-decese-europa'
      },
      {
        id: 5,
        title: this.translate.instant('statistics.Evoluția deceselor în Europa (raportate la 100k locuitori)'),
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/europe_ft_deaths_100k.html'),
        path: 'evolutie-decese-europa-100k'
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
