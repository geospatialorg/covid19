import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer
  ) { 
    this.list = [
      {
        id: 1,
        title: 'Evoluția cazurilor în Europe (heatmap',
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/index.html')
      },
      {
        id: 2,
        title: 'Evoluția cazurilor în Europa',
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/europe_ft_confirmed.html')
      },
      {
        id: 3,
        title: 'Evoluția cazurilor în Europa (raportate la 100k locuitori)',
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/europe_ft_confirmed_100k.html')
      },
      {
        id: 4,
        title: 'Evoluția deceselor în Europa',
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/europe_ft_deaths.html')
      },
      {
        id: 5,
        title: 'Evoluția deceselor în Europa (raportate la 100k locuitori)',
        url: this.getSafeUrl('https://covid19.geo-spatial.org/charts/heatmap/europe_ft_deaths_100k.html')
      }
    ]
  };

  ngOnInit(): void {
    this.activeChart = this.list[0];
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
}

}
