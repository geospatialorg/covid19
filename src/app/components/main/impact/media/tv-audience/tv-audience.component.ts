import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tv-audience',
  templateUrl: './tv-audience.component.html',
  styleUrls: ['./tv-audience.component.css']
})
export class TvAudienceComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
    onResize(event?) {
    this.isMobile = window.innerWidth < 450;

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    }
  links: any[];

  activeChart: any;

  isMobile: boolean = window.innerWidth < 450;

  screenHeight: number;
  screenWidth: number;


  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if ( window.location !== window.parent.location ) { 
      this.isMobile = true;
    }

    this.links = [
        {
            id: 1,
            title: 'Sport',
            path: 'sport',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_audientetv_sport.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_audientetv_sport_mobile.html')
        },
        {
            id: 2,
            title: 'Știri',
            path: 'stiri',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_audientetv_stiri.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_audientetv_stiri_mobile.html')
        },
        {
            id: 3,
            title: 'Generaliste',
            path: 'generaliste',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_audientetv_generaliste.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_audientetv_generaliste_mobile.html')
        },
        {
            id: 4,
            title: 'Film',
            path: 'film',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_audientetv_film.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_audientetv_film_mobile.html')
        },
        {
            id: 5,
            title: 'Desene animate',
            path: 'desene-animate',
            src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_audientetv_da.html'),
            src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_audientetv_sport_da_mobile.html')
        }
    ];

  this.route.queryParams.subscribe(params => {
      let entry = params.chart ? this.links.find(e => e.path === params.chart) : undefined;

      if (!entry) entry = this.links[0];

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
