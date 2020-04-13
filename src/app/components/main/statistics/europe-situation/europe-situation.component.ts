import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

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
  ) { 
    this.list = [
      {
        id: 1,
        title: 'Evoluția cazurilor în Europa (heatmap)',
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/index.html'),
        path: 'evolutie-cazuri-confirmate-europa-heatmap'
      },
      {
        id: 2,
        title: 'Evoluția cazurilor în Europa',
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/europe_ft_confirmed.html'),
        path: 'evolutie-cazuri-confirmate-europa'
      },
      {
        id: 3,
        title: 'Evoluția cazurilor în Europa (raportate la 100k locuitori)',
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/europe_ft_confirmed_100k.html'),
        path: 'evolutie-cazuri-confirmate-europa-100k'
      },
      {
        id: 4,
        title: 'Evoluția deceselor în Europa',
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/europe_ft_deaths.html'),
        path: 'evolutie-decese-europa'
      },
      {
        id: 5,
        title: 'Evoluția deceselor în Europa (raportate la 100k locuitori)',
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/europe_ft_deaths_100k.html'),
        path: 'evolutie-decese-europa-100k'
      }
    ]
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let entry = params.chart ? this.list.find(e => e.path === params.chart) : undefined;

      if (!entry) entry = this.list[0];

      this.activeChart = entry;
      this.updateQueryParams();
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
