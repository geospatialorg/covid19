import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-online-traffic-visits',
  templateUrl: './online-traffic-visits.component.html',
  styleUrls: ['./online-traffic-visits.component.css']
})
export class OnlineTrafficVisitsComponent implements OnInit {

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
          title: 'Știri generale',
          path: 'stiri-generale',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_stiri_generale.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_stiri_generale_mobile.html')
      },
      {
          id: 2,
          title: 'Știri și analize',
          path: 'stiri-analize',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_stiri_si_analize.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_stiri_si_analize_mobile.html')
      },
      {
          id: 3,
          title: 'Știri și analize locale',
          path: 'stiri-analize-locale',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_stiri_si_analize_locale.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_stiri_si_analize_locale_mobile.html')
      },
      {
          id: 4,
          title: 'Economic și financiar',
          path: 'economic-financiar',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_economic_financiar.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_economic_financiar_mobile.html')
      },
      {
          id: 5,
          title: 'Culinar',
          path: 'culinar',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_culinar.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_culinar_mobile.html')
      },
      {
        id: 6,
        title: 'Sport',
        path: 'sport',
        src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_sport.html'),
        src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_sport_mobile.html')
      },
      {
          id: 7,
          title: 'Total site-uri monitorizate',
          path: 'total-monitorizate',
          src: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_total.html'),
          src_mobile: this.getSafeUrl('https://covid19.geo-spatial.org/external/charts_vasile/impact/impact_media_trafic_vizite_total_mobile.html')
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
